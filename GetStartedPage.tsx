
import React, { useState } from 'react';
import { UserProfile } from '../types';
import Logo from '../components/Logo';

const GetStartedPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    gpa: '',
    fieldOfStudy: 'Computer Science',
    targetCountry: 'USA',
    budget: '$30,000 - $50,000',
    examScores: { ielts: '', gre: '' }
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('edulynx_profile', JSON.stringify(profile));
    window.location.hash = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="flex flex-col items-center mb-8">
          <Logo size={60} className="mb-4" />
          <div className="flex items-center justify-between w-full">
            <div className="flex space-x-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 w-12 rounded-full transition-colors ${
                    step >= s ? 'bg-[#2563EB]' : 'bg-[#E5E7EB]'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-[#4B5563]">Step {step} of 3</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#1F2937] mb-2">
          {step === 1 && "Tell us about yourself"}
          {step === 2 && "Academic Profile"}
          {step === 3 && "Preferences & Goals"}
        </h2>
        <p className="text-[#4B5563] mb-8">
          {step === 1 && "Start by filling in your basic details."}
          {step === 2 && "Enter your GPA and standardized test scores."}
          {step === 3 && "Select your desired destination and budget."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Field of Study</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  value={profile.fieldOfStudy}
                  onChange={(e) => setProfile({ ...profile, fieldOfStudy: e.target.value })}
                >
                  <option>Computer Science</option>
                  <option>Business Administration</option>
                  <option>Mathematics</option>
                  <option>Data Science</option>
                  <option>Psychology</option>
                  <option>Economics</option>
                  <option>Health</option>
                  <option>Finance</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">GPA (Out of 4.0)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="3.85"
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  value={profile.gpa}
                  onChange={(e) => setProfile({ ...profile, gpa: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">IELTS Score</label>
                  <input
                    type="text"
                    placeholder="7.5"
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    value={profile.examScores.ielts}
                    onChange={(e) => setProfile({ ...profile, examScores: { ...profile.examScores, ielts: e.target.value } })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">GRE Score</label>
                  <input
                    type="text"
                    placeholder="320"
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    value={profile.examScores.gre}
                    onChange={(e) => setProfile({ ...profile, examScores: { ...profile.examScores, gre: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Target Country</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  value={profile.targetCountry}
                  onChange={(e) => setProfile({ ...profile, targetCountry: e.target.value })}
                >
                  <option>USA</option>
                  <option>Canada</option>
                  <option>UK</option>
                  <option>Germany</option>
                  <option>Australia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Annual Budget</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  value={profile.budget}
                  onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
                >
                  <option>$10,000 - $30,000</option>
                  <option>$30,000 - $50,000</option>
                  <option>$50,000 - $75,000</option>
                  <option>$75,000+</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-[#E5E7EB] text-[#4B5563] font-medium rounded-lg hover:bg-[#F9FAFB] transition-colors"
              >
                Back
              </button>
            ) : <div />}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1D4ED8] transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1D4ED8] transition-colors"
              >
                Generate My Plan
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetStartedPage;
