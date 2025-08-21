// src/app/feedback/page.tsx
'use client';

import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { MessageSquare, ThumbsUp, Bug, Lightbulb, Star, Send } from 'lucide-react';

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState('general');
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで実際の送信処理を行う
    console.log('Feedback submitted:', { feedbackType, rating, email, message });
    setSubmitted(true);
    // 3秒後にフォームをリセット
    setTimeout(() => {
      setSubmitted(false);
      setFeedbackType('general');
      setRating(0);
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* ヘッダー */}
            <div className="flex items-center mb-6">
              <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Send Feedback</h1>
            </div>
            
            <p className="text-gray-600 mb-8">
              We value your feedback! Help us improve ScholarSumm by sharing your thoughts, 
              reporting issues, or suggesting new features.
            </p>

            {submitted ? (
              // 送信完了メッセージ
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <ThumbsUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h2>
                <p className="text-gray-600">
                  Your feedback has been received. We appreciate your input and will review it carefully.
                </p>
              </div>
            ) : (
              // フィードバックフォーム
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* フィードバックタイプ選択 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What type of feedback do you have?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setFeedbackType('general')}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                        feedbackType === 'general'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      General
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackType('bug')}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                        feedbackType === 'bug'
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Bug className="h-5 w-5 mr-2" />
                      Bug Report
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackType('feature')}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                        feedbackType === 'feature'
                          ? 'border-green-600 bg-green-50 text-green-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Lightbulb className="h-5 w-5 mr-2" />
                      Feature Request
                    </button>
                  </div>
                </div>

                {/* 評価 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How would you rate your experience?
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* メールアドレス（オプション） */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Provide your email if you'd like us to follow up on your feedback
                  </p>
                </div>

                {/* メッセージ */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    required
                    placeholder={
                      feedbackType === 'bug'
                        ? 'Please describe the issue you encountered...'
                        : feedbackType === 'feature'
                        ? 'Tell us about the feature you would like to see...'
                        : 'Share your thoughts with us...'
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* 送信ボタン */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Feedback
                  </button>
                </div>
              </form>
            )}

            {/* その他の連絡方法 */}
            <div className="mt-8 pt-8 border-t">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Other Ways to Reach Us</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600 mb-2">
                  You can also send us feedback directly via email:
                </p>
                <a 
                  href="mailto:aiautosite@gmail.com?subject=ScholarSumm Feedback" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  aiautosite@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}