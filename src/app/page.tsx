'use client'

import React, { useState, useEffect } from 'react';
import { Upload, FileText, Zap, Star, Menu, X, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/nextjs';
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

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // フラッシュカード用の状態
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [cardStats, setCardStats] = useState<{[key: number]: 'easy' | 'medium' | 'hard' | null}>({});

  // Supabase関連の状態
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [processingHistory, setProcessingHistory] = useState<any[]>([]);
  const [dailyUsage, setDailyUsage] = useState({ files_processed: 0, credits_used: 0 });
  const [monthlyUsage, setMonthlyUsage] = useState({ files_processed: 0, credits_used: 0 });
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  
  // ハイドレーション対応の状態
  const [canProcessState, setCanProcessState] = useState(true);
  const [isClientSide, setIsClientSide] = useState(false);

  // ユーザープロフィール初期化（Supabase版）
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
      
      // 使用量を取得
      if (profile) {
        // 日次使用量（無料ユーザー）
        if (profile.subscription_status === 'free') {
          const { data: dailyData } = await getDailyUsage(profile.id);
          if (dailyData) {
            setDailyUsage({
              files_processed: dailyData.files_processed,
              credits_used: dailyData.credits_used
            });
          }
        }
        
        // 月次使用量（Proユーザー）
        if (profile.subscription_status === 'pro') {
          const { data: monthlyData } = await getMonthlyUsage(profile.id);
          if (monthlyData) {
            setMonthlyUsage({
              files_processed: monthlyData.files_processed,
              credits_used: monthlyData.credits_used
            });
          }
        }
        
        // 処理履歴を取得
        const { data: history } = await getProcessingHistory(profile.id);
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

  // サインイン時にプロフィール初期化
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      initializeUserProfile(
        user.id,
        user.emailAddresses[0].emailAddress,
        user.firstName || undefined
      );
    }
  }, [isLoaded, isSignedIn, user]);

  // クライアントサイド初期化
  useEffect(() => {
    setIsClientSide(true);
  }, []);

  // 制限チェック用のuseEffect
  useEffect(() => {
    if (!isClientSide) return;
    
    const checkProcessLimit = async () => {
      if (!isLoaded) return false;
      
      // ゲストユーザー（1日1ファイル）
      if (!isSignedIn) {
        try {
          const today = new Date().toDateString();
          const lastUsed = localStorage.getItem('lastProcessDate');
          const guestCount = parseInt(localStorage.getItem('dailyGuestCount') || '0');
          
          if (lastUsed !== today) {
            localStorage.setItem('dailyGuestCount', '0');
            return true;
          }
          return guestCount < 1;
        } catch (error) {
          return true;
        }
      }
      
      if (!userProfile) return false;
      
      // Proユーザー（月100ファイル）
      if (userProfile.subscription_status === 'pro') {
        return monthlyUsage.files_processed < 100;
      }
      
      // 無料ユーザー（1日3ファイル）
      return dailyUsage.files_processed < 3;
    };
    
    checkProcessLimit().then(setCanProcessState);
  }, [isClientSide, isLoaded, isSignedIn, userProfile, dailyUsage, monthlyUsage]);

  // 利用制限チェック（ハイドレーション対応）
  const canProcess = () => {
    if (!isClientSide) return true; // サーバーサイドでは常にtrue
    return canProcessState;
  };

  const updateUsageCount = async () => {
    if (!isClientSide) return; // サーバーサイドでは何もしない
    
    // ゲストユーザー
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
    // ログインユーザー
    else if (userProfile) {
      try {
        // Supabaseで使用量を更新
        const { error } = await incrementUsage(
          userProfile.id, 
          userProfile.subscription_status === 'pro'
        );
        
        if (error) {
          console.error('Error updating usage:', error);
          return;
        }
        
        // ローカル状態を更新
        if (userProfile.subscription_status === 'pro') {
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
    
    // 制限状態を再チェック
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
          return guestCount < 1;
        } catch (error) {
          return true;
        }
      }
      
      if (!userProfile) return false;
      
      if (userProfile.subscription_status === 'pro') {
        return monthlyUsage.files_processed < 100;
      }
      
      return dailyUsage.files_processed < 3;
    };
    
    const canStillProcess = await checkProcessLimit();
    setCanProcessState(canStillProcess);
  };

  // Stripe Checkout
  const handleSubscribe = async () => {
    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: "price_1Rs3MoGSxhYhM1Axrn21fcgc",
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
      // ファイル検証
      const maxSize = 50 * 1024 * 1024; // 50MB（Proユーザーは100MB）
      const maxSizeForUser = userProfile?.subscription_status === 'pro' ? 100 * 1024 * 1024 : maxSize;
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (file.size > maxSizeForUser) {
        setError(`File too large! Maximum size is ${maxSizeForUser / 1024 / 1024}MB. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB.`);
        return;
      }
      
      if (!allowedTypes.includes(file.type)) {
        setError(`Unsupported file type! Please upload PDF or DOCX files only. Your file type: ${file.type}`);
        return;
      }
      
      setUploadedFile(file);
      setError(null);
      setResults(null);
    }
  };

  const processFile = async () => {
    if (!uploadedFile) return;

    // 利用制限チェック
    if (!canProcess()) {
      if (!isSignedIn) {
        setError('Daily limit reached. Please sign in for more processing!');
      } else if (userProfile?.subscription_status === 'pro') {
        setError('Monthly limit reached. Please wait until next month.');
      } else {
        setError('Daily limit reached. Upgrade to Pro for more processing!');
      }
      return;
    }

    setIsProcessing(true);
    setError(null);

    // ネットワーク接続チェック
    if (typeof window !== 'undefined' && !navigator.onLine) {
      setError('No internet connection. Please check your network and try again.');
      setIsProcessing(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      // タイムアウト付きfetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2分タイムアウト

      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
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
      
      // 処理結果をSupabaseに保存
      if (userProfile && data.results) {
        try {
          await saveProcessingHistory({
            user_id: userProfile.id,
            file_name: uploadedFile.name,
            file_size: uploadedFile.size,
            file_type: uploadedFile.type,
            summary_text: data.results.summary,
            flashcard_data: data.results.flashcards,
            credits_used: 1
          });
          
          // 履歴を再取得
          const { data: history } = await getProcessingHistory(userProfile.id);
          if (history) {
            setProcessingHistory(history);
          }
        } catch (historyError) {
          console.error('Error saving processing history:', historyError);
          // 履歴保存エラーは処理続行
        }
      }
      
      // フラッシュカード関連の状態をリセット
      setCurrentCardIndex(0);
      setShowAnswer(false);
      setStudyMode(false);
      setCardStats({});
      
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
    }
  };

  // フラッシュカード操作関数
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
    
    // 自動的に次のカードに進む
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

  // ダウンロード機能
  const downloadSummaryPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    // PDF設定
    doc.setFontSize(20);
    doc.text('Document Summary', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`File: ${results.fileName}`, 20, 50);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 60);
    
    // 要約を追加
    doc.setFontSize(14);
    doc.text('Summary:', 20, 80);
    
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(results.summary, 170);
    doc.text(summaryLines, 20, 95);
    
    // フラッシュカードを追加
    let yPosition = 95 + (summaryLines.length * 5) + 20;
    
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
      // CSVエスケープ処理
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

  // 使用状況の表示テキスト
  const getUsageText = () => {
    if (!isSignedIn) return 'Guests: 1 file/day';
    
    if (!userProfile) return 'Loading...';
    
    if (userProfile.subscription_status === 'pro') {
      const remaining = 100 - monthlyUsage.files_processed;
      return `Pro: ${remaining} files left this month`;
    }
    
    const remaining = 3 - dailyUsage.files_processed;
    return `Free: ${remaining} files left today`;
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
                      Maximum file size: {userProfile?.subscription_status === 'pro' ? '100MB' : '50MB'}
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

            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                <span className="text-center sm:text-left">
                  {getUsageText()}
                  {isSignedIn && <span className="text-green-600 ml-2">✓ Signed in</span>}
                  {isLoadingProfile && <span className="text-blue-600 ml-2">Loading...</span>}
                </span>
                <span className="text-center sm:text-right">🔄 Processing time: ~2 minutes</span>
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
                      <span className="text-sm sm:text-base">Processing...</span>
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
                      onClick={handleSubscribe}
                      className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm underline"
                    >
                      Upgrade to Pro for more processing!
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

        {/* History Section - ログインユーザーのみ表示 */}
        {isSignedIn && processingHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              📚 Recent Processing History
            </h3>
            <div className="space-y-4">
              {processingHistory.slice(0, 5).map((item, index) => (
                <div key={item.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{item.file_name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {(item.file_size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
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
              Process academic papers in under 3 minutes with AI precision
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

        {/* Pricing Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            🚀 Upgrade to Pro
          </h3>
          <p className="text-gray-600 mb-6">
            Get more processing power and advanced features
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="border rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Free Plan</h4>
              <div className="text-3xl font-bold text-gray-900 mb-4">$0<span className="text-sm text-gray-500">/month</span></div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>✅ 3 files per day</li>
                <li>✅ Basic summaries</li>
                <li>✅ Study cards</li>
                <li>✅ 7-day history</li>
                <li>❌ Large files (50MB+)</li>
                <li>❌ Priority processing</li>
              </ul>
              {(!isSignedIn || userProfile?.subscription_status === 'free') && (
                <div className="text-gray-500 text-sm">Current Plan</div>
              )}
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-indigo-500 rounded-lg p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-medium">
                Recommended
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Pro Plan</h4>
              <div className="text-3xl font-bold text-indigo-600 mb-4">$9.99<span className="text-sm text-gray-500">/month</span></div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>✅ 100 files per month</li>
                <li>✅ Advanced summaries</li>
                <li>✅ Unlimited study cards</li>
                <li>✅ Unlimited history</li>
                <li>✅ Large files (up to 100MB)</li>
                <li>✅ Priority processing</li>
                <li>✅ Email support</li>
              </ul>
              {userProfile?.subscription_status === 'pro' ? (
                <div className="text-green-600 text-sm font-medium">✓ Current Plan</div>
              ) : (
                <button 
                  onClick={handleSubscribe}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Upgrade to Pro
                </button>
              )}
            </div>
          </div>
        </div>

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