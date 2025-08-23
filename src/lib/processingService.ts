// src/lib/processingService.ts
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { MODEL_SELECTION, PRICING_PLANS, ERROR_MESSAGES } from './constants';

export interface DocumentInfo {
  pageCount: number;
  text: string;
  extractedChars: number;
  fileType: 'pdf' | 'docx';
  fileSizeMB: number;
}

export interface ProcessingOptions {
  userPlan: keyof typeof PRICING_PLANS;
  remainingPages: number;
  processingStrategy?: 'intelligent' | 'sequential';
  maxChars?: number;
}

export interface ExtractionResult {
  text: string;
  pageCount: number;
  pagesProcessed: number;
  partialProcessing: boolean;
  extractedChars: number;
  sections?: {
    abstract?: string;
    introduction?: string;
    conclusion?: string;
    results?: string;
    methodology?: string;
    discussion?: string;  // discussion も追加
    [key: string]: string | undefined;  // インデックスシグネチャを追加
  };
}

// Initialize PDF.js worker
if (typeof window !== 'undefined') {
  // version プロパティが存在しない場合のフォールバック
  const pdfjsVersion = (pdfjsLib as any).version || '3.11.174';
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
}

export async function extractDocumentInfo(
  file: File,
  options: ProcessingOptions
): Promise<ExtractionResult> {
  const fileType = file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'docx';
  const fileSizeMB = file.size / (1024 * 1024);
  
  try {
    if (fileType === 'pdf') {
      return await extractFromPDF(file, options);
    } else {
      return await extractFromDOCX(file, options);
    }
  } catch (error) {
    console.error('Error extracting document info:', error);
    throw new Error(ERROR_MESSAGES.INVALID_FILE);
  }
}

async function extractFromPDF(
  file: File,
  options: ProcessingOptions
): Promise<ExtractionResult> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Get page count first
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const totalPages = pdfDoc.getPageCount();
  
  // Determine how many pages we can process
  const pagesToProcess = Math.min(totalPages, options.remainingPages);
  const partialProcessing = pagesToProcess < totalPages;
  
  // Load PDF for text extraction
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let extractedText = '';
  // sections を NonNullable として初期化
  let sections: NonNullable<ExtractionResult['sections']> = {};
  
  if (options.processingStrategy === 'intelligent' && partialProcessing) {
    // Intelligent extraction: prioritize important sections
    extractedText = await extractIntelligentSections(pdf, pagesToProcess, sections);
  } else {
    // Sequential extraction
    for (let i = 1; i <= pagesToProcess; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      extractedText += pageText + '\n\n';
      
      // Try to identify sections in first few pages
      if (i <= 5) {
        identifySections(pageText, sections);
      }
    }
  }
  
  // Trim to max characters if needed
  const maxChars = options.maxChars || PRICING_PLANS[options.userPlan].limits.maxProcessingChars;
  if (extractedText.length > maxChars) {
    extractedText = extractedText.substring(0, maxChars);
  }
  
  return {
    text: extractedText,
    pageCount: totalPages,
    pagesProcessed: pagesToProcess,
    partialProcessing,
    extractedChars: extractedText.length,
    sections: Object.keys(sections).length > 0 ? sections : undefined,
  };
}
async function extractFromDOCX(
  file: File,
  options: ProcessingOptions
): Promise<ExtractionResult> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  
  // Estimate page count (assuming ~3000 chars per page)
  const estimatedPages = Math.ceil(result.value.length / 3000);
  const pagesToProcess = Math.min(estimatedPages, options.remainingPages);
  const partialProcessing = pagesToProcess < estimatedPages;
  
  let text = result.value;
  
  // If partial processing, extract proportional amount of text
  if (partialProcessing) {
    const charsPerPage = text.length / estimatedPages;
    const maxChars = Math.floor(charsPerPage * pagesToProcess);
    text = text.substring(0, maxChars);
  }
  
  // Trim to max processing chars
  const maxChars = options.maxChars || PRICING_PLANS[options.userPlan].limits.maxProcessingChars;
  if (text.length > maxChars) {
    text = text.substring(0, maxChars);
  }
  
  // Try to identify sections - NonNullable として初期化
  const sections: NonNullable<ExtractionResult['sections']> = {};
  identifySections(text, sections);
  
  return {
    text,
    pageCount: estimatedPages,
    pagesProcessed: pagesToProcess,
    partialProcessing,
    extractedChars: text.length,
    sections: Object.keys(sections).length > 0 ? sections : undefined,
  };
}

