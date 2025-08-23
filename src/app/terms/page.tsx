// src/app/terms/page.tsx
import React from 'react';
import PageLayout from '../components/PageLayout';
import { FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* ヘッダー */}
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
            </div>
            
            <p className="text-gray-600 mb-6">
              Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose max-w-none text-gray-600">
              <p className="mb-6">
                Welcome to ScholarSumm. By using our service, you agree to be bound by these Terms of Service. 
                Please read them carefully before using our platform.
              </p>

              {/* サービス説明 */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Service Description</h2>
                <p className="mb-4">
                  ScholarSumm is an AI-powered platform that transforms research papers and academic documents 
                  into study cards, summaries, and other educational materials.
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-medium text-gray-700 mb-2">Our service includes:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Document processing (PDF, DOCX)</li>
                    <li>• AI-generated summaries and study cards</li>
                    <li>• Export capabilities for study materials</li>
                    <li>• Cloud storage for processed documents</li>
                  </ul>
                </div>
              </section>

              {/* 利用可能な使用 */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Acceptable Use</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">Permitted Uses</h3>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Personal educational purposes</li>
                      <li>• Academic research</li>
                      <li>• Study preparation</li>
                      <li>• Teaching materials creation</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <XCircle className="h-5 w-5 text-red-600 mr-2" />
                      <h3 className="font-semibold text-gray-900">Prohibited Uses</h3>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Copyright infringement</li>
                      <li>• Commercial redistribution</li>
                      <li>• Plagiarism or academic dishonesty</li>
                      <li>• Illegal or harmful content</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* ユーザーアカウント */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span>You are responsible for maintaining the confidentiality of your account credentials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span>You must provide accurate and complete information during registration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span>You are responsible for all activities under your account</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span>You must notify us immediately of any unauthorized use</span>
                  </li>
                </ul>
              </section>

              {/* 知的財産権 */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 mb-2">
                        <strong>Important:</strong> You retain ownership of your uploaded documents.
                      </p>
                      <p className="text-gray-600 text-sm">
                        By using ScholarSumm, you grant us a limited license to process your documents 
                        solely for providing our services. We do not claim ownership of your content.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 支払いと返金 */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment and Refunds</h2>
                <div className="space-y-3 text-gray-600">
                  <p>• Subscription fees are billed in advance on a monthly or annual basis</p>
                  <p>• All payments are processed securely through Stripe</p>
                  <p>• Refunds are provided according to our refund policy</p>
                  <p>• You can cancel your subscription at any time</p>
                </div>
              </section>

              {/* 制限事項 */}
<section className="mb-8">
  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Service Limitations</h2>
  <div className="border border-gray-200 rounded-lg p-4">
    <ul className="space-y-2 text-gray-600">
      <li>• Maximum file size: 10MB (Free), 25MB (Pro)</li>
      <li>• Supported formats: PDF, DOCX</li>
      <li>• Processing limits: 3/day (Free), 100/month (Pro)</li>
      <li>• Service availability: 99.9% uptime target</li>
    </ul>
  </div>
</section>

              {/* 免責事項 */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Disclaimer</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">
                    ScholarSumm is provided "as is" without warranties of any kind. While we strive for accuracy, 
                    AI-generated summaries may contain errors. Always verify important information against 
                    original sources. We are not responsible for academic outcomes based on our service.
                  </p>
                </div>
              </section>

              {/* 責任制限 */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-600">
                  To the maximum extent permitted by law, ScholarSumm shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages resulting from your use of the service.
                </p>
              </section>

              {/* 変更 */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
                <p className="text-gray-600">
                  We reserve the right to modify these terms at any time. We will notify users of significant 
                  changes via email or through the service. Continued use after changes constitutes acceptance.
                </p>
              </section>

              {/* 連絡先 */}
              <section className="border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
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