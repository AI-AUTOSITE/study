import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Get in touch with our team for any questions or support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-4">
                We're here to help you transform your research papers into effective study materials.
              </p>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> support@scholarsum.com
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Response Time:</span> Within 24 hours
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Support</h2>
              <p className="text-gray-600 mb-4">
                Need help getting started? Check out our resources or reach out directly.
              </p>
              <div className="space-y-2">
                <p className="text-gray-600">Available: Monday - Friday, 9 AM - 6 PM EST</p>
                <p className="text-gray-600">We typically respond within a few hours during business days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}