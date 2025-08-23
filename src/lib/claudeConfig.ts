// Claude API Configuration
export const claudeConfig = {
  // モデル設定
  models: {
    fast: 'claude-3-haiku-20240307',      // 高速・低コスト
    balanced: 'claude-3-sonnet-20240229',  // バランス型（推奨）
    powerful: 'claude-3-opus-20240229'     // 高精度・高コスト
  },
  
  // デフォルト設定
  defaultModel: 'claude-3-sonnet-20240229',
  
  // トークン設定
  maxTokens: {
    summary: 3000,
    flashcards: 2000,
    combined: 4000
  },
  
  // 温度設定（0-1: 低いほど一貫性が高い）
  temperature: {
    summary: 0.3,      // 要約は正確性重視
    flashcards: 0.5,   // フラッシュカードは少し創造的に
    default: 0.4
  },
  
  // チャンク設定
  chunking: {
    maxChunkSize: 12000,      // Claude APIの最大コンテキスト長を考慮
    overlapSize: 500,         // チャンク間のオーバーラップ
    maxChunksToProcess: 3     // 処理する最大チャンク数
  },
  
  // リトライ設定
  retry: {
    maxAttempts: 3,
    initialDelay: 1000,       // 1秒
    maxDelay: 10000,         // 10秒
    backoffFactor: 2
  },
  
  // タイムアウト設定
  timeout: {
    api: 30000,              // 30秒
    total: 60000             // 60秒
  }
};

// プロンプトテンプレート
export const promptTemplates = {
  // 学術論文用プロンプト
  academicPaper: `You are an expert academic assistant specializing in research paper analysis.

Analyze this academic paper and provide:

1. COMPREHENSIVE SUMMARY (250-350 words):
   - Research question/hypothesis
   - Methodology and approach
   - Key findings and results
   - Statistical significance (if applicable)
   - Conclusions and implications
   - Limitations and future work
   - Novel contributions to the field

2. STUDY FLASHCARDS (10-15 cards):
   - Core concepts and definitions
   - Methodology questions
   - Key findings and statistics
   - Critical analysis questions
   - Application questions
   - Comparison with related work

Focus on accuracy, clarity, and educational value.`,

  // 一般文書用プロンプト
  generalDocument: `You are an expert document analyst.

Analyze this document and provide:

1. DETAILED SUMMARY (200-300 words):
   - Main topic and purpose
   - Key points and arguments
   - Supporting evidence
   - Conclusions or recommendations
   - Practical implications

2. STUDY FLASHCARDS (8-12 cards):
   - Important concepts
   - Key facts and figures
   - Main arguments
   - Practical applications
   - Critical thinking questions`,

  // 技術文書用プロンプト
  technicalDocument: `You are a technical documentation expert.

Analyze this technical document and provide:

1. TECHNICAL SUMMARY (200-300 words):
   - Technology/system overview
   - Key features and capabilities
   - Implementation details
   - Performance metrics
   - Use cases and applications
   - Limitations and constraints

2. TECHNICAL FLASHCARDS (10-15 cards):
   - Technical terminology
   - System architecture
   - Key algorithms/processes
   - Performance characteristics
   - Best practices
   - Troubleshooting tips`
};

// ドキュメントタイプの検出
export function detectDocumentType(text: string, fileName: string): string {
  const lowerText = text.toLowerCase();
  const lowerFileName = fileName.toLowerCase();
  
  // 学術論文の特徴
  if (
    lowerText.includes('abstract') && 
    (lowerText.includes('introduction') || lowerText.includes('methodology')) &&
    (lowerText.includes('results') || lowerText.includes('conclusion'))
  ) {
    return 'academic';
  }
  
  // 技術文書の特徴
  if (
    lowerText.includes('api') ||
    lowerText.includes('implementation') ||
    lowerText.includes('architecture') ||
    lowerText.includes('configuration') ||
    lowerFileName.includes('technical') ||
    lowerFileName.includes('spec')
  ) {
    return 'technical';
  }
  
  // デフォルトは一般文書
  return 'general';
}

// プロンプトの選択
export function selectPrompt(documentType: string): string {
  switch (documentType) {
    case 'academic':
      return promptTemplates.academicPaper;
    case 'technical':
      return promptTemplates.technicalDocument;
    default:
      return promptTemplates.generalDocument;
  }
}

// レスポンスの検証
export function validateClaudeResponse(response: any): boolean {
  if (!response || typeof response !== 'object') {
    return false;
  }
  
  // 必須フィールドの確認
  if (!response.summary || typeof response.summary !== 'string') {
    return false;
  }
  
  if (!response.flashcards || !Array.isArray(response.flashcards)) {
    return false;
  }
  
  // フラッシュカードの検証
  for (const card of response.flashcards) {
    if (!card.front || !card.back || 
        typeof card.front !== 'string' || 
        typeof card.back !== 'string') {
      return false;
    }
  }
  
  return true;
}

// エラーメッセージのマッピング
export const errorMessages = {
  fileToLarge: 'File size exceeds the maximum limit',
  unsupportedType: 'File type is not supported',
  extractionFailed: 'Failed to extract text from the document',
  apiError: 'AI processing service encountered an error',
  networkError: 'Network connection error occurred',
  timeout: 'Processing took too long and was terminated',
  invalidResponse: 'Received invalid response from AI service',
  rateLimited: 'Too many requests. Please wait and try again',
  unauthorized: 'Authentication failed. Please contact support'
};