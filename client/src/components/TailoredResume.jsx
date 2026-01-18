import { Download, RotateCcw, Copy, Check } from 'lucide-react';
import { useState } from 'react';

function TailoredResume({ tailoredResume, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([tailoredResume], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'tailored-resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tailoredResume);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">
          Your Tailored Resume
        </h3>
        <div className="flex space-x-3">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Resume</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 max-h-[600px] overflow-y-auto">
        <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm leading-relaxed">
          {tailoredResume}
        </pre>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>✓ ATS Optimized:</strong> Your resume has been tailored with relevant keywords 
          and formatted for maximum compatibility with Applicant Tracking Systems.
        </p>
      </div>
    </div>
  );
}

export default TailoredResume;