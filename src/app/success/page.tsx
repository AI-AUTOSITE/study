// src/app/success/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import PageLayout from '../components/PageLayout';
import { CheckCircle, BookOpen, FileText, Users, Mail } from 'lucide-react';

export default function SuccessPage() {
  const { user } = useUser();
  const [isUpdating, setIsUpdating] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      if (!user) return;
      
      try {
        // ユーザープロフィールを取得
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('clerk_user_id', user.id)
          .single();
          
        if (profile) {
          // 手動でProステータスに更新（Webhookが設定されるまでの暫定対応）
          const { error } = await supabase
            .from('user_profiles')
            .update({ 
              subscription_status: 'pro',
              updated_at: new Date().toISOString()
            })
            .eq('id', profile.id);
            
          if (!error) {
            setUpdateSuccess(true);
          }
        }
      } catch (error) {
        console.error('Error updating subscription:', error);
      } finally {
        setIsUpdating(false);
      }
    };
    
    updateSubscriptionStatus();
  }, [user]);

  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-white">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-serif mb-2">
                {isUpdating ? 'Processing Your Subscription...' : 'Subscription Activated Successfully'}
              </h1>
              
              {!isUpdating && (
                <p className="text-green-100 text-lg">
                  Welcome to ScholarSumm Professional
                </p>
              )}
            </div>

            {/* Content Section */}
            <div className="p-8">
              {isUpdating ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Configuring your Professional account...</p>
                  <p className="text-sm text-gray-500 mt-2">This typically takes a few seconds</p>
                </div>
              ) : updateSuccess ? (
                <>
                  {/* Confirmation Message */}
                  <div className="bg-green-50 border border-green-200 rounded p-6 mb-8">
                    <h2 className="text-lg font-semibold text-green-900 mb-2">
                      Your Professional Subscription is Now Active
                    </h2>
                    <p className="text-green-800">
                      Thank you for subscribing to ScholarSumm Professional. Your account has been upgraded 
                      and you now have access to all premium features.
                    </p>
                  </div>

                  {/* Benefits Overview */}
                  <div className="mb-8">
                    <h3 className="text-xl font-serif text-gray-900 mb-6">Your Professional Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <FileText className="h-6 w-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">100 Documents Monthly</h4>
                          <p className="text-gray-600 text-sm">
                            Process up to 100 academic papers each month with priority queue access
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <BookOpen className="h-6 w-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Advanced Analysis</h4>
                          <p className="text-gray-600 text-sm">
                            Enhanced AI processing with deeper semantic understanding
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-6 w-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Priority Support</h4>
                          <p className="text-gray-600 text-sm">
                            Direct email support with response within 24 hours
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-6 w-6 text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Extended File Size</h4>
                          <p className="text-gray-600 text-sm">
                            Upload documents up to 100MB for comprehensive analysis
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="bg-gray-50 rounded p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Next Steps</h3>
                    <ol className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">1</span>
                        <div>
                          <p className="text-gray-700">
                            <strong>Upload Your First Document:</strong> Test the enhanced processing capabilities 
                            with one of your research papers
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">2</span>
                        <div>
                          <p className="text-gray-700">
                            <strong>Explore Advanced Features:</strong> Try the comprehensive study card generation 
                            and enhanced summarization
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">3</span>
                        <div>
                          <p className="text-gray-700">
                            <strong>Review Documentation:</strong> Visit our help center for tips on maximizing 
                            your subscription benefits
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="/" 
                      className="flex-1 text-center bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Start Processing Documents
                    </a>
                    <a 
                      href="/help" 
                      className="flex-1 text-center border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded hover:bg-indigo-50 transition-colors font-medium"
                    >
                      View Help Guide
                    </a>
                  </div>
                </>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded p-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Subscription Activation Issue
                  </h3>
                  <p className="text-red-800 mb-4">
                    We encountered an issue while activating your subscription. This is typically temporary 
                    and will resolve automatically within a few minutes.
                  </p>
                  <p className="text-red-700 text-sm">
                    If this issue persists, please contact support at{' '}
                    <a href="mailto:aiautosite@gmail.com" className="underline">
                      aiautosite@gmail.com
                    </a>{' '}
                    with your order confirmation.
                  </p>
                </div>
              )}

              {/* Receipt Notice */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  A receipt has been sent to your registered email address. You can manage your 
                  subscription through your account settings at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}