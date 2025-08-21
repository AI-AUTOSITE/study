'use client'

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {isUpdating ? 'Processing...' : 'Welcome to ScholarSumm Pro!'}
          </h1>
          
          {isUpdating ? (
            <div className="mb-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Activating your Pro subscription...</p>
            </div>
          ) : updateSuccess ? (
            <>
              <p className="text-gray-600 mb-8">
                Your Pro subscription is now active! You can now process up to 100 files per month.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                <h3 className="font-semibold text-green-900 mb-2">What's included in Pro:</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>✅ 100 files per month</li>
                  <li>✅ Large files up to 100MB</li>
                  <li>✅ Priority processing</li>
                  <li>✅ Unlimited history</li>
                  <li>✅ Email support</li>
                </ul>
              </div>
            </>
          ) : (
            <p className="text-gray-600 mb-8">
              There was an issue activating your subscription. Please contact support if this persists.
            </p>
          )}
          
          <Link 
            href="/" 
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Processing Documents
          </Link>
          
          <p className="text-sm text-gray-500 mt-4">
            You will receive a confirmation email shortly.
          </p>
        </div>
      </div>
    </div>
  );
}