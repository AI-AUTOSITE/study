export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Help Center</h1>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Getting Started</h2>
              <p className="text-gray-600">Upload your PDF or DOCX file and click "Process Document".</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Supported Formats</h2>
              <p className="text-gray-600">We support PDF and DOCX files up to 50MB.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibent text-gray-900 mb-3">Troubleshooting</h2>
              <p className="text-gray-600">If you encounter issues, try refreshing the page or contact support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}