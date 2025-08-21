export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Examples</h1>
          <p className="text-gray-600 mb-8">See how ScholarSumm transforms different types of documents.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Research Paper</h3>
              <p className="text-sm text-gray-600">Scientific articles → Key findings + Study cards</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Academic Paper</h3>
              <p className="text-sm text-gray-600">Academic content → Structured summaries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}