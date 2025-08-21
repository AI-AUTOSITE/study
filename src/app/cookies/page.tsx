// src/app/cookies/page.tsx
import React from 'react';
import PageLayout from '../components/PageLayout';
import { Cookie, Shield, Settings, BarChart } from 'lucide-react';

export default function CookiesPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* ヘッダー */}
            <div className="flex items-center mb-6">
              <Cookie className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
            </div>
            
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                This Cookie Policy explains how ScholarSumm uses cookies and similar technologies 
                to recognize you when you visit our website. It explains what these technologies are 
                and why we use them, as well as your rights to control our use of them.
              </p>

              {/* What are Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What are Cookies?</h2>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-700 mb-3">
                    Cookies are small data files that are placed on your computer or mobile device when 
                    you visit a website. Cookies are widely used by website owners to make their websites work, 
                    or to work more efficiently, as well as to provide reporting information.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Cookies set by the website owner (in this case, ScholarSumm) are called "first party cookies". 
                    Cookies set by parties other than the website owner are called "third party cookies".
                  </p>
                </div>
              </section>

              {/* Types of Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-4">
                  {/* Essential Cookies */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
                      <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Always Active</span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      These cookies are strictly necessary for the website to function and cannot be switched off.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Authentication and login status</li>
                      <li>• Security tokens and session management</li>
                      <li>• User preferences for accessibility</li>
                    </ul>
                  </div>

                  {/* Functional Cookies */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Settings className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                      <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Optional</span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      These cookies enable enhanced functionality and personalization.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Language preferences</li>
                      <li>• Recently viewed documents</li>
                      <li>• User interface settings</li>
                    </ul>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <BarChart className="h-5 w-5 text-purple-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                      <span className="ml-auto text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Optional</span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      These cookies help us understand how visitors interact with our website.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Pages visited and time spent</li>
                      <li>• Features used most frequently</li>
                      <li>• Error messages encountered</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Cookie Details Table */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Specific Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Cookie Name</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Purpose</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-600">__clerk_session</td>
                        <td className="px-4 py-2 text-sm text-gray-600">Authentication</td>
                        <td className="px-4 py-2 text-sm text-gray-600">Session</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-600">__stripe_sid</td>
                        <td className="px-4 py-2 text-sm text-gray-600">Payment processing</td>
                        <td className="px-4 py-2 text-sm text-gray-600">30 minutes</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-600">user_preferences</td>
                        <td className="px-4 py-2 text-sm text-gray-600">User settings</td>
                        <td className="px-4 py-2 text-sm text-gray-600">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Managing Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700">
                    <strong>Browser Controls:</strong> Most web browsers allow you to control cookies through 
                    their settings preferences. However, limiting cookies may impact your experience on our website.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">How to manage cookies in popular browsers:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Chrome: Settings → Privacy and security → Cookies</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Firefox: Settings → Privacy & Security → Cookies</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Safari: Preferences → Privacy → Cookies</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Edge: Settings → Privacy, search, and services → Cookies</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Impact of Disabling */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-gray-700 mb-2">
                    <strong>Important:</strong> Disabling certain cookies may affect website functionality:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• You may not be able to log in to your account</li>
                    <li>• Your preferences may not be saved between sessions</li>
                    <li>• Some features may not work as intended</li>
                  </ul>
                </div>
              </section>

              {/* Updates to Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. We will notify you of any 
                  material changes by posting the new policy on this page with an updated revision date.
                </p>
              </section>

              {/* Contact Section */}
              <section className="border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:aiautosite@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                      aiautosite@gmail.com
                    </a>
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Privacy Page:</strong>{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">
                      View our Privacy Policy
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