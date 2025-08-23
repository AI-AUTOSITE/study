// src/app/how-it-works/page.tsx
'use client';

import React from 'react';
import PageLayout from '../components/PageLayout';
import { Upload, FileText, Zap, CheckCircle, BookOpen, GraduationCap, Award } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <PageLayout>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Header Section - More formal/academic */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
              How ScholarSumm Works
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A systematic approach to transforming academic literature into structured study materials 
              through advanced artificial intelligence
            </p>
          </div>

          {/* Academic Credibility Banner */}
          <div className="bg-white border-l-4 border-indigo-600 shadow-md p-6 mb-12">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Designed for Academic Excellence</h3>
                <p className="text-gray-600 mt-1">
                  Developed in consultation with researchers and educators to ensure academic integrity 
                  and pedagogical effectiveness in document processing and knowledge extraction.
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Process with formal styling */}
          <div className="space-y-20 mb-16">
            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-start mb-6">
                  <div className="bg-indigo-900 text-white rounded-full w-12 h-12 flex items-center justify-center font-serif text-xl mr-4 flex-shrink-0">
                    I
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif text-gray-900 mb-2">Document Submission</h2>
                    <p className="text-gray-600 italic">Initial Data Input Phase</p>
                  </div>
                </div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  The system accepts scholarly documents including peer-reviewed articles, 
                  dissertations, conference proceedings, and academic manuscripts. 
                  Our secure upload infrastructure ensures data integrity and confidentiality.
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded p-4">
<h4 className="font-semibold text-gray-900 mb-3">Technical Specifications:</h4>
<ul className="space-y-2">
  <li className="flex items-start">
    <span className="text-indigo-600 mr-2">•</span>
    <span className="text-gray-700">Supported formats: PDF, DOCX</span>
  </li>
  <li className="flex items-start">
    <span className="text-indigo-600 mr-2">•</span>
    <span className="text-gray-700">Maximum file size: 10MB (Basic), 25MB (Professional)</span>
  </li>
  <li className="flex items-start">
    <span className="text-indigo-600 mr-2">•</span>
    <span className="text-gray-700">Typical document: 30-150 pages depending on plan</span>
  </li>
</ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded shadow-lg p-8 border border-gray-200">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                    <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-lg text-gray-700 mb-4 font-serif">Select Academic Document</p>
                    <div className="bg-indigo-900 text-white px-6 py-3 rounded inline-block">
                      Browse Files
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-white rounded shadow-lg p-8 border border-gray-200">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Processing Status</span>
                      <span className="text-sm text-indigo-600">In Progress</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-gray-700">Document validation complete</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-gray-700">Text extraction successful</span>
                      </div>
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600 mr-3"></div>
                        <span className="text-gray-700">Semantic analysis in progress...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start mb-6">
                  <div className="bg-indigo-900 text-white rounded-full w-12 h-12 flex items-center justify-center font-serif text-xl mr-4 flex-shrink-0">
                    II
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif text-gray-900 mb-2">Computational Analysis</h2>
                    <p className="text-gray-600 italic">Natural Language Processing Phase</p>
                  </div>
                </div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our advanced natural language processing engine, powered by Claude 3.5 Sonnet, 
                  performs comprehensive semantic analysis. The system identifies key concepts, 
                  methodological approaches, empirical findings, and theoretical contributions.
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Analytical Components:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span className="text-gray-700">Hierarchical concept extraction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span className="text-gray-700">Statistical significance identification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span className="text-gray-700">Methodological framework analysis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-start mb-6">
                  <div className="bg-indigo-900 text-white rounded-full w-12 h-12 flex items-center justify-center font-serif text-xl mr-4 flex-shrink-0">
                    III
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif text-gray-900 mb-2">Knowledge Synthesis</h2>
                    <p className="text-gray-600 italic">Output Generation Phase</p>
                  </div>
                </div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  The final phase transforms extracted information into pedagogically optimized 
                  study materials. This includes structured summaries following academic conventions 
                  and spaced-repetition flashcards based on cognitive science principles.
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Deliverables:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span className="text-gray-700">Comprehensive executive summary</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span className="text-gray-700">Hierarchical study cards (Bloom's taxonomy)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span className="text-gray-700">Exportable formats (PDF, CSV for Anki)</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded shadow-lg p-8 border border-gray-200">
                  <div className="space-y-4">
                    <div className="border rounded p-4 bg-gray-50">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                        Executive Summary
                      </h4>
                      <p className="text-sm text-gray-600 italic">
                        Structured abstract with key findings, methodology, and implications...
                      </p>
                    </div>
                    <div className="border rounded p-4 bg-gray-50">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
                        Study Materials
                      </h4>
                      <div className="bg-white border border-indigo-200 rounded p-3 mt-2">
                        <div className="text-sm">
                          <div className="font-semibold text-indigo-900">Q: Primary Research Question</div>
                          <div className="text-gray-700 mt-1">What is the central hypothesis of this study?</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Features */}
          <div className="bg-white rounded shadow-lg p-8 mb-16 border border-gray-200">
            <h2 className="text-3xl font-serif text-gray-900 text-center mb-12">
              Academic Integrity & Excellence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-indigo-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="text-indigo-900" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Scholarly Precision</h3>
                <p className="text-gray-700 leading-relaxed">
                  Maintains academic rigor through careful preservation of citations, 
                  methodological details, and statistical findings
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-indigo-900" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pedagogical Design</h3>
                <p className="text-gray-700 leading-relaxed">
                  Study materials structured according to established educational 
                  frameworks and cognitive learning principles
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-indigo-900" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Efficient Processing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Rapid analysis without compromising depth or accuracy, 
                  typically completing within 60-120 seconds
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section - More formal */}
          <div className="text-center bg-gray-50 rounded p-12 border border-gray-200">
            <h2 className="text-3xl font-serif text-gray-900 mb-6">
              Begin Your Academic Journey
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join distinguished researchers and students who utilize ScholarSumm 
              for enhanced academic productivity and learning outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/" 
                className="bg-indigo-900 text-white px-8 py-4 rounded hover:bg-indigo-800 transition-colors font-medium text-lg"
              >
                Commence Free Trial
              </a>
              <a 
                href="/pricing" 
                className="border-2 border-indigo-900 text-indigo-900 px-8 py-4 rounded hover:bg-indigo-50 transition-colors font-medium text-lg"
              >
                View Subscription Options
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}