export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Subscription Cancelled</h1>
          <p className="text-gray-600 mb-8">Your subscription has been cancelled. You can continue using the free tier.</p>
          <a href="/" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}