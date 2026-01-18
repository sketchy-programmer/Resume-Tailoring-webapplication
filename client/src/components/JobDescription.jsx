import { Briefcase } from 'lucide-react';

function JobDescription({ jobDescription, setJobDescription }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <Briefcase className="w-5 h-5 text-indigo-600" />
        <span>Job Description</span>
      </h3>
      
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the complete job description here...

Include:
- Job title and company
- Required skills and qualifications
- Responsibilities
- Preferred experience"
        className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
      />
      
      <p className="mt-3 text-sm text-gray-500">
        {jobDescription.length} characters
      </p>
    </div>
  );
}

export default JobDescription;