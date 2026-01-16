
import React, { useEffect, useState } from 'react';
import { University, Application, UserProfile } from '../types';
import { getUniversityRecommendations } from '../services/AIchatbox';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DashboardPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const applications: Application[] = [
    { id: '1', universityName: 'Stanford University', program: 'MS in Computer Science', status: 'Submitted', deadline: 'Dec 15, 2024' },
    { id: '2', universityName: 'Georgia Tech', program: 'MS in CS', status: 'Draft', deadline: 'Jan 5, 2025' },
    { id: '3', universityName: 'ETH Zurich', program: 'MS Data Science', status: 'Accepted', deadline: 'Completed' },
  ];

  useEffect(() => {
    const savedProfile = localStorage.getItem('edulynx_profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setUserProfile(parsed);
      fetchRecommendations(parsed);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchRecommendations = async (profile: UserProfile) => {
    setLoading(true);
    const data = await getUniversityRecommendations(profile);
    setRecommendations(data);
    setLoading(false);
  };

  const chartData = [
    { name: 'Safe', value: recommendations.filter(r => r.category === 'Safe').length || 1, color: '#10B981' },
    { name: 'Moderate', value: recommendations.filter(r => r.category === 'Moderate').length || 1, color: '#F59E0B' },
    { name: 'Reach', value: recommendations.filter(r => r.category === 'Reach').length || 1, color: '#EF4444' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#1F2937]">Welcome back, {userProfile?.name || 'Student'}!</h2>
          <p className="text-[#4B5563]">Here is your study abroad progress overview.</p>
        </div>
        <button 
          onClick={() => userProfile && fetchRecommendations(userProfile)}
          className="flex items-center px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-sm font-medium hover:bg-[#F9FAFB]"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh AI Picks
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Eligibility Snapshot */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Eligibility Snapshot</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {chartData.map((d) => (
              <div key={d.name} className="flex items-center text-xs">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: d.color }}></span>
                <span className="text-[#4B5563]">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Tracker */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Application Tracker</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-[#4B5563] uppercase tracking-wider border-b border-[#E5E7EB]">
                  <th className="pb-3">University</th>
                  <th className="pb-3">Program</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="py-4 text-sm font-medium text-[#1F2937]">{app.universityName}</td>
                    <td className="py-4 text-sm text-[#4B5563]">{app.program}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                        app.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-[#4B5563]">{app.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#1F2937]">Top University Picks for You</h3>
          <span className="text-sm text-[#2563EB] font-medium cursor-pointer hover:underline">View all matches</span>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#F9FAFB] rounded-xl border border-dashed border-[#E5E7EB]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2563EB] mb-4"></div>
            <p className="text-[#4B5563]">Analyzing your profile for the best fit...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((uni) => (
              <div key={uni.id} className="bg-white border border-[#E5E7EB] rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-[#1F2937] text-lg">{uni.name}</h4>
                    <p className="text-sm text-[#4B5563]">{uni.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-bold ${
                    uni.category === 'Safe' ? 'bg-green-50 text-green-700 border border-green-200' :
                    uni.category === 'Moderate' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                    'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {uni.category}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#4B5563]">Match Score</span>
                    <span className="font-semibold text-[#2563EB]">{uni.matchScore}%</span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] rounded-full h-1.5">
                    <div className="bg-[#2563EB] h-1.5 rounded-full" style={{ width: `${uni.matchScore}%` }}></div>
                  </div>
                  <p className="text-sm text-[#4B5563]">
                    <span className="font-medium text-[#1F2937]">Programs:</span> {uni.programs.join(', ')}
                  </p>
                </div>

                <button className="w-full py-2 bg-white border border-[#2563EB] text-[#2563EB] font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  View Program Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
