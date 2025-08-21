import React from 'react';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              This Cookie Policy explains how ScholarSumm uses cookies and similar technologies.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What are Cookies?</h2>
            <p className="text-gray-600 mb-6">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              enabling certain functionality.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
                <p className="text-gray-600">Required for the website to function properly, including authentication and security features.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                <p className="text-gray-600">Remember your preferences and settings to enhance your user experience.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                <p className="text-gray-600">Help us understand how visitors interact with our website to improve our services.</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Cookies</h2>
            <p className="text-gray-600 mb-6">
              You can control cookies through your browser settings. However, disabling certain cookies 
              may affect the functionality of our website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about our Cookie Policy, please contact us at support@scholarsum.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}