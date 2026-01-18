import { Upload, FileText, X } from 'lucide-react';

function ResumeUpload({ resumeFile, setResumeFile }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setResumeFile(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <FileText className="w-5 h-5 text-indigo-600" />
        <span>Upload Your Resume</span>
      </h3>
      
      {!resumeFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50 hover:bg-indigo-50"
        >
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="resume-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 font-medium mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              PDF, DOC, DOCX, or TXT (Max 10MB)
            </p>
          </label>
        </div>
      ) : (
        <div className="border-2 border-green-200 bg-green-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{resumeFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(resumeFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;