'use client'

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2025</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-6">
              ScholarSumm ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our 
              AI-powered document summarization service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Information</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Email address (when you create an account)</li>
              <li>Name (if provided during registration)</li>
              <li>Payment information (processed securely through Stripe)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Document Data</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Documents you upload for processing</li>
              <li>Generated summaries and flashcards</li>
              <li>Processing metadata (file size, type, processing time)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Usage Information</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Service usage patterns and frequency</li>
              <li>Feature usage statistics</li>
              <li>Error logs and performance data</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To process your documents and generate summaries</li>
              <li>To manage your account and subscription</li>
              <li>To improve our AI models and service quality</li>
              <li>To communicate with you about service updates</li>
              <li>To provide customer support</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Document Processing and AI</h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">Important: Document Privacy</h4>
              <ul className="list-disc list-inside text-blue-700 space-y-2">
                <li>Your documents are processed by Claude AI for summarization</li>
                <li>Documents are automatically deleted within 24 hours of processing</li>
                <li>We do not store document content beyond the processing period</li>
                <li>Generated summaries are kept for your account access only</li>
                <li>We do not use your documents to train AI models</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li><strong>Service Providers:</strong> With trusted third parties who assist in operating our service (Stripe for payments, Supabase for data storage)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or asset sale</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">We implement appropriate security measures to protect your information:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Encryption in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure data centers and infrastructure</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Withdraw Consent:</strong> Opt out of certain data processing</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Retention</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li><strong>Account Data:</strong> Retained while your account is active</li>
              <li><strong>Documents:</strong> Deleted within 24 hours of processing</li>
              <li><strong>Generated Content:</strong> Retained for account access (summaries, flashcards)</li>
              <li><strong>Usage Data:</strong> Retained for service improvement (anonymized after 2 years)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">International Transfers</h2>
            <p className="text-gray-700 mb-6">
              Your information may be transferred to and processed in countries other than your country of residence. 
              We ensure appropriate safeguards are in place for international transfers.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our service is not intended for children under 13. We do not knowingly collect personal 
              information from children under 13. If we learn we have collected such information, 
              we will delete it immediately.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy periodically. We will notify you of any material changes 
              by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-100 rounded-lg p-6">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@scholarsum.com</p>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> [Your Business Address]</p>
              <p className="text-gray-700"><strong>Response Time:</strong> We aim to respond within 48 hours</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; 2025 ScholarSumm. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}