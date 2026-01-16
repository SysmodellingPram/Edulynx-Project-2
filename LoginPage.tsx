
import React, { useState } from 'react';
import Logo from '../components/Logo';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    window.location.hash = '/get-started';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Logo size={80} />
          </div>
          <h1 className="text-3xl font-bold text-[#2563EB] mb-2">Edulynx</h1>
          <p className="text-[#4B5563]">Sign in to start your global education journey</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              placeholder="you@university.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-[#2563EB] focus:ring-[#2563EB] border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-[#4B5563]">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-[#2563EB] hover:text-[#1D4ED8]">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1D4ED8] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#4B5563]">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-[#2563EB] hover:text-[#1D4ED8]">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
