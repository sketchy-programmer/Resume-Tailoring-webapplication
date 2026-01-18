import { useState } from 'react';
import { FileText, Sparkles, Download, Loader2 } from 'lucide-react';
import ResumeUpload from './components/ResumeUpload';
import JobDescription from './components/JobDescription';
import TailoredResume from './components/TailoredResume';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [tailoredResume, setTailoredResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTailorResume = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError('Please upload a resume and enter a job description');
      return;
    }

    setLoading(true);
    setError('');
    setTailoredResume('');

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await axios.post(`${API_URL}/api/tailor-resume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTailoredResume(response.data.tailoredResume);
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Failed to tailor resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription('');
    setTailoredResume('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Resume Tailor
                </h1>
                <p className="text-sm text-gray-600">ATS-Optimized Resume Generator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your Resume Past ATS Systems
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your resume and paste the job description. Our AI will tailor your resume 
            to match the job requirements and optimize it for Applicant Tracking Systems.
          </p>
        </div>

        {/* Input Section */}
        {!tailoredResume && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ResumeUpload 
              resumeFile={resumeFile} 
              setResumeFile={setResumeFile} 
            />
            <JobDescription 
              jobDescription={jobDescription} 
              setJobDescription={setJobDescription} 
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-center">{error}</p>
          </div>
        )}

        {/* Action Button */}
        {!tailoredResume && (
          <div className="flex justify-center">
            <button
              onClick={handleTailorResume}
              disabled={loading || !resumeFile || !jobDescription.trim()}
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Tailoring Your Resume...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Tailor My Resume</span>
                </span>
              )}
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-12 text-center">
            <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
              <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-700 text-lg font-medium">Analyzing and tailoring your resume...</p>
              <p className="text-gray-500 text-sm mt-2">This may take 10-20 seconds</p>
            </div>
          </div>
        )}

        {/* Result Section */}
        {tailoredResume && (
          <TailoredResume 
            tailoredResume={tailoredResume} 
            onReset={handleReset} 
          />
        )}

        {/* Features Section */}
        {!tailoredResume && !loading && (
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ATS Optimized</h3>
              <p className="text-gray-600 text-sm">
                Ensures your resume passes Applicant Tracking Systems with proper formatting and keywords
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Powered</h3>
              <p className="text-gray-600 text-sm">
                Uses advanced AI to match your experience with job requirements naturally
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Use</h3>
              <p className="text-gray-600 text-sm">
                Download your tailored resume instantly and start applying with confidence
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          <p>© 2024 Resume Tailor. Powered by AI to help you land your dream job.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;