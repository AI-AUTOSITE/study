// src/app/examples/page.tsx
import React from 'react';
import PageLayout from '../components/PageLayout';
import { FileText, Brain, Clock, Target, ChevronRight, Download, BookOpen, Zap } from 'lucide-react';

export default function ExamplesPage() {
  const examples = [
    {
      title: "Scientific Research Paper",
      category: "Biology",
      originalLength: "15,000 words",
      processingTime: "45 seconds",
      icon: "🧬",
      description: "Complex molecular biology paper with technical terminology",
      features: [
        "Extracted 25 key concepts",
        "Generated 30 study cards",
        "Identified 5 main hypotheses",
        "Summarized methodology"
      ],
      sampleSummary: "This study investigates the role of CRISPR-Cas9 in gene editing applications for hereditary diseases. Key findings include a 87% success rate in targeted gene modification...",
      sampleCards: [
        { front: "What is CRISPR-Cas9?", back: "A revolutionary gene-editing tool that allows scientists to make precise changes to DNA sequences" },
        { front: "Success rate of gene modification?", back: "87% in targeted applications for hereditary diseases" }
      ]
    },
    {
      title: "Psychology Meta-Analysis",
      category: "Social Sciences",
      originalLength: "25,000 words",
      processingTime: "60 seconds",
      icon: "🧠",
      description: "Comprehensive review of 50+ studies on cognitive behavioral therapy",
      features: [
        "Analyzed 50+ studies",
        "Created comparison tables",
        "45 flashcards generated",
        "Statistical summary included"
      ],
      sampleSummary: "Meta-analysis of CBT effectiveness across various anxiety disorders. Combined N=3,500 participants. Overall effect size d=0.73, indicating moderate to strong therapeutic benefits...",
      sampleCards: [
        { front: "Average effect size of CBT for anxiety?", back: "d=0.73 (moderate to strong effect)" },
        { front: "Total participants in meta-analysis?", back: "N=3,500 across 50+ studies" }
      ]
    },
    {
      title: "Computer Science Thesis",
      category: "Technology",
      originalLength: "40,000 words",
      processingTime: "90 seconds",
      icon: "💻",
      description: "PhD thesis on machine learning algorithms for natural language processing",
      features: [
        "60 technical concepts extracted",
        "Algorithm comparisons",
        "Performance metrics summarized",
        "Implementation details captured"
      ],
      sampleSummary: "Novel approach to transformer architectures achieving 94.2% accuracy on benchmark datasets. Introduces attention mechanism modifications reducing computational complexity by 35%...",
      sampleCards: [
        { front: "Accuracy on benchmark datasets?", back: "94.2% using modified transformer architecture" },
        { front: "Computational complexity reduction?", back: "35% through attention mechanism modifications" }
      ]
    },
    {
      title: "Medical Case Study",
      category: "Medicine",
      originalLength: "8,000 words",
      processingTime: "30 seconds",
      icon: "⚕️",
      description: "Detailed clinical case study with treatment protocols",
      features: [
        "Symptoms timeline extracted",
        "Treatment steps summarized",
        "20 medical terms defined",
        "Outcome metrics highlighted"
      ],
      sampleSummary: "Rare presentation of autoimmune condition in 42-year-old patient. Initial symptoms included joint pain and fatigue. Treatment with immunosuppressants showed 80% improvement over 6 months...",
      sampleCards: [
        { front: "Patient demographics?", back: "42-year-old with rare autoimmune presentation" },
        { front: "Treatment outcome?", back: "80% improvement over 6 months with immunosuppressants" }
      ]
    }
  ];

  return (
    <PageLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Real Examples</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how ScholarSumm transforms complex academic documents into digestible study materials
            </p>
          </div>

          {/* Stats Bar */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600">10,000+</div>
                <div className="text-sm text-gray-600 mt-1">Papers Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">45 sec</div>
                <div className="text-sm text-gray-600 mt-1">Average Processing</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600 mt-1">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">4.8/5</div>
                <div className="text-sm text-gray-600 mt-1">User Rating</div>
              </div>
            </div>
          </div>

          {/* Example Cards */}
          <div className="space-y-8 mb-12">
            {examples.map((example, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{example.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold">{example.title}</h2>
                        <p className="text-indigo-100">{example.category} • {example.originalLength}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Clock className="h-5 w-5 text-indigo-200 mb-1" />
                      <p className="text-sm">{example.processingTime}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6">{example.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Features */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Target className="h-5 w-5 text-indigo-600 mr-2" />
                        What We Extracted
                      </h3>
                      <ul className="space-y-2">
                        {example.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sample Output */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                        Sample Summary
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                        {example.sampleSummary}
                      </div>
                    </div>
                  </div>

                  {/* Sample Study Cards */}
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Brain className="h-5 w-5 text-purple-600 mr-2" />
                      Sample Study Cards
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {example.sampleCards.map((card, idx) => (
                        <div key={idx} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="font-medium text-purple-900 mb-2">Q: {card.front}</div>
                          <div className="text-sm text-purple-700">A: {card.back}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Before/After Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Before & After</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="relative">
                <div className="absolute -top-3 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Before
                </div>
                <div className="border-2 border-red-200 rounded-lg p-6 pt-8">
                  <h3 className="font-semibold text-gray-900 mb-3">Traditional Study Method</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>❌ Hours of reading dense text</li>
                    <li>❌ Manual note-taking</li>
                    <li>❌ Creating flashcards by hand</li>
                    <li>❌ Missing key concepts</li>
                    <li>❌ Inconsistent study materials</li>
                  </ul>
                  <div className="mt-4 text-center text-gray-500">
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">3-5 hours per paper</p>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="relative">
                <div className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  After
                </div>
                <div className="border-2 border-green-200 rounded-lg p-6 pt-8">
                  <h3 className="font-semibold text-gray-900 mb-3">With ScholarSumm</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>✅ Instant AI summarization</li>
                    <li>✅ Automated key point extraction</li>
                    <li>✅ Ready-made study cards</li>
                    <li>✅ Comprehensive coverage</li>
                    <li>✅ Consistent quality output</li>
                  </ul>
                  <div className="mt-4 text-center text-green-600">
                    <Zap className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Under 2 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Perfect For</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Students</h3>
                <p className="text-sm text-gray-600">
                  Prepare for exams faster with automated study materials from course readings
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Researchers</h3>
                <p className="text-sm text-gray-600">
                  Quickly review literature and extract key findings from multiple papers
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Professionals</h3>
                <p className="text-sm text-gray-600">
                  Stay updated with industry research without spending hours reading
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Study Process?</h2>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands of students and researchers saving hours every week
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/" 
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <Zap className="h-5 w-5 mr-2" />
                Try It Now - Free
              </a>
              <a 
                href="/pricing" 
                className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors inline-flex items-center justify-center"
              >
                <Download className="h-5 w-5 mr-2" />
                View Pricing Plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}