async function extractIntelligentSections(
  pdf: any,
  pageLimit: number,
  sections: NonNullable<ExtractionResult['sections']>  // Non-nullable に変更
): Promise<string> {
  const prioritySections = ['abstract', 'introduction', 'conclusion', 'results', 'discussion'];
  let extractedText = '';
  let pagesUsed = 0;
  
  // First pass: try to find priority sections
  for (let i = 1; i <= Math.min(pdf.numPages, pageLimit); i++) {
    if (pagesUsed >= pageLimit) break;
    
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    
    const lowerText = pageText.toLowerCase();
    
    // Check if this page contains priority sections
    for (const section of prioritySections) {
      if (lowerText.includes(section) && !sections[section]) {
        extractedText += pageText + '\n\n';
        sections[section] = extractSectionContent(pageText, section);
        pagesUsed++;
        break;
      }
    }
  }
  
  // Second pass: fill remaining pages with sequential content
  if (pagesUsed < pageLimit) {
    for (let i = 1; i <= Math.min(pdf.numPages, pageLimit - pagesUsed); i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      if (!extractedText.includes(pageText)) {
        extractedText += pageText + '\n\n';
      }
    }
  }
  
  return extractedText;
}

function identifySections(
  text: string, 
  sections: NonNullable<ExtractionResult['sections']>  // Non-nullable に変更
) {
  const lowerText = text.toLowerCase();
  const sectionKeywords: Record<string, string[]> = {
    abstract: ['abstract', 'summary'],
    introduction: ['introduction', 'background'],
    methodology: ['methodology', 'methods', 'materials and methods'],
    results: ['results', 'findings'],
    conclusion: ['conclusion', 'conclusions', 'discussion'],
  };
  
  for (const [section, keywords] of Object.entries(sectionKeywords)) {
    if (!sections[section]) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          sections[section] = extractSectionContent(text, keyword);
          break;
        }
      }
    }
  }
}

function extractSectionContent(text: string, sectionName: string): string {
  const lines = text.split('\n');
  let capturing = false;
  let content = '';
  let lineCount = 0;
  
  for (const line of lines) {
    if (line.toLowerCase().includes(sectionName)) {
      capturing = true;
      continue;
    }
    
    if (capturing) {
      // Stop at next section header (usually uppercase or contains common section keywords)
      if (lineCount > 5 && /^[A-Z\s]{4,}$/.test(line.trim())) {
        break;
      }
      
      content += line + '\n';
      lineCount++;
      
      // Limit section content to ~500 words
      if (content.split(' ').length > 500) {
        break;
      }
    }
  }
  
  return content.trim();
}

export function calculateProcessingCost(
  fileSize: number,
  userPlan: keyof typeof PRICING_PLANS,
  processedChars: number
): { model: string; estimatedCost: number } {
  const fileSizeMB = fileSize / (1024 * 1024);
  const model = MODEL_SELECTION.getModel(fileSizeMB, userPlan);
  
  // Rough cost estimation based on tokens (1 token ≈ 4 chars)
  const estimatedTokens = processedChars / 4;
  
  let costPer1kTokens = 0;
  if (model.includes('haiku')) {
    costPer1kTokens = 0.00025; // $0.25 per 1M tokens
  } else if (model.includes('sonnet')) {
    costPer1kTokens = 0.003; // $3 per 1M tokens
  }
  
  const estimatedCost = (estimatedTokens / 1000) * costPer1kTokens;
  
  return {
    model,
    estimatedCost: Math.round(estimatedCost * 100) / 100, // Round to 2 decimal places
  };
}