'use client'

import React from 'react';
import { Upload, FileText, Zap, Star, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                ScholarSumm
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/pricing" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How ScholarSumm Works
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Transform any research paper into study-ready materials in just 3 simple steps
          </p>
        </div>

        {/* Step-by-Step Process */}
        <div className="space-y-16 mb-16">
          {/* Step 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4">
                  1
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Upload Your Document</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Simply drag and drop your PDF or DOCX research paper. We support academic papers, 
                journal articles, conference proceedings, and thesis documents up to 50MB.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">PDF and DOCX support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Up to 50MB file size</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Secure processing</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="border-2 border-dashed border-indigo-300 rounded-lg p-12 text-center">
                  <Upload className="mx-auto text-indigo-600 mb-4" size={48} />
                  <p className="text-lg text-gray-600 mb-4">Drop your research paper here</p>
                  <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg inline-block">
                    Browse Files
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-3"></div>
                  <span className="text-lg font-medium text-gray-700">Processing with AI...</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="h-4 bg-indigo-200 rounded animate-pulse"></div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="h-4 bg-indigo-200 rounded animate-pulse"></div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="h-4 bg-indigo-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4">
                  2
                </div>
                <h2 className="text-3xl font-bold text-gray-900">AI Analysis</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Our advanced AI powered by Claude 3.5 Sonnet analyzes your document, extracting 
                key concepts, methodologies, findings, and conclusions with academic precision.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Deep content understanding</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Academic context awareness</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">~2 minute processing time</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4">
                  3
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Study & Download</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Get a structured summary and interactive flashcards. Use our study mode for 
                spaced repetition learning, then download your materials as PDF or CSV for Anki.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Interactive study mode</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">PDF summary export</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Anki-compatible flashcards</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-800 mb-2">📝 Summary</h4>
                    <div className="text-sm text-gray-600">
                      Structured analysis with key findings...
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-800 mb-2">🧠 Study Cards</h4>
                    <div className="bg-white border-2 border-purple-200 rounded p-4 text-center">
                      <div className="text-purple-600 font-medium mb-2">Question</div>
                      <div className="text-gray-800">What is the main hypothesis?</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded text-sm">
                      📄 Download PDF
                    </button>
                    <button className="flex-1 bg-purple-600 text-white py-2 rounded text-sm">
                      📚 Download CSV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose ScholarSumm?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Process any research paper in under 3 minutes with state-of-the-art AI
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Academic Precision</h3>
              <p className="text-gray-600">
                Specialized for academic content with deep understanding of research methodologies
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Optimized</h3>
              <p className="text-gray-600">
                Generate flashcards optimized for spaced repetition and long-term retention
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Research?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers, students, and academics who use ScholarSumm to 
            accelerate their learning and research process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg">
              Start Free Trial
            </Link>
            <Link href="/pricing" className="border border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition-colors font-medium text-lg">
              View Pricing
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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