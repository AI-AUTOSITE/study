// src/app/pricing/page.tsx
'use client';

import React from 'react';
import PageLayout from '../components/PageLayout';
import { Check, X, GraduationCap, Zap, Building, TrendingUp } from 'lucide-react';

export default function PricingPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - Academic Style */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-gray-900 mb-4">Subscription Plans</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Select the appropriate tier based on your academic requirements and research needs
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {/* Free Plan */}
            <div className="bg-white rounded shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-900 text-white p-6">
                <h3 className="text-2xl font-serif mb-2">Free</h3>
                <p className="text-gray-300 text-sm">Individual Learners</p>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900">$0</div>
                  <p className="text-gray-600 mt-1">per month</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 uppercase text-sm tracking-wide">Features:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">2 files per day</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">100 pages per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">10MB max file size</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">8-12 flashcards</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Basic AI summary</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">7-day history</span>
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

            {/* Starter Plan */}
            <div className="bg-white rounded shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-blue-900 text-white p-6">
                <h3 className="text-2xl font-serif mb-2">Starter</h3>
                <p className="text-blue-200 text-sm">Students</p>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-900">$4.99</div>
                  <p className="text-gray-600 mt-1">per month</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 uppercase text-sm tracking-wide">Features:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">30 files per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">500 pages per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">15MB max file size</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">12-18 flashcards</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Detailed summaries</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">30-day history</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Priority support</span>
                    </li>
                  </ul>
                </div>
                
                <a 
                  href="/sign-up"
                  className="block w-full text-center bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Trial
                </a>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-white rounded shadow-lg border-2 border-indigo-600 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 bg-indigo-600 text-white text-center py-1 text-sm font-semibold">
                MOST POPULAR
              </div>
              <div className="bg-indigo-900 text-white p-6 mt-7">
                <h3 className="text-2xl font-serif mb-2">Professional</h3>
                <p className="text-indigo-200 text-sm">Researchers & Faculty</p>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-indigo-900">$14.99</div>
                  <p className="text-gray-600 mt-1">per month</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <s>$9.99</s> → $14.99
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 uppercase text-sm tracking-wide">Features:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">100 files per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">3000 pages per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">25MB max file size</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">20-30 flashcards</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">AI-enhanced analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Unlimited history</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Priority processing</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Advanced analytics</span>
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

            {/* Enterprise Plan */}
            <div className="bg-white rounded shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-900 text-white p-6">
                <h3 className="text-2xl font-serif mb-2">Enterprise</h3>
                <p className="text-gray-300 text-sm">Institutions & Labs</p>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900">$29.99</div>
                  <p className="text-gray-600 mt-1">per month</p>
                  <p className="text-sm text-green-600 mt-1">Coming Soon</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 uppercase text-sm tracking-wide">Features:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Unlimited files</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">10,000 pages/month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">50MB max file size</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">30-40 flashcards</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Premium AI (Opus)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">API access</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Team collaboration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Dedicated support</span>
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
                    <th className="text-center px-6 py-4 font-semibold text-gray-900">Free</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-900">Starter</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-900">Professional</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Monthly Price</td>
                    <td className="text-center px-6 py-4 font-bold">$0</td>
                    <td className="text-center px-6 py-4 font-bold text-blue-600">$4.99</td>
                    <td className="text-center px-6 py-4 font-bold text-indigo-600">$14.99</td>
                    <td className="text-center px-6 py-4 font-bold">$29.99</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">File Processing Limit</td>
                    <td className="text-center px-6 py-4">2/day</td>
                    <td className="text-center px-6 py-4">30/month</td>
                    <td className="text-center px-6 py-4">100/month</td>
                    <td className="text-center px-6 py-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Page Limit</td>
                    <td className="text-center px-6 py-4">100/month</td>
                    <td className="text-center px-6 py-4">500/month</td>
                    <td className="text-center px-6 py-4">3000/month</td>
                    <td className="text-center px-6 py-4">10,000/month</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">Maximum File Size</td>
                    <td className="text-center px-6 py-4">10MB</td>
                    <td className="text-center px-6 py-4">15MB</td>
                    <td className="text-center px-6 py-4">25MB</td>
                    <td className="text-center px-6 py-4">50MB</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Flashcards per Document</td>
                    <td className="text-center px-6 py-4">8-12</td>
                    <td className="text-center px-6 py-4">12-18</td>
                    <td className="text-center px-6 py-4">20-30</td>
                    <td className="text-center px-6 py-4">30-40</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">AI Model</td>
                    <td className="text-center px-6 py-4">Haiku (Fast)</td>
                    <td className="text-center px-6 py-4">Haiku/Sonnet</td>
                    <td className="text-center px-6 py-4">Sonnet (Advanced)</td>
                    <td className="text-center px-6 py-4">Opus (Premium)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Processing Speed</td>
                    <td className="text-center px-6 py-4">Standard</td>
                    <td className="text-center px-6 py-4">Standard</td>
                    <td className="text-center px-6 py-4">Priority</td>
                    <td className="text-center px-6 py-4">Dedicated</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700">History Retention</td>
                    <td className="text-center px-6 py-4">7 days</td>
                    <td className="text-center px-6 py-4">30 days</td>
                    <td className="text-center px-6 py-4">Unlimited</td>
                    <td className="text-center px-6 py-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Support Level</td>
                    <td className="text-center px-6 py-4">Community</td>
                    <td className="text-center px-6 py-4">Email (48h)</td>
                    <td className="text-center px-6 py-4">Priority (24h)</td>
                    <td className="text-center px-6 py-4">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-12">
            <div className="flex items-start">
              <TrendingUp className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing Update Notice</h3>
                <p className="text-gray-700">
                  To ensure sustainable service and continued improvements, Professional plan pricing has been 
                  adjusted from $9.99 to $14.99 per month. New Starter plan added at $4.99 for budget-conscious students.
                </p>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="bg-white rounded shadow-lg p-8">
            <h2 className="text-3xl font-serif text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens if I exceed my page limit?</h3>
                <p className="text-gray-700 leading-relaxed">
                  When you reach your monthly page limit, you can still process documents up to your remaining 
                  pages. The system will process partial documents and notify you about the coverage percentage.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I change plans at any time?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes, you can upgrade or downgrade at any time. Changes take effect immediately for upgrades, 
                  and at the next billing cycle for downgrades.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Is there a free trial for paid plans?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes! All paid plans come with a 7-day free trial. You can cancel anytime during the trial 
                  period without being charged.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How is the page count calculated?</h3>
                <p className="text-gray-700 leading-relaxed">
                  For PDFs, we count actual pages. For DOCX files, we estimate pages based on character count 
                  (approximately 3000 characters per page).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}