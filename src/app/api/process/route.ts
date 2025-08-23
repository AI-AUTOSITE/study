// src/app/api/process/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';  // ← /server を追加
import Anthropic from '@anthropic-ai/sdk';
import { 
  getUserUsage, 
  incrementUsage, 
  saveProcessingHistory,
  getUserPlan 
} from '@/lib/userService';
import { 
  MODEL_SELECTION, 
  ERROR_MESSAGES, 
  PRICING_PLANS,
  PROCESSING_STATUS 
} from '@/lib/constants';

// Existing PDF extraction function (keep the good parts)
async function extractTextFromPDF(buffer: Buffer): Promise<{ text: string; pages: number }> {
  try {
    const pdf = require('pdf-parse/lib/pdf-parse');
    
    const data = await pdf(buffer, {
      max: 0, // No page limit
    });
    
    console.log('PDF info:', {
      pages: data.numpages,
      textLength: data.text.length,
      preview: data.text.substring(0, 200)
    });
    
    return {
      text: data.text,
      pages: data.numpages
    };
  } catch (error) {
    console.error('PDF extraction error:', error);
    
    const basicText = buffer.toString('utf-8')
      .replace(/[^\x20-\x7E\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    return {
      text: basicText || 'Failed to extract text from PDF',
      pages: 1
    };
  }
}

// Existing DOCX extraction (enhanced with page estimation)
function extractTextFromDocx(buffer: Buffer): { text: string; pages: number } {
  try {
    let text = buffer.toString('utf-8');
    text = text.replace(/<[^>]*>/g, ' ');
    text = text.replace(/[\x00-\x1F\x7F-\x9F]/g, ' ');
    text = text.replace(/\s+/g, ' ');
    text = text.replace(/[^\x20-\x7E\s]/g, '');
    const cleanedText = text.trim();
    
    // Estimate pages (average ~3000 chars per page)
    const estimatedPages = Math.max(1, Math.ceil(cleanedText.length / 3000));
    
    return {
      text: cleanedText,
      pages: estimatedPages
    };
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw new Error('Failed to extract text from DOCX file');
  }
}

// Enhanced intelligent extraction with page awareness
function extractKeyPortions(
  text: string, 
  maxLength: number,
  totalPages: number,
  pagesProcessing: number
): string {
  const textLength = text.length;
  
  // If we're processing all pages or text is short, return as is
  if (textLength <= maxLength) {
    return text;
  }
  
  // Calculate proportion of text to extract based on pages
  const pageRatio = pagesProcessing / totalPages;
  const targetLength = Math.min(maxLength, Math.floor(textLength * pageRatio));
  
  // Extract key portions intelligently
  const portions: string[] = [];
  const portionSize = Math.floor(targetLength / 3);
  
  // 1. Beginning (introduction/abstract)
  portions.push(text.substring(0, portionSize));
  
  // 2. Middle (methodology/results)
  const middleStart = Math.floor((textLength - portionSize) / 2);
  portions.push(text.substring(middleStart, middleStart + portionSize));
  
  // 3. End (conclusion)
  portions.push(text.substring(textLength - portionSize));
  
  return portions.join('\n\n[... section omitted for length ...]\n\n');
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// ★ ここが重要: export async function POST を追加
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // API key check
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured');
      return NextResponse.json(
        { error: 'API configuration error. Please contact support.' },
        { status: 500 }
      );
    }
    
    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const processingStrategy = formData.get('strategy') as 'intelligent' | 'sequential' || 'intelligent';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' }, 
        { status: 400 }
      );
    }

    // Get user authentication
    const { userId } = await auth();
    const isAuthenticated = !!userId;
    
    // Get user plan and usage
    const userPlan = isAuthenticated && userId ? await getUserPlan(userId) : 'free';
    const planLimits = PRICING_PLANS[userPlan].limits;
    
    // For authenticated users, check usage
    let usage = null;
    let canProcess = true;
    let remainingPages = planLimits.pagesPerMonth;
    
    if (isAuthenticated && userId) {
      usage = await getUserUsage(userId);
      canProcess = usage.canProcess;
      remainingPages = usage.remainingPages;
      
      if (!canProcess) {
        return NextResponse.json(
          { 
            error: usage.limitations?.join(' ') || ERROR_MESSAGES.MONTHLY_LIMIT,
            usage: {
              remainingFiles: usage.remainingFiles,
              remainingPages: usage.remainingPages,
            }
          },
          { status: 429 }
        );
      }
    }
    
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    const maxSize = planLimits.maxFileSizeMB;
    
    if (fileSizeMB > maxSize) {
      return NextResponse.json(
        { 
          error: ERROR_MESSAGES.FILE_TOO_LARGE(maxSize),
          details: {
            fileSize: `${fileSizeMB.toFixed(2)}MB`,
            limit: `${maxSize}MB`,
            plan: userPlan
          }
        },
        { status: 413 }
      );
    }

    console.log('Processing file:', {
      name: file.name,
      size: `${fileSizeMB.toFixed(2)}MB`,
      type: file.type,
      plan: userPlan,
      remainingPages
    });

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let extractedText = '';
    let totalPages = 0;
    let fileType: 'pdf' | 'docx';
    
    // Extract text and count pages
    try {
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        console.log('Processing PDF file...');
        const pdfData = await extractTextFromPDF(buffer);
        extractedText = pdfData.text;
        totalPages = pdfData.pages;
        fileType = 'pdf';
        
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                 file.name.toLowerCase().endsWith('.docx')) {
        console.log('Processing DOCX file...');
        const docxData = extractTextFromDocx(buffer);
        extractedText = docxData.text;
        totalPages = docxData.pages;
        fileType = 'docx';
        
      } else {
        return NextResponse.json(
          { error: `Unsupported file type: ${file.type}. Please upload PDF or DOCX files only.` },
          { status: 400 }
        );
      }
      
    } catch (extractionError: any) {
      console.error('File extraction error:', extractionError);
      return NextResponse.json(
        { error: extractionError.message || 'Failed to extract text from file.' },
        { status: 422 }
      );
    }

    // Check text extraction
    if (!extractedText || extractedText.trim().length < 50) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NO_TEXT },
        { status: 422 }
      );
    }

    // Clean up text
    extractedText = extractedText
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s{3,}/g, '  ')
      .trim();

    // Determine pages to process
    const pagesToProcess = Math.min(totalPages, remainingPages);
    const partialProcessing = pagesToProcess < totalPages;
    
    if (partialProcessing) {
      console.log('Partial processing required:', {
        totalPages,
        pagesToProcess,
        remainingPages
      });
    }

    // Increment usage for authenticated users
    if (isAuthenticated && userId) {
      const usageResult = await incrementUsage(userId, pagesToProcess);
      if (!usageResult.success) {
        return NextResponse.json(
          { error: usageResult.error },
          { status: 429 }
        );
      }
    }

    // Get processing parameters based on plan
    const model = MODEL_SELECTION.getModel(fileSizeMB, userPlan);
    const flashcardRange = MODEL_SELECTION.getFlashcardCount(fileSizeMB, userPlan);
    const maxProcessingChars = planLimits.maxProcessingChars;
    
    // Apply intelligent extraction if needed
    let processText = extractedText;
    let extractionMethod = 'full';
    
    if (partialProcessing || extractedText.length > maxProcessingChars) {
      processText = extractKeyPortions(
        extractedText, 
        maxProcessingChars,
        totalPages,
        pagesToProcess
      );
      extractionMethod = processingStrategy;
      
      console.log('Using intelligent extraction:', {
        originalLength: extractedText.length,
        extractedLength: processText.length,
        pagesProcessing: pagesToProcess,
        totalPages
      });
    }

    console.log('Calling Claude API...', {
      model,
      textLength: processText.length,
      extractionMethod,
      plan: userPlan
    });

    // Call Claude API
    try {
      const completion = await anthropic.messages.create({
        model,
        max_tokens: userPlan === 'pro' ? 4000 : 2500,
        temperature: 0.3,
        messages: [{
          role: 'user',
          content: `You are an expert academic assistant specializing in analyzing research papers and academic documents. 

Analyze the following document and provide a comprehensive analysis.
${extractionMethod !== 'full' ? `Note: Processing ${pagesToProcess} of ${totalPages} pages using ${extractionMethod} extraction.` : ''}

IMPORTANT INSTRUCTIONS:
1. Create a detailed summary (${userPlan === 'pro' || userPlan === 'enterprise' ? '300-400' : '200-300'} words) that captures:
   - Main topic and research question
   - Key methodology or approach
   - Principal findings or arguments
   - Conclusions and implications
   - Any limitations mentioned
   ${partialProcessing ? '- Note that this is a partial document analysis' : ''}

2. Generate ${flashcardRange.min}-${flashcardRange.max} high-quality study flashcards that:
   - Cover the most important concepts, definitions, and findings
   - Use clear, concise language
   - Include both factual recall and conceptual understanding questions
   - Progress from basic to advanced concepts

Document Text (${processText.length} characters from ${totalPages} pages):
"""
${processText}
"""

Please respond in the following JSON format:
{
  "summary": "Your comprehensive summary here",
  "flashcards": [
    {
      "front": "Question or concept to recall",
      "back": "Detailed answer or explanation"
    }
  ],
  "key_topics": ["topic1", "topic2", "topic3"],
  "document_type": "research_paper|review|report|thesis|other",
  "confidence_score": 0.95,
  "extraction_coverage": "${partialProcessing ? 'partial' : 'complete'}"
}

Respond ONLY with valid JSON, no additional text or markdown formatting.`
        }]
      });

      console.log('Claude API response received');

      // Parse response
      let results;
      const responseText = completion.content[0].type === 'text' 
        ? completion.content[0].text 
        : '';
      
      try {
        const cleanedResponse = responseText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();
        
        results = JSON.parse(cleanedResponse);
        
        // Validate structure
        if (!results.summary || !results.flashcards || !Array.isArray(results.flashcards)) {
          throw new Error('Invalid response structure');
        }
        
        // Filter valid flashcards
        results.flashcards = results.flashcards.filter((card: any) => 
          card && card.front && card.back
        );
        
      } catch (parseError: any) {
        console.error('JSON parse error:', parseError);
        
        // Fallback processing
        const summaryMatch = responseText.match(/"summary":\s*"([^"]+)"/);
        const summary = summaryMatch ? summaryMatch[1] : responseText.substring(0, 500);
        
        results = {
          summary: summary || "Document processed successfully.",
          flashcards: [
            {
              front: "What is the main topic of this document?",
              back: "Please review the summary for details."
            }
          ],
          key_topics: ["Document Analysis"],
          document_type: "unknown",
          confidence_score: 0.5,
          extraction_coverage: extractionMethod
        };
      }

      // Save to history if authenticated  
