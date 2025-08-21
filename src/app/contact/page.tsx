// src/app/contact/page.tsx
import React from 'react';
import PageLayout from '../components/PageLayout';
import { Mail, Clock, MessageSquare, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* ページタイトル */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-gray-600 mb-8">
              Get in touch with our team for any questions, suggestions, or support needs.
            </p>
            
            {/* 連絡先情報グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* メインの連絡先 */}
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">Email Support</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  For general inquiries and support:
                </p>
                <a 
                  href="mailto:aiautosite@gmail.com" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  aiautosite@gmail.com
                </a>
              </div>
              
              {/* レスポンス時間 */}
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">Response Time</h2>
                </div>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Business Hours:</span> Mon-Fri, 9 AM - 6 PM EST
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Typical Response:</span> Within 24 hours
                </p>
              </div>
            </div>

            {/* その他の連絡方法 */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Other Ways to Connect</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* フィードバック */}
                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-gray-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Product Feedback</h3>
                    <p className="text-gray-600 text-sm">
                      Share your suggestions and feature requests through our{' '}
                      <a href="/feedback" className="text-blue-600 hover:text-blue-700 transition-colors">
                        feedback page
                      </a>
                    </p>
                  </div>
                </div>

                {/* ヘルプセンター */}
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Help Center</h3>
                    <p className="text-gray-600 text-sm">
                      Find answers to common questions in our{' '}
                      <a href="/help" className="text-blue-600 hover:text-blue-700 transition-colors">
                        help center
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ セクション */}
            <div className="mt-8 border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Before You Contact Us</h2>
              <p className="text-gray-600 mb-4">
                You might find quick answers to your questions in these resources:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">•</span>
                  Check our <a href="/how-it-works" className="text-blue-600 hover:text-blue-700 transition-colors">How It Works</a> page for usage guidelines
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">•</span>
                  View <a href="/examples" className="text-blue-600 hover:text-blue-700 transition-colors">Examples</a> to see what ScholarSumm can do
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">•</span>
                  Review our <a href="/pricing" className="text-blue-600 hover:text-blue-700 transition-colors">Pricing</a> for subscription details
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}