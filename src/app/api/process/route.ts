import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Anthropic クライアントの初期化
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    console.log('API Key exists:', !!process.env.ANTHROPIC_API_KEY);
    
    // フォームデータを取得
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' }, 
        { status: 400 }
      );
    }

    // ファイルサイズチェック（50MB制限）
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Maximum size is 50MB.` },
        { status: 413 }
      );
    }

    console.log('Processing file:', file.name, 'Size:', file.size, 'Type:', file.type);

    // ファイルをテキストとして読み込む（PDFの場合は簡易的な処理）
    let fileContent = '';
    
    try {
      // ファイルの内容を取得
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      if (file.type === 'application/pdf') {
        // PDFの場合（簡易的な処理 - 実際にはpdf-parseなどが必要）
        // とりあえずバッファを文字列に変換（完璧ではない）
        fileContent = buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ' ');
        
        // PDFの場合、最初の部分だけ取得
        fileContent = fileContent.substring(0, 5000);
        
        // もしテキストが少なすぎる場合はダミーテキストを使用
        if (fileContent.length < 100) {
          fileContent = `This is a PDF document titled "${file.name}". [PDF content extraction in development - using placeholder text for demonstration] The document appears to contain important information about various topics including research findings, methodologies, and conclusions.`;
        }
      } else {
        // テキストファイルやその他
        fileContent = buffer.toString('utf-8');
      }
      
      console.log('Extracted text length:', fileContent.length);
      
    } catch (error) {
      console.error('File reading error:', error);
      fileContent = `Unable to extract text from ${file.name}. Using fallback content for demonstration.`;
    }

    // Claude APIを呼び出す
    try {
      const completion = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307', // より高速で安価なモデル
        max_tokens: 2000,
        temperature: 0,
        messages: [{
          role: 'user',
          content: `You are an expert academic assistant. Analyze the following document excerpt and provide:

1. A comprehensive summary (150-200 words) that captures the main points
2. Generate 5-8 study flashcards with questions and answers

Document excerpt:
"${fileContent.substring(0, 3000)}"

Please respond in the following JSON format:
{
  "summary": "Your comprehensive summary here",
  "flashcards": [
    {
      "front": "Question or key concept",
      "back": "Answer or explanation"
    }
  ]
}

Respond ONLY with valid JSON, no additional text.`
        }]
      });

      // レスポンスを解析
      let results;
      const responseText = completion.content[0].type === 'text' 
        ? completion.content[0].text 
        : '';
      
      try {
        // JSONをパース
        results = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.log('Raw response:', responseText);
        
        // パースエラーの場合、フォールバック
        results = {
          summary: responseText.substring(0, 500) || "Summary generation completed. Please try again if needed.",
          flashcards: [
            {
              front: "What is the main topic?",
              back: "Document analysis result"
            }
          ]
        };
      }

      return NextResponse.json({
        results: {
          fileName: file.name,
          originalLength: fileContent.length,
          summary: results.summary,
          flashcards: results.flashcards
        }
      });

    } catch (apiError: any) {
      console.error('Claude API error:', apiError);
      
      // APIキーのエラーチェック
      if (apiError.message?.includes('401') || apiError.message?.includes('authentication')) {
        return NextResponse.json(
          { error: 'API authentication failed. Please check your Anthropic API key.' },
          { status: 401 }
        );
      }
      
      // レート制限エラー
      if (apiError.message?.includes('429')) {
        return NextResponse.json(
          { error: 'API rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      
      throw apiError;
    }
    
  } catch (error) {
    console.error('Processing error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Processing failed: ${error.message}` }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to process file. Please try again.' }, 
      { status: 500 }
    );
  }
}

// Edge Runtimeを使用（より高速）
export const runtime = 'nodejs';