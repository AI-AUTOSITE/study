export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <div className="prose max-w-none text-gray-600">
            <p>Welcome to ScholarSumm. By using our service, you agree to these terms.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">Service Description</h2>
            <p>ScholarSumm transforms research papers into study cards and summaries using AI technology.</p>
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">Usage Guidelines</h2>
            <p>Use our service responsibly for educational purposes only.</p>
          </div>
        </div>
      </div>
    </div>
  );
}