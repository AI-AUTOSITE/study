'use client'

import React, { useState, useEffect } from 'react';
import { Upload, FileText, Zap, Star, Menu, X, AlertTriangle, FileCheck, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { 
  supabase, 
  getOrCreateUserProfile, 
  getDailyUsage, 
  getMonthlyUsage,
  incrementUsage,
  saveProcessingHistory,
  getProcessingHistory,
  type UserProfile
} from '@/lib/supabase';

// HistoryItem Component
const HistoryItem = ({ 
  item, 
  downloadHistoryPDF, 
  downloadHistoryCards, 
  setResults 
}: {
  item: any;
  downloadHistoryPDF: (item: any) => void;
  downloadHistoryCards: (item: any) => void;
  setResults: (results: any) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <div 
        className="p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <p className="font-medium text-gray-800">{item.file_name}</p>
            <p className="text-sm text-gray-600">
              {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString()}
            </p>
            {item.partial_processing && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-1 inline-block">
                Partial: {item.pages_processed}/{item.page_count} pages
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {(item.file_size / 1024 / 1024).toFixed(2)} MB
            </span>
            <button className="text-gray-400 hover:text-gray-600">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-white border-t">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">📝 Summary</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.summary_text || 'No summary available'}
            </p>
          </div>
          
          {item.flashcard_data && item.flashcard_data.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                🎯 Study Cards ({item.flashcard_data.length} cards)
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {item.flashcard_data.slice(0, 3).map((card: any, cardIndex: number) => (
                  <div key={cardIndex} className="bg-gray-50 rounded p-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Q: {card.front}
                    </p>
                    <p className="text-sm text-gray-600">
                      A: {card.back}
                    </p>
                  </div>
                ))}
                {item.flashcard_data.length > 3 && (
                  <p className="text-sm text-gray-500 italic">
                    +{item.flashcard_data.length - 3} more cards...
                  </p>
                )}
              </div>
            </div>
          )}
          
          <div className="flex space-x-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                downloadHistoryPDF(item);
              }}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              📄 Download Summary
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                downloadHistoryCards(item);
              }}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              📚 Download Cards
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setResults({
                  fileName: item.file_name,
                  summary: item.summary_text,
                  flashcards: item.flashcard_data,
                  originalLength: item.file_size,
                  processingDetails: {
                    totalPages: item.page_count,
                    pagesProcessed: item.pages_processed,
                    partialProcessing: item.partial_processing,
                    coverage: item.pages_processed && item.page_count 
                      ? `${Math.round((item.pages_processed / item.page_count) * 100)}%`
                      : '100%'
                  }
                });
              }}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              👁️ View Full
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Flashcard states
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [cardStats, setCardStats] = useState<{[key: number]: 'easy' | 'medium' | 'hard' | null}>({});

  // Supabase states
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [processingHistory, setProcessingHistory] = useState<any[]>([]);
  const [dailyUsage, setDailyUsage] = useState({ files_processed: 0, credits_used: 0 });
  const [monthlyUsage, setMonthlyUsage] = useState({ files_processed: 0, credits_used: 0 });
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  
  // NEW: Page tracking states
  const [monthlyPages, setMonthlyPages] = useState(0);
  const [remainingPages, setRemainingPages] = useState<number | null>(null);
  
  // Hydration states
  const [canProcessState, setCanProcessState] = useState(true);
  const [isClientSide, setIsClientSide] = useState(false);

  // Initialize user profile
  const initializeUserProfile = async (clerkUserId: string, email: string, firstName?: string) => {
    setIsLoadingProfile(true);
    
    try {
      const { data: profile, error } = await getOrCreateUserProfile(clerkUserId, email, firstName);
      
      if (error) {
        console.error('Error creating/fetching profile:', error);
        setError('Failed to load user profile. Please try again.');
        return;
      }
      
      setUserProfile(profile);
      
      if (profile) {
        // Get usage data
        if (profile.subscription_status === 'free') {
          const { data: dailyData } = await getDailyUsage(profile.id);
          if (dailyData) {
            setDailyUsage({
              files_processed: dailyData.files_processed,
              credits_used: dailyData.credits_used
            });
          }
        }
        
        if (profile.subscription_status === 'pro') {
          const { data: monthlyData } = await getMonthlyUsage(profile.id);
          if (monthlyData) {
            setMonthlyUsage({
              files_processed: monthlyData.files_processed,
              credits_used: monthlyData.credits_used
            });
          }
        }
        
        // NEW: Get page usage from user_usage table
        const { data: usageData } = await supabase
          .from('user_usage')
          .select('pages_processed_month')
          .eq('clerk_user_id', clerkUserId)
          .single();
          
        if (usageData) {
          setMonthlyPages(usageData.pages_processed_month || 0);
          
          // Calculate remaining pages based on plan
          const planLimits = {
            free: 100,
            starter: 500,
            pro: 3000,
            enterprise: 10000
          };
          
          const limit = planLimits[profile.subscription_status as keyof typeof planLimits] || 100;
          setRemainingPages(Math.max(0, limit - (usageData.pages_processed_month || 0)));
        }
        
        // Get processing history
      const { data: history } = await getProcessingHistory(clerkUserId);  // ← ここだけ変更！
      if (history) {
        setProcessingHistory(history);
      }
    }
  } catch (error) {
    console.error('Error initializing profile:', error);
    setError('Failed to initialize user profile.');
  } finally {
    setIsLoadingProfile(false);
  }
};

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      initializeUserProfile(
        user.id,
        user.emailAddresses[0].emailAddress,
        user.firstName || undefined
      );
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  // Check processing limits
  useEffect(() => {
    if (!isClientSide) return;
    
    const checkProcessLimit = async () => {
      if (!isLoaded) return false;
      
      // Guest users (2 files per day for free plan)
      if (!isSignedIn) {
        try {
          const today = new Date().toDateString();
          const lastUsed = localStorage.getItem('lastProcessDate');
          const guestCount = parseInt(localStorage.getItem('dailyGuestCount') || '0');
          
          if (lastUsed !== today) {
            localStorage.setItem('dailyGuestCount', '0');
            return true;
          }
          return guestCount < 2; // Updated to 2 files per day
        } catch (error) {
          return true;
        }
      }
      
      if (!userProfile) return false;
      
      // Check page limits
      if (remainingPages !== null && remainingPages <= 0) {
        return false;
      }
      
      // Check file limits
      if (userProfile.subscription_status === 'pro') {
        return monthlyUsage.files_processed < 100;
      } else if (userProfile.subscription_status === 'starter') {
        return monthlyUsage.files_processed < 30;
      }
      
      // Free users: 2 files per day
      return dailyUsage.files_processed < 2;
    };
    
    checkProcessLimit().then(setCanProcessState);
  }, [isClientSide, isLoaded, isSignedIn, userProfile, dailyUsage, monthlyUsage, remainingPages]);

  const canProcess = () => {
    if (!isClientSide) return true;
    return canProcessState;
  };

  const updateUsageCount = async () => {
    if (!isClientSide) return;
    
    // Guest users
    if (!isSignedIn) {
      try {
        const today = new Date().toDateString();
        const count = parseInt(localStorage.getItem('dailyGuestCount') || '0');
        localStorage.setItem('lastProcessDate', today);
        localStorage.setItem('dailyGuestCount', String(count + 1));
      } catch (error) {
        console.log('localStorage not available:', error);
      }
    } 
    // Logged in users
    else if (userProfile) {
      try {
        const { error } = await incrementUsage(
          userProfile.id, 
          userProfile.subscription_status === 'pro' || userProfile.subscription_status === 'starter'
        );
        
        if (error) {
          console.error('Error updating usage:', error);
          return;
        }
        
        // Update local state
        if (userProfile.subscription_status === 'pro' || userProfile.subscription_status === 'starter') {
          setMonthlyUsage(prev => ({
            files_processed: prev.files_processed + 1,
            credits_used: prev.credits_used + 1
          }));
        } else {
          setDailyUsage(prev => ({
            files_processed: prev.files_processed + 1,
            credits_used: prev.credits_used + 1
          }));
        }
      } catch (error) {
        console.error('Error tracking usage:', error);
      }
    }
    
    // Re-check limits
    const checkProcessLimit = async () => {
      if (!isLoaded) return false;
      
      if (!isSignedIn) {
        try {
          const today = new Date().toDateString();
          const lastUsed = localStorage.getItem('lastProcessDate');
          const guestCount = parseInt(localStorage.getItem('dailyGuestCount') || '0');
          
          if (lastUsed !== today) {
            return true;
          }
          return guestCount < 2;
        } catch (error) {
          return true;
        }
      }
      
      if (!userProfile) return false;
      
      if (remainingPages !== null && remainingPages <= 0) {
        return false;
      }
      
      if (userProfile.subscription_status === 'pro') {
        return monthlyUsage.files_processed < 100;
      } else if (userProfile.subscription_status === 'starter') {
        return monthlyUsage.files_processed < 30;
      }
      
      return dailyUsage.files_processed < 2;
    };
    
    const canStillProcess = await checkProcessLimit();
    setCanProcessState(canStillProcess);
  };

  // Stripe Checkout
  const handleSubscribe = async (plan: 'starter' | 'pro' = 'pro') => {
    try {
      const priceIds = {
        starter: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "price_starter",
        pro: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_1Rs3MoGSxhYhM1Axrn21fcgc"
      };
      
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceIds[plan],
          userId: userProfile?.id,
          clerkUserId: user?.id,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        setError('Failed to create checkout session. Please try again.');
        return;
      }

      const data = await response.json();
      
      if (data.sessionId) {
        const stripe = await import('@stripe/stripe-js').then(mod => 
          mod.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        );
        
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ 
            sessionId: data.sessionId 
          });
          
          if (error) {
            console.error('Stripe redirect error:', error);
            setError('Failed to redirect to checkout. Please try again.');
          }
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setError('Failed to start subscription. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // File validation
      const getMaxFileSize = () => {
        if (!userProfile) return 10 * 1024 * 1024; // Default 10MB
        
        const limits: { [key: string]: number } = {
          free: 10 * 1024 * 1024,     // 10MB
          starter: 15 * 1024 * 1024,  // 15MB
          pro: 25 * 1024 * 1024,      // 25MB
          enterprise: 50 * 1024 * 1024 // 50MB
        };
        
        return limits[userProfile.subscription_status] || limits.free;
      };
      
      const maxSizeForUser = getMaxFileSize();
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (file.size > maxSizeForUser) {
        setError(`File too large! Maximum size is ${maxSizeForUser / 1024 / 1024}MB for your plan. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB.`);
        return;
      }
      
      if (!allowedTypes.includes(file.type)) {
        setError(`Unsupported file type! Please upload PDF or DOCX files only.`);
        return;
      }
      
      setUploadedFile(file);
      setError(null);
      setResults(null);
    }
  };

  const processFile = async () => {
    if (!uploadedFile) return;

    // Check limits
    if (!canProcess()) {
      if (!isSignedIn) {
        setError('Daily limit reached (2 files/day). Please sign in for more processing!');
      } else if (remainingPages !== null && remainingPages <= 0) {
        setError('Monthly page limit reached. Please upgrade your plan or wait until next month.');
      } else if (userProfile?.subscription_status === 'pro') {
        setError('Monthly file limit reached (100 files). Please wait until next month.');
      } else if (userProfile?.subscription_status === 'starter') {
        setError('Monthly limit reached. Please upgrade to Pro for more processing!');
      } else {
        setError('Daily limit reached (2 files). Upgrade for more processing!');
      }
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProcessingStatus('Uploading file...');

    // Network check
    if (typeof window !== 'undefined' && !navigator.onLine) {
      setError('No internet connection. Please check your network and try again.');
      setIsProcessing(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      // Add processing strategy if pages are limited
      if (remainingPages !== null && remainingPages < 100) {
        formData.append('strategy', 'intelligent');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 min timeout

      setProcessingStatus('Processing document...');
      
      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Subscription-Status': userProfile?.subscription_status || 'free'
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 413) {
          throw new Error('File too large for server processing. Please try a smaller file.');
        } else if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Our team has been notified. Please try again later.');
        }
      }

      const responseText = await response.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Invalid server response. Please try again or contact support.');
      }

      if (!response.ok) {
        throw new Error(data.error || `Server error (${response.status}). Please try again.`);
      }

      if (!data.results) {
        throw new Error('Processing completed but no results received. Please try again.');
      }

      setResults(data.results);
      await updateUsageCount();
      
      // Update page count if provided
      if (data.results.processingDetails?.pagesProcessed) {
        setMonthlyPages(prev => prev + data.results.processingDetails.pagesProcessed);
        if (remainingPages !== null) {
          setRemainingPages(prev => Math.max(0, (prev || 0) - data.results.processingDetails.pagesProcessed));
        }
      }
      
// Option 1: API経由で保存する（推奨）
// Save to history
      if (userProfile && data.results) {
        try {
          // route.ts で既に saveProcessingHistory が呼ばれているので、
          // ここでは履歴を再取得するだけでOK
          const { data: history } = await getProcessingHistory(userProfile.id);
          if (history) {
            setProcessingHistory(history);
          }
        } catch (historyError) {
          console.error('Error refreshing history:', historyError);
        }
      }

// Option 2: もし別途履歴保存用のAPIエンドポイントがある場合
// Save to history
if (userProfile && data.results) {
  try {
    const response = await fetch('/api/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userProfile.id,
        fileName: uploadedFile.name,
        fileSize: uploadedFile.size,
        pageCount: data.results.processingDetails?.totalPages || 0,
        summary: data.results.summary,
        flashcards: data.results.flashcards,
        processingDetails: {
          model: data.results.processingDetails?.model,
          processedChars: data.results.processingDetails?.extractedChars,
          partialProcessing: data.results.processingDetails?.partialProcessing,
          pagesProcessed: data.results.processingDetails?.pagesProcessed,
        }
      }),
    });
    
    if (response.ok) {
      // Refresh history
      const { data: history } = await getProcessingHistory(userProfile.id);
      if (history) {
        setProcessingHistory(history);
      }
    }
  } catch (historyError) {
    console.error('Error saving processing history:', historyError);
  }
}
      
      // Reset flashcard states
      setCurrentCardIndex(0);
      setShowAnswer(false);
      setStudyMode(false);
      setCardStats({});
      setProcessingStatus('');
      
    } catch (err) {
      console.error('Process error:', err);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Processing timed out. Please try with a smaller file or try again later.');
        } else if (err.message.includes('Failed to fetch')) {
          setError('Network error. Please check your internet connection and try again.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again or contact support.');
      }
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
    }
  };

  // Flashcard functions
  const startStudyMode = () => {
    setStudyMode(true);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const nextCard = () => {
    if (currentCardIndex < results.flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  const rateCard = (difficulty: 'easy' | 'medium' | 'hard') => {
    setCardStats(prev => ({
      ...prev,
      [currentCardIndex]: difficulty
    }));
    
    setTimeout(() => {
      if (currentCardIndex < results.flashcards.length - 1) {
        nextCard();
      }
    }, 500);
  };

  const resetStudy = () => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setCardStats({});
  };

  // Download functions
  const downloadSummaryPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Document Summary', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`File: ${results.fileName}`, 20, 50);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 60);
    
    if (results.processingDetails) {
      doc.text(`Pages processed: ${results.processingDetails.pagesProcessed}/${results.processingDetails.totalPages}`, 20, 70);
      doc.text(`Coverage: ${results.processingDetails.coverage}`, 20, 80);
    }
    
    doc.setFontSize(14);
    doc.text('Summary:', 20, 95);
    
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(results.summary, 170);
    doc.text(summaryLines, 20, 110);
    
    let yPosition = 110 + (summaryLines.length * 5) + 20;
    
    doc.setFontSize(14);
    doc.text('Study Cards:', 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(10);
    results.flashcards.forEach((card: any, index: number) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      
      doc.setFont('helvetica', 'bold');
      const questionLines = doc.splitTextToSize(`Q${index + 1}: ${card.front}`, 170);
      doc.text(questionLines, 20, yPosition);
      yPosition += questionLines.length * 5 + 5;
      
      doc.setFont('helvetica', 'normal');
      const answerLines = doc.splitTextToSize(`A: ${card.back}`, 170);
      doc.text(answerLines, 20, yPosition);
      yPosition += answerLines.length * 5 + 15;
    });
    
    doc.save(`${results.fileName}_summary.pdf`);
  };

  const downloadAnkiCards = () => {
    let csvContent = 'Front,Back\n';
    
    results.flashcards.forEach((card: any) => {
      const front = `"${card.front.replace(/"/g, '""')}"`;
      const back = `"${card.back.replace(/"/g, '""')}"`;
      csvContent += `${front},${back}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${results.fileName}_flashcards.csv`;
    link.click();
  };

  const downloadHistoryPDF = async (item: any) => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Document Summary', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`File: ${item.file_name}`, 20, 50);
    doc.text(`Processed: ${new Date(item.created_at).toLocaleDateString()}`, 20, 60);
    
    if (item.page_count && item.pages_processed) {
      doc.text(`Pages: ${item.pages_processed}/${item.page_count}`, 20, 70);
    }
    
    doc.setFontSize(14);
    doc.text('Summary:', 20, 85);
    
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(item.summary_text || '', 170);
    doc.text(summaryLines, 20, 100);
    
    doc.save(`${item.file_name}_summary.pdf`);
  };

  const downloadHistoryCards = (item: any) => {
    if (!item.flashcard_data || item.flashcard_data.length === 0) return;
    
    let csvContent = 'Front,Back\n';
    
    item.flashcard_data.forEach((card: any) => {
      const front = `"${card.front.replace(/"/g, '""')}"`;
      const back = `"${card.back.replace(/"/g, '""')}"`;
      csvContent += `${front},${back}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${item.file_name}_flashcards.csv`;
    link.click();
  };

  // Usage display text
  const getUsageText = () => {
    if (!isSignedIn) return 'Free: 2 files/day, 100 pages/month';
    
    if (!userProfile) return 'Loading...';
    
    const planDetails: { [key: string]: { files: string; pages: number } } = {
      free: { files: '2/day', pages: 100 },
      starter: { files: '30/month', pages: 500 },
      pro: { files: '100/month', pages: 3000 },
      enterprise: { files: 'Unlimited', pages: 10000 }
    };
    
    const plan = planDetails[userProfile.subscription_status] || planDetails.free;
    
    if (userProfile.subscription_status === 'free') {
      const filesRemaining = 2 - dailyUsage.files_processed;
      return `Free: ${filesRemaining} files today, ${remainingPages || 0} pages this month`;
    } else {
      const filesRemaining = userProfile.subscription_status === 'pro' 
        ? 100 - monthlyUsage.files_processed
        : userProfile.subscription_status === 'starter'
        ? 30 - monthlyUsage.files_processed
        : 0;
      
      return `${userProfile.subscription_status.charAt(0).toUpperCase() + userProfile.subscription_status.slice(1)}: ${filesRemaining} files, ${remainingPages || 0} pages remaining`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">ScholarSumm</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/how-it-works" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                  How it works
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                  Pricing
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                  Terms
                </Link>
                
                {isLoaded && (
                  <>
                    {isSignedIn ? (
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">
                          Hello, {user.firstName || user.emailAddresses[0].emailAddress}
                        </span>
                        <button 
                          onClick={() => signOut()}
                          className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors"
                        >
                          {user.firstName?.[0] || 'U'}
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Link 
                          href="/sign-in"
                          className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Sign In
                        </Link>
                        <Link 
                          href="/sign-up"
                          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-indigo-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/how-it-works" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
              How it works
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
              Pricing
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
              Terms
            </Link>
            
            {isLoaded && (
              <>
                {isSignedIn ? (
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => signOut()}
                        className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center"
                      >
                        {user.firstName?.[0] || 'U'}
                      </button>
                      <span className="text-sm text-gray-600">
                        {user.firstName || user.emailAddresses[0].emailAddress}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      href="/sign-in"
                      className="text-gray-600 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/sign-up"
                      className="bg-indigo-600 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-indigo-700"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            ScholarSumm
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Transform research papers into study cards in seconds
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {/* Upload Area */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <Upload className="mr-2 sm:mr-3 text-indigo-600" size={24} />
              <span className="text-sm sm:text-base lg:text-xl">Upload Your Document</span>
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 lg:p-12 text-center hover:border-indigo-400 transition-colors">
              {uploadedFile ? (
                <div className="space-y-3 sm:space-y-4">
                  <FileText className="mx-auto text-green-500" size={40} />
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-green-700 mb-1 break-words">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setUploadedFile(null);
                      setResults(null);
                      setError(null);
                    }}
                    className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <FileText className="mx-auto text-gray-400" size={40} />
                  <div>
                    <p className="text-base sm:text-lg text-gray-600 mb-2">
                      Select your PDF or DOCX file
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                      Maximum file size: {
                        userProfile?.subscription_status === 'pro' ? '25MB' :
                        userProfile?.subscription_status === 'starter' ? '15MB' :
                        '10MB'
                      }
                    </p>
                    <label className="bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer inline-block text-sm sm:text-base">
                      Browse Files
                      <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="text-red-500 mr-2 sm:mr-3 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-red-700 text-sm sm:text-base font-medium mb-1">Processing Error</p>
                    <p className="text-red-600 text-xs sm:text-sm leading-relaxed">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* NEW: Page limit warning */}
            {remainingPages !== null && remainingPages < 50 && remainingPages > 0 && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-600 mr-2 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-yellow-800 text-sm font-medium">Low Page Balance</p>
                    <p className="text-yellow-700 text-xs">
                      You have {remainingPages} pages remaining this month. Large documents may be partially processed.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                <span className="text-center sm:text-left">
                  {getUsageText()}
                  {isSignedIn && <span className="text-green-600 ml-2">✓ Signed in</span>}
                  {isLoadingProfile && <span className="text-blue-600 ml-2">Loading...</span>}
                </span>
                <span className="text-center sm:text-right">⏱️ Processing time: ~1 minute</span>
              </div>
              
              {/* Process Button */}
              <div className="text-center">
                <button 
                  onClick={processFile}
                  disabled={!uploadedFile || isProcessing || !canProcess()}
                  className={`px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all shadow-md w-full text-sm sm:text-base ${
                    !uploadedFile || isProcessing || !canProcess()
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      <span className="text-sm sm:text-base">{processingStatus || 'Processing...'}</span>
                    </div>
                  ) : !canProcess() ? (
                    '🚫 Limit reached'
                  ) : (
                    '🚀 Process Document'
                  )}
                </button>
                
                {!isSignedIn && !canProcess() && (
                  <div className="mt-2">
                    <Link 
                      href="/sign-up"
                      className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm underline"
                    >
                      Sign up for more processing!
                    </Link>
                  </div>
                )}
                
                {isSignedIn && userProfile?.subscription_status === 'free' && !canProcess() && (
                  <div className="mt-2">
                    <button 
                      onClick={() => handleSubscribe('starter')}
                      className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm underline"
                    >
                      Upgrade to Starter for more processing!
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <Zap className="mr-2 sm:mr-3 text-indigo-600" size={24} />
              <span className="text-sm sm:text-base lg:text-xl">Your Results</span>
            </h3>
            
            <div className="space-y-6">
              {results ? (
                <>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-800 mb-2">📄 File Information</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>File:</strong> {results.fileName}</p>
                      <p><strong>Text extracted:</strong> {results.originalLength?.toLocaleString()} characters</p>
                      {results.processingDetails && (
                        <>
                          <p><strong>Pages:</strong> {results.processingDetails.pagesProcessed}/{results.processingDetails.totalPages}</p>
                          <p><strong>Coverage:</strong> {results.processingDetails.coverage}</p>
                          {results.processingDetails.partialProcessing && (
                            <p className="text-yellow-600 text-xs mt-1">
                              ⚠️ Partial processing due to page limits
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-800 mb-2">📝 Extracted Content</h4>
                    <div className="text-gray-700 text-sm leading-relaxed max-h-48 overflow-y-auto bg-white p-3 rounded border">
                      {results.summary}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-800">🧠 Study Cards ({results.flashcards.length} cards)</h4>
                      {!studyMode && (
                        <button 
                          onClick={startStudyMode}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                          Start Study Mode
                        </button>
                      )}
                    </div>
                    
                    {studyMode ? (
                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">Progress:</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${((currentCardIndex + 1) / results.flashcards.length) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {currentCardIndex + 1}/{results.flashcards.length}
                          </span>
                        </div>

                        {/* Flashcard */}
                        <div className="bg-white border-2 border-purple-200 rounded-xl p-6 min-h-[200px] flex flex-col justify-center items-center text-center shadow-lg">
                          <div className="space-y-4 w-full">
                            <div className="text-sm text-purple-600 font-medium">Question</div>
                            <div className="text-lg font-semibold text-gray-800 leading-relaxed">
                              {results.flashcards[currentCardIndex]?.front}
                            </div>
                            
                            {showAnswer && (
                              <div className="border-t pt-4 space-y-3">
                                <div className="text-sm text-green-600 font-medium">Answer</div>
                                <div className="text-gray-700 leading-relaxed">
                                  {results.flashcards[currentCardIndex]?.back}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="space-y-3">
                          {!showAnswer ? (
                            <button 
                              onClick={() => setShowAnswer(true)}
                              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                              Show Answer
                            </button>
                          ) : (
                            <div className="space-y-3">
                              <div className="text-sm text-gray-600 text-center">How well did you know this?</div>
                              <div className="grid grid-cols-3 gap-2">
                                <button 
                                  onClick={() => rateCard('hard')}
                                  className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                                >
                                  😰 Hard
                                </button>
                                <button 
                                  onClick={() => rateCard('medium')}
                                  className="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                                >
                                  🤔 Medium
                                </button>
                                <button 
                                  onClick={() => rateCard('easy')}
                                  className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                                >
                                  😊 Easy
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Navigation */}
                          <div className="flex justify-between items-center">
                            <button 
                              onClick={prevCard}
                              disabled={currentCardIndex === 0}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                currentCardIndex === 0 
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                  : 'bg-gray-600 text-white hover:bg-gray-700'
                              }`}
                            >
                              ← Previous
                            </button>
                            
                            <div className="flex space-x-2">
                              <button 
                                onClick={resetStudy}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                              >
                                Reset
                              </button>
                              <button 
                                onClick={() => setStudyMode(false)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                              >
                                Exit Study
                              </button>
                            </div>

                            <button 
                              onClick={nextCard}
                              disabled={currentCardIndex === results.flashcards.length - 1}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                currentCardIndex === results.flashcards.length - 1
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                  : 'bg-gray-600 text-white hover:bg-gray-700'
                              }`}
                            >
                              Next →
                            </button>
                          </div>
                        </div>

                        {/* Study Stats */}
                        {Object.keys(cardStats).length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-sm text-gray-600 mb-2">Study Progress:</div>
                            <div className="flex space-x-4 text-xs">
                              <span className="text-green-600">
                                Easy: {Object.values(cardStats).filter(s => s === 'easy').length}
                              </span>
                              <span className="text-yellow-600">
                                Medium: {Object.values(cardStats).filter(s => s === 'medium').length}
                              </span>
                              <span className="text-red-600">
                                Hard: {Object.values(cardStats).filter(s => s === 'hard').length}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {results.flashcards.slice(0, 2).map((card: any, index: number) => (
                          <div key={index} className="bg-white border rounded p-3">
                            <p className="font-medium text-sm text-gray-800 mb-1">Q: {card.front}</p>
                            <p className="text-sm text-gray-500 italic">Click "Start Study Mode" to practice →</p>
                          </div>
                        ))}
                        {results.flashcards.length > 2 && (
                          <p className="text-sm text-gray-500 italic">
                            +{results.flashcards.length - 2} more cards in study mode...
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={downloadSummaryPDF}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <span className="mr-2">📄</span>
                      Download Summary (PDF)
                    </button>
                    <button 
                      onClick={downloadAnkiCards}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                    >
                      <span className="mr-2">📚</span>
                      Download Study Cards (CSV)
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="border rounded-lg p-4 bg-gray-50 opacity-50">
                    <h4 className="font-semibold text-gray-800 mb-2">📝 Structured Summary</h4>
                    <p className="text-gray-600 text-sm">
                      AI-generated summary with key points, methodology, and conclusions...
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-gray-50 opacity-50">
                    <h4 className="font-semibold text-gray-800 mb-2">🧠 Study Cards</h4>
                    <p className="text-gray-600 text-sm">
                      Automatically generated flashcards for key concepts and definitions...
                    </p>
                  </div>

                  <div className="space-y-3 opacity-50">
                    <button disabled className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed">
                      📄 Download Summary (PDF)
                    </button>
                    <button disabled className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed">
                      📚 Download Study Cards (CSV)
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* History Section - For logged in users */}
        {isSignedIn && processingHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              📚 Recent Processing History
            </h3>
            <div className="space-y-4">
              {processingHistory.slice(0, 5).map((item) => (
                <HistoryItem 
                  key={item.id}
                  item={item}
                  downloadHistoryPDF={downloadHistoryPDF}
                  downloadHistoryCards={downloadHistoryCards}
                  setResults={setResults}
                />
              ))}
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Process academic papers in under 2 minutes with AI precision
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Summaries</h3>
            <p className="text-gray-600">
              Structured summaries that capture methodology, results, and conclusions
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Ready</h3>
            <p className="text-gray-600">
              Auto-generated flashcards optimized for spaced repetition learning
            </p>
          </div>
        </div>

        {/* Updated Pricing Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            🚀 Choose Your Plan
          </h3>
          <p className="text-gray-600 mb-6">
            Get more processing power and advanced features
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="border rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Free</h4>
              <div className="text-3xl font-bold text-gray-900 mb-4">$0<span className="text-sm text-gray-500">/mo</span></div>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>✅ 2 files/day</li>
                <li>✅ 100 pages/month</li>
                <li>✅ 10MB files</li>
                <li>✅ 8-12 cards</li>
              </ul>
              {(!isSignedIn || userProfile?.subscription_status === 'free') && (
                <div className="text-gray-500 text-sm">Current</div>
              )}
            </div>

            {/* Starter Plan */}
            <div className="border rounded-lg p-6 bg-blue-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Starter</h4>
              <div className="text-3xl font-bold text-blue-600 mb-4">$4.99<span className="text-sm text-gray-500">/mo</span></div>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>✅ 30 files/month</li>
                <li>✅ 500 pages/month</li>
                <li>✅ 15MB files</li>
                <li>✅ 12-18 cards</li>
              </ul>
              {userProfile?.subscription_status === 'starter' ? (
                <div className="text-green-600 text-sm font-medium">✓ Current</div>
              ) : (
                <button 
                  onClick={() => handleSubscribe('starter')}
                  className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Upgrade
                </button>
              )}
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-indigo-500 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Popular
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Pro</h4>
              <div className="text-3xl font-bold text-indigo-600 mb-4">$14.99<span className="text-sm text-gray-500">/mo</span></div>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>✅ 100 files/month</li>
                <li>✅ 3000 pages/month</li>
                <li>✅ 25MB files</li>
                <li>✅ 20-30 cards</li>
                <li>✅ Priority processing</li>
                <li>✅ Advanced AI</li>
              </ul>
              {userProfile?.subscription_status === 'pro' ? (
                <div className="text-green-600 text-sm font-medium">✓ Current</div>
              ) : (
                <button 
                  onClick={() => handleSubscribe('pro')}
                  className="w-full bg-indigo-600 text-white py-2 rounded text-sm hover:bg-indigo-700 transition-colors font-medium"
                >
                  Upgrade to Pro
                </button>
              )}
            </div>
{/* Enterprise Plan */}
            <div className="border rounded-lg p-6 bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Enterprise</h4>
              <div className="text-3xl font-bold text-gray-600 mb-4">$29.99<span className="text-sm text-gray-500">/mo</span></div>
              <ul className="text-xs text-gray-600 space-y-1 mb-4">
                <li>✅ Unlimited files</li>
                <li>✅ 10,000 pages/mo</li>
                <li>✅ 50MB files</li>
                <li>✅ 30-40 cards</li>
                <li>✅ API access</li>
                <li>✅ Team features</li>
              </ul>
              <div className="text-gray-500 text-sm">Coming Soon</div>
            </div>
          </div>
          
          {/* View Full Pricing Link */}
          <div className="mt-6">
            <Link 
              href="/pricing" 
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              View detailed pricing comparison →
            </Link>
          </div>
        </div>

        {/* Usage Dashboard for Logged In Users */}
        {isSignedIn && userProfile && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                📊 Your Usage Dashboard
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                userProfile.subscription_status === 'pro' ? 'bg-indigo-100 text-indigo-800' :
                userProfile.subscription_status === 'starter' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {userProfile.subscription_status.charAt(0).toUpperCase() + userProfile.subscription_status.slice(1)} Plan
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Files Usage */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Files Processed</span>
                  <FileCheck className="h-5 w-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {userProfile.subscription_status === 'free' 
                    ? `${dailyUsage.files_processed}/2`
                    : `${monthlyUsage.files_processed}/${
                        userProfile.subscription_status === 'pro' ? '100' :
                        userProfile.subscription_status === 'starter' ? '30' :
                        '∞'
                      }`
                  }
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {userProfile.subscription_status === 'free' ? 'Daily limit' : 'Monthly limit'}
                </div>
              </div>
              
              {/* Pages Usage */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Pages Processed</span>
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {monthlyPages}/{
                    userProfile.subscription_status === 'pro' ? '3000' :
                    userProfile.subscription_status === 'starter' ? '500' :
                    userProfile.subscription_status === 'enterprise' ? '10000' :
                    '100'
                  }
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {remainingPages} pages remaining
                </div>
                {/* Progress bar */}
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      monthlyPages / (userProfile.subscription_status === 'pro' ? 3000 :
                        userProfile.subscription_status === 'starter' ? 500 :
                        userProfile.subscription_status === 'enterprise' ? 10000 : 100) > 0.8
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ 
                      width: `${Math.min(100, (monthlyPages / (
                        userProfile.subscription_status === 'pro' ? 3000 :
                        userProfile.subscription_status === 'starter' ? 500 :
                        userProfile.subscription_status === 'enterprise' ? 10000 : 100
                      )) * 100)}%` 
                    }}
                  />
                </div>
              </div>
              
              {/* Upgrade CTA or Status */}
              <div className="border rounded-lg p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Plan Benefits</span>
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                </div>
                {userProfile.subscription_status === 'free' ? (
                  <>
                    <p className="text-sm text-gray-700 mb-3">
                      Upgrade for more files, pages, and advanced features
                    </p>
                    <button 
                      onClick={() => handleSubscribe('starter')}
                      className="w-full bg-indigo-600 text-white py-2 rounded text-sm hover:bg-indigo-700 transition-colors"
                    >
                      Upgrade Now
                    </button>
                  </>
                ) : userProfile.subscription_status === 'starter' ? (
                  <>
                    <p className="text-sm text-gray-700 mb-3">
                      Get 3x more pages and priority processing with Pro
                    </p>
                    <button 
                      onClick={() => handleSubscribe('pro')}
                      className="w-full bg-indigo-600 text-white py-2 rounded text-sm hover:bg-indigo-700 transition-colors"
                    >
                      Upgrade to Pro
                    </button>
                  </>
                ) : (
                  <div>
                    <p className="text-sm text-gray-700">
                      ✓ Priority processing<br/>
                      ✓ Advanced AI models<br/>
                      ✓ Unlimited history
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Feedback Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Help Us Improve
          </h3>
          <p className="text-gray-600 mb-6">
            Your feedback helps us make ScholarSumm better for researchers worldwide
          </p>
          <Link 
            href="/feedback" 
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            💬 Send Feedback
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ScholarSumm</h3>
              <p className="text-gray-400">
                Making academic research more accessible through AI-powered summaries
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/how-it-works" className="hover:text-white">How it works</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/examples" className="hover:text-white">Examples</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/feedback" className="hover:text-white">Feedback</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 ScholarSumm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}