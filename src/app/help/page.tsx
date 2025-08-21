// src/app/help/page.tsx
import React from 'react';
import PageLayout from '../components/PageLayout';
import { HelpCircle, FileUp, FileText, Download, Zap, AlertCircle, Search } from 'lucide-react';

export default function HelpPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* ヘッダー */}
            <div className="flex items-center mb-6">
              <HelpCircle className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
            </div>
            
            <p className="text-gray-600 mb-8">
              Find answers to common questions and learn how to get the most out of ScholarSumm.
            </p>

            {/* Quick Links */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="#getting-started" className="flex items-center text-blue-600 hover:text-blue-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Getting Started
                </a>
                <a href="#troubleshooting" className="flex items-center text-blue-600 hover:text-blue-700">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Troubleshooting
                </a>
                <a href="#faq" className="flex items-center text-blue-600 hover:text-blue-700">
                  <Search className="h-4 w-4 mr-2" />
                  FAQ
                </a>
              </div>
            </div>

            {/* Getting Started Section */}
            <section id="getting-started" className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Getting Started</h2>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign Up or Sign In</h3>
                    <p className="text-gray-600">
                      Create a free account or sign in to access ScholarSumm. We offer both free and premium plans.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Document</h3>
                    <p className="text-gray-600 mb-2">
                      Click the upload button and select your research paper or academic document.
                    </p>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-sm text-gray-600">
                        <strong>Supported formats:</strong> PDF, DOCX<br />
                        <strong>Maximum file size:</strong> 50MB<br />
                        <strong>Best results with:</strong> Text-based documents with clear structure
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Process Your Document</h3>
                    <p className="text-gray-600">
                      Click "Process Document" and our AI will analyze your paper. Processing typically takes 30-60 seconds.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Review and Export</h3>
                    <p className="text-gray-600">
                      Review the generated study cards and summaries. Export them as PDF or save for later study.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FileUp className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Smart Upload</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Drag and drop or click to upload. Automatic format detection and validation.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">AI Summarization</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Advanced AI extracts key concepts and creates concise summaries.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Study Cards</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Automatically generate flashcards for effective memorization.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Download className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Export Options</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Download as PDF, share with classmates, or sync to study apps.
                  </p>
                </div>
              </div>
            </section>

            {/* Troubleshooting Section */}
            <section id="troubleshooting" className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Troubleshooting</h2>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Upload Failed</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Check file size (max 50MB)</li>
                    <li>• Ensure file is PDF or DOCX format</li>
                    <li>• Try refreshing the page</li>
                    <li>• Check your internet connection</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Processing Taking Too Long</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Large documents may take up to 2 minutes</li>
                    <li>• Complex PDFs with many images take longer</li>
                    <li>• Try uploading a smaller section first</li>
                    <li>• Contact support if issue persists</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Poor Summary Quality</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Ensure document has clear text (not scanned images)</li>
                    <li>• Check that document is in English</li>
                    <li>• Academic papers with clear structure work best</li>
                    <li>• Try reprocessing or contact support</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How accurate are the AI summaries?</h3>
                  <p className="text-gray-600">
                    Our AI achieves high accuracy for academic content, but we always recommend reviewing 
                    the generated summaries against your original document for important details.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Can I edit the generated study cards?</h3>
                  <p className="text-gray-600">
                    Yes! Premium users can edit and customize all generated content before exporting.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
                  <p className="text-gray-600">
                    Absolutely. We use enterprise-grade encryption and never share your documents. 
                    See our <a href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</a> for details.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What's the difference between free and premium?</h3>
                  <p className="text-gray-600">
                    Free users can process up to 5 documents per month. Premium users get unlimited processing, 
                    advanced features, and priority support. See our <a href="/pricing" className="text-blue-600 hover:text-blue-700">Pricing</a> page.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Can I cancel my subscription anytime?</h3>
                  <p className="text-gray-600">
                    Yes, you can cancel your subscription at any time. You'll continue to have access 
                    until the end of your billing period.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Do you support languages other than English?</h3>
                  <p className="text-gray-600">
                    Currently, ScholarSumm works best with English documents. We're working on adding 
                    support for other languages in future updates.
                  </p>
                </div>
              </div>
            </section>

            {/* Still Need Help */}
            <section className="border-t pt-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still Need Help?</h2>
                <p className="text-gray-600 mb-4">
                  Our support team is here to assist you with any questions or issues.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a 
                    href="/feedback" 
                    className="inline-flex items-center justify-center bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Send Feedback
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}