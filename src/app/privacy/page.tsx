// src/app/privacy/page.tsx
import React from 'react';
import PageLayout from '../components/PageLayout';
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* ヘッダー */}
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
            
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                At ScholarSumm, we take your privacy seriously. This policy describes how we collect, 
                use, and protect your personal information when you use our service.
              </p>

              {/* データ収集セクション */}
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <Database className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Information</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Email address for account creation and communication</li>
                      <li>• Name (optional) for personalization</li>
                      <li>• Authentication data through Clerk</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Data</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Documents you upload for processing</li>
                      <li>• Generated study cards and summaries</li>
                      <li>• Interaction patterns to improve our service</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Information</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Processed securely through Stripe</li>
                      <li>• We do not store credit card details</li>
                      <li>• Billing history for your records</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* データ使用セクション */}
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
                </div>
                
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">✓</span>
                    <span>To provide and improve our document processing services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">✓</span>
                    <span>To communicate important updates and respond to support requests</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">✓</span>
                    <span>To process payments and manage subscriptions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">✓</span>
                    <span>To ensure security and prevent fraud</span>
                  </li>
                </ul>
              </section>

              {/* データ保護セクション */}
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <Lock className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-2xl font-semibold text-gray-900">Data Protection</h2>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <p className="text-gray-700">
                    We implement industry-standard security measures to protect your data:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Encrypted data transmission (HTTPS)</li>
                    <li>• Secure cloud storage with access controls</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Strict employee access policies</li>
                  </ul>
                </div>
              </section>

              {/* ユーザーの権利セクション */}
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <UserCheck className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-2xl font-semibold text-gray-900">Your Rights</h2>
                </div>
                
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 mb-1">Access Your Data</h4>
                    <p className="text-sm text-gray-600">Request a copy of your personal information</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 mb-1">Delete Your Account</h4>
                    <p className="text-sm text-gray-600">Remove your data from our systems</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 mb-1">Export Your Content</h4>
                    <p className="text-sm text-gray-600">Download your generated study materials</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 mb-1">Opt-Out</h4>
                    <p className="text-sm text-gray-600">Unsubscribe from marketing communications</p>
                  </div>
                </div>
              </section>

              {/* データ共有セクション */}
              <section className="mb-8">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
                  <h2 className="text-2xl font-semibold text-gray-900">Data Sharing</h2>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-gray-700 font-medium mb-2">We do NOT sell your personal data.</p>
                  <p className="text-gray-600 text-sm">
                    We only share information with trusted service providers necessary for our operations 
                    (e.g., Stripe for payments, Clerk for authentication) and when required by law.
                  </p>
                </div>
              </section>

              {/* Cookies セクション */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
                <p className="text-gray-600">
                  We use essential cookies for authentication and functionality. 
                  For more details, see our <a href="/cookies" className="text-blue-600 hover:text-blue-700 transition-colors">Cookie Policy</a>.
                </p>
              </section>

              {/* 連絡先セクション */}
              <section className="border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy or your personal data, please contact us:
                </p>
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:aiautosite@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                      aiautosite@gmail.com
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}