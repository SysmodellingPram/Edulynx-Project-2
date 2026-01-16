
import React, { useState } from 'react';
import { reviewDocument } from '../services/AIchatbox';
import { DocumentInfo } from '../types';

const DocumentsPage: React.FC = () => {
  const [activeDocType, setActiveDocType] = useState<'SOP' | 'LOR' | 'CV'>('SOP');
  const [content, setContent] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);

  const mockDocs: DocumentInfo[] = [
    { id: '1', type: 'Transcript', status: 'Reviewed', lastUpdated: '2023-10-12' },
    { id: '2', type: 'SOP', status: 'Needs Revision', lastUpdated: '2023-11-05' },
    { id: '3', type: 'LOR', status: 'Pending', lastUpdated: '2023-11-10' },
  ];

  const handleReview = async () => {
    if (!content.trim()) return;
    setIsReviewing(true);
    setFeedback(null);
    try {
      const result = await reviewDocument(activeDocType, content);
      setFeedback(result);
    } catch (error) {
      console.error(error);
      setFeedback("Failed to get review from AI.");
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-[#1F2937]">Document Review</h2>
        <p className="text-[#4B5563]">Upload your documents and get instant AI-powered formatting and quality feedback.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Document List & Selector */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
            <h3 className="font-semibold text-[#1F2937] mb-4">My Documents</h3>
            <div className="space-y-3">
              {mockDocs.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#2563EB] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-[#1F2937]">{doc.type}</p>
                      <p className="text-xs text-[#4B5563]">{doc.lastUpdated}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                    doc.status === 'Reviewed' ? 'bg-green-100 text-green-700' :
                    doc.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 bg-white border border-[#2563EB] text-[#2563EB] text-sm font-medium rounded-lg hover:bg-blue-50">
              + Upload New File
            </button>
          </div>
        </div>

        {/* Right: Review Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
            <div className="flex border-b border-[#E5E7EB] mb-6">
              {(['SOP', 'LOR', 'CV'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setActiveDocType(type)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeDocType === type ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#4B5563] hover:text-[#1F2937]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#1F2937]">Paste your {activeDocType} content here:</label>
              <textarea
                className="w-full h-64 p-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
                placeholder={`Type or paste your ${activeDocType} here for AI analysis...`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                onClick={handleReview}
                disabled={isReviewing || !content.trim()}
                className="w-full py-3 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isReviewing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Reviewing with AI...
                  </>
                ) : 'Run AI Quality Check'}
              </button>
            </div>
          </div>

          {feedback && (
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white mr-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM5.828 4.914a1 1 0 00-1.414 1.414L5.828 7.743a1 1 0 001.414-1.414L5.828 4.914zM15.586 4.914a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414zM3 10a1 1 0 100 2h1a1 1 0 100-2H3zM15 10a1 1 0 100 2h1a1 1 0 100-2h-1zM4.914 14.172a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 101.414-1.414l-1.414-1.414zM14.172 14.172a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 101.414-1.414l-1.414-1.414zM9 15v1a1 1 0 102 0v-1a1 1 0 10-2 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#1F2937]">AI Feedback Report</h4>
              </div>
              <div className="text-sm text-[#4B5563] leading-relaxed whitespace-pre-wrap prose prose-blue">
                {feedback}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
