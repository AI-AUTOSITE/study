// src/lib/constants.ts
export const PRICING_PLANS = {
  free: {
    name: "Free",
    price: 0,
    priceDisplay: "$0/month",
    stripeProductId: null,
    limits: {
      filesPerDay: 2,
      filesPerMonth: null, // Unlimited within daily limit
      pagesPerMonth: 100,
      maxFileSizeMB: 10,
      maxProcessingChars: 50000,
      flashcardRange: { min: 8, max: 12 },
      historyDays: 7,
    },
    features: [
      "2 files per day",
      "100 pages per month",
      "10MB max file size",
      "8-12 flashcards per document",
      "Basic AI summaries",
      "7-day history",
    ],
  },
  starter: {
    name: "Starter",
    price: 499, // in cents
    priceDisplay: "$4.99/month",
    stripeProductId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID,
    limits: {
      filesPerDay: null, // No daily limit
      filesPerMonth: 30,
      pagesPerMonth: 500,
      maxFileSizeMB: 15,
      maxProcessingChars: 100000,
      flashcardRange: { min: 12, max: 18 },
      historyDays: 30,
    },
    features: [
      "30 files per month",
      "500 pages per month",
      "15MB max file size",
      "12-18 flashcards per document",
      "Detailed AI summaries",
      "30-day history",
      "Priority support",
    ],
  },
  pro: {
    name: "Professional",
    price: 1499, // in cents
    priceDisplay: "$14.99/month",
    stripeProductId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    limits: {
      filesPerDay: null, // No daily limit
      filesPerMonth: 100,
      pagesPerMonth: 3000,
      maxFileSizeMB: 25,
      maxProcessingChars: 150000,
      flashcardRange: { min: 20, max: 30 },
      historyDays: null, // Unlimited
    },
    features: [
      "100 files per month",
      "3000 pages per month",
      "25MB max file size",
      "20-30 flashcards per document",
      "AI-enhanced summaries",
      "Unlimited history",
      "Priority processing",
      "Advanced analytics",
      "Export to multiple formats",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 2999, // in cents
    priceDisplay: "$29.99/month",
    stripeProductId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID,
    limits: {
      filesPerDay: null,
      filesPerMonth: null, // Unlimited
      pagesPerMonth: 10000,
      maxFileSizeMB: 50,
      maxProcessingChars: 200000,
      flashcardRange: { min: 30, max: 40 },
      historyDays: null, // Unlimited
    },
    features: [
      "Unlimited files",
      "10,000 pages per month",
      "50MB max file size",
      "30-40 flashcards per document",
      "Premium AI processing",
      "Unlimited history",
      "API access",
      "Team collaboration",
      "Custom integrations",
      "Dedicated support",
    ],
  },
};

export const MODEL_SELECTION = {
  getModel: (fileSizeMB: number, userPlan: keyof typeof PRICING_PLANS) => {
    // Cost-optimized model selection
    if (fileSizeMB < 5) return 'claude-3-haiku-20240307';
    if (fileSizeMB < 10 && userPlan === 'free') return 'claude-3-haiku-20240307';
    if (fileSizeMB < 25) return 'claude-3-5-sonnet-20241022';
    return 'claude-3-5-sonnet-20241022'; // Use Sonnet for larger files
  },
  
  getFlashcardCount: (fileSizeMB: number, userPlan: keyof typeof PRICING_PLANS) => {
    const range = PRICING_PLANS[userPlan].limits.flashcardRange;
    
    // Dynamic adjustment based on file size
    if (userPlan === 'pro' || userPlan === 'enterprise') {
      if (fileSizeMB < 5) return { min: range.min, max: range.min + 5 };
      if (fileSizeMB < 15) return { min: range.min + 5, max: range.max - 5 };
      return range;
    }
    
    // For free and starter plans
    if (fileSizeMB < 5) return { min: range.min, max: range.min + 2 };
    return range;
  },
};

export const PROCESSING_STATUS = {
  VALIDATING: "Validating file...",
  EXTRACTING: "Extracting text...",
  ANALYZING: "AI analyzing content...",
  GENERATING_SUMMARY: "Generating summary...",
  CREATING_FLASHCARDS: "Creating flashcards...",
  FINALIZING: "Finalizing...",
  COMPLETE: "Complete!",
  ERROR: "Error occurred",
  PARTIAL: "Partial processing complete",
};

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: (maxSize: number) => 
    `File size exceeds ${maxSize}MB limit. Please upgrade your plan or use a smaller file.`,
  
  PAGES_EXCEEDED: (remainingPages: number, totalPages: number) => 
    `This document has ${totalPages} pages, but you have ${remainingPages} pages remaining this month. Processing first ${remainingPages} pages.`,
  
  DAILY_LIMIT: "You've reached your daily file limit. Please try again tomorrow or upgrade your plan.",
  
  MONTHLY_LIMIT: "You've reached your monthly limit. Please upgrade your plan to continue.",
  
  INVALID_FILE: "Invalid file format. Please upload a PDF or DOCX file.",
  
  CORRUPTED_FILE: "File appears to be corrupted. Please try uploading again.",
  
  NO_TEXT: "Could not extract text from file. If this is a scanned document, please ensure it has been OCR processed.",
  
  NETWORK_ERROR: "Network connection lost. Retrying...",
  
  API_ERROR: "AI service temporarily unavailable. Please try again in a few moments.",
  
  GENERIC: "An unexpected error occurred. Please try again or contact support.",
};

export const PARTIAL_PROCESSING_OPTIONS = {
  INTELLIGENT: {
    id: 'intelligent',
    label: 'Process important sections (Recommended)',
    description: 'Prioritizes Abstract, Introduction, Conclusion, and Results',
  },
  SEQUENTIAL: {
    id: 'sequential',
    label: 'Process from beginning',
    description: 'Processes pages sequentially from the start',
  },
  UPGRADE: {
    id: 'upgrade',
    label: 'Upgrade plan to process entire document',
    description: 'Get more pages with a higher tier plan',
  },
};

// Usage tracking keys for database
export const USAGE_KEYS = {
  FILES_TODAY: 'files_processed_today',
  FILES_THIS_MONTH: 'files_processed_month',
  PAGES_THIS_MONTH: 'pages_processed_month',
  LAST_RESET_DATE: 'last_reset_date',
  LAST_MONTHLY_RESET: 'last_monthly_reset',
};