// 修正版：saveProcessingHistory の呼び出し
// 修正版：saveProcessingHistory の呼び出し（正しい引数順）
if (isAuthenticated && userId && results) {
  try {
    await saveProcessingHistory(
      userId,
      file.name,
      file.size,
      totalPages,  // ← pageCount 引数を追加（4番目の引数）
      results.summary,
      results.flashcards,
      {
        model,
        processedChars: processText.length,
        partialProcessing,
        pagesProcessed: pagesToProcess,
      }
    );
  } catch (historyError) {
    console.error('Error saving processing history:', historyError);
  }
}

      const processingTime = Date.now() - startTime;
      
      console.log('Processing complete:', {
        processingTime: `${processingTime}ms`,
        summaryLength: results.summary.length,
        flashcardsCount: results.flashcards.length,
        pagesProcessed: pagesToProcess,
        totalPages
      });

      // Return enhanced response
      return NextResponse.json({
        results: {
          fileName: file.name,
          fileSize: file.size,
          fileType,
          summary: results.summary,
          flashcards: results.flashcards,
          keyTopics: results.key_topics || [],
          documentType: results.document_type || 'unknown',
          processingDetails: {
            totalPages,
            pagesProcessed: pagesToProcess,
            partialProcessing,
            coverage: `${Math.round((pagesToProcess / totalPages) * 100)}%`,
            extractedChars: processText.length,
            originalChars: extractedText.length,
            model: model.includes('haiku') ? 'Fast' : 'Advanced',
            plan: userPlan,
            extractionMethod,
            processingTime,
            confidenceScore: results.confidence_score || 0.8,
          },
          usage: isAuthenticated ? {
            remainingFiles: usage?.remainingFiles,
            remainingPages: Math.max(0, remainingPages - pagesToProcess),
          } : null
        }
      });

    } catch (apiError: any) {
      console.error('Claude API error:', apiError);
      
      if (apiError.status === 401) {
        return NextResponse.json(
          { error: 'API authentication failed.' },
          { status: 401 }
        );
      } else if (apiError.status === 429) {
        return NextResponse.json(
          { error: 'API rate limit exceeded. Please try again in a few moments.' },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: `Processing failed: ${apiError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
    
  } catch (error: any) {
    console.error('Unexpected error:', error);
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred while processing your file.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }, 
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const maxDuration = 60;