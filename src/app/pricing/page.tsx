// src/app/pricing/page.tsx
'use client';

import React from 'react';
import PageLayout from '../components/PageLayout';
import { Check, X, GraduationCap, Users, Building } from 'lucide-react';

export default function PricingPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - Academic Style */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-gray-900 mb-4">Subscription Plans</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Select the appropriate tier based on your academic requirements and institutional needs
            </p>
          </div>

          {/* Academic Notice */}
          <div className="bg-white border-l-4 border-indigo-600 shadow-md p-6 mb-12 max-w-4xl mx-auto">
            <div className="flex items-center">
              <GraduationCap className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
              <p className="text-gray-700">
                <strong>Academic Discount Available:</strong> Students and educators with valid institutional 
                email addresses may be eligible for additional discounts. Contact us for verification.
              </p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Basic Plan */}
            <div className="bg-white rounded shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-900 text-white p-6">
                <h3 className="text-2xl font-serif mb-2">Basic</h3>
                <p className="text-gray-300 text-sm">Individual Researchers</p>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900">$0</div>
                  <p className="text-gray-600 mt-1">per month</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 uppercase text-sm tracking-wide">Features Include:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">3 documents per day</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Standard summarization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Basic study cards</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">PDF & CSV export</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500">Priority processing</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500">Extended file size limit</span>
                    </li>
                  </ul>
                </div>
                
                <a 
                  href="/sign-up"
                  className="block w-full text-center bg-gray-800 text-white py-3 px-6 rounded hover:bg-gray-900 transition-colors font-medium"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-white rounded shadow-lg border-2 border-indigo-600 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 bg-indigo-600 text-white text-center py-1 text-sm font-semibold">
                RECOMMENDED FOR STUDENTS
              </div>
              <div className="bg-indigo-900 text-white p-6 mt-7">
                <h3 className="text-2xl font-serif mb-2">Professional</h3>
                <p className="text-indigo-200 text-sm">Graduate Students & Faculty</p>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-indigo-900">$9.99</div>
                  <p className="text-gray-600 mt-1">per month</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 uppercase text-sm tracking-wide">Features Include:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">100 documents per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Advanced AI analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Comprehensive study materials</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Priority processing queue</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Files up to 100MB</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Email support</span>
                    </li>
                  </ul>
                </div>
                
                <a 
                  href="/sign-up"
                  className="block w-full text-center bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700 transition-colors font-medium"
                >
                  Start Free Trial
                </a>
              </div>
            </div>

            {/* Institutional Plan */}
            <div className="bg-white rounded shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-900 text-white p-6">
                <h3 className="text-2xl font-serif mb-2">Institutional</h3>
                <p className="text-gray-300 text-sm">Universities & Research Labs</p>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900">Custom</div>
                  <p className="text-gray-600 mt-1">Contact for pricing</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 uppercase text-sm tracking-wide">Features Include:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Unlimited documents</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Multi-user access</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">API integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Custom workflows</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Dedicated support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">FERPA compliant</span>
                    </li>
                  </ul>
                </div>
                
                <a 
                  href="/contact"
                  className="block w-full text-center bg-gray-800 text-white py-3 px-6 rounded hover:bg-gray-900 transition-colors font-medium"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded shadow-lg overflow-hidden mb-16">
            <div className="bg-gray-900 text-white p-6">
              <h2 className="text-2xl font-serif">Detailed Feature Comparison</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-900">Basic</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-900">Professional</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-900">Institutional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Document Processing Limit</td>
                    <td className="text-center px-6 py-4">3/day</td>
                    <td className="text-center px-6 py-4">100/month</td>
                    <td className="text-center px-6 py-4">Unlimited</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Maximum File Size</td>
                    <td className="text-center px-6 py-4">50MB</td>
                    <td className="text-center px-6 py-4">100MB</td>
                    <td className="text-center px-6 py-4">Custom</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Processing Speed</td>
                    <td className="text-center px-6 py-4">Standard</td>
                    <td className="text-center px-6 py-4">Priority</td>
                    <td className="text-center px-6 py-4">Dedicated</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Study Card Generation</td>
                    <td className="text-center px-6 py-4">Basic</td>
                    <td className="text-center px-6 py-4">Advanced</td>
                    <td className="text-center px-6 py-4">Custom</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Export Formats</td>
                    <td className="text-center px-6 py-4">PDF, CSV</td>
                    <td className="text-center px-6 py-4">PDF, CSV, JSON</td>
                    <td className="text-center px-6 py-4">All + Custom</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Support Level</td>
                    <td className="text-center px-6 py-4">Community</td>
                    <td className="text-center px-6 py-4">Email</td>
                    <td className="text-center px-6 py-4">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded shadow-lg p-8">
            <h2 className="text-3xl font-serif text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I change plans at any time?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes, you may upgrade or downgrade your subscription at any time. Changes take effect 
                  at the beginning of your next billing cycle. Prorated adjustments are available for upgrades.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What document formats are supported?</h3>
                <p className="text-gray-700 leading-relaxed">
                  ScholarSumm currently supports PDF and DOCX formats. These cover the majority of 
                  academic publications and institutional documents.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Is there a trial period available?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Basic plan provides perpetual free access with daily limits. Professional plan 
                  subscribers receive a 7-day trial period with full refund if cancelled.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How is data security ensured?</h3>
                <p className="text-gray-700 leading-relaxed">
                  We implement enterprise-grade security protocols including 256-bit SSL encryption, 
                  FERPA compliance for institutional users, and immediate deletion of processed documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}