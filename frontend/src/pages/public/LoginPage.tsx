import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DEMO_PERSONAS } from '../../utils/constants';
import { Sparkles, LogIn, Lock, Mail, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, switchDemoRole, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      navigate('/');
    } catch (err: any) {
      setError('Invalid email or password. You can also use 1-click Demo logins below.');
    }
  };

  const handleDemoClick = async (roleName: string) => {
    await switchDemoRole(roleName);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-500/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Login to India Samadhan Setu</h1>
        <p className="text-xs text-slate-400">National AI Civic Problem-to-Impact Platform</p>
      </div>

      {error && (
        <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="citizen@indiasamadhan.gov.in"
              className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-md transition-all flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In</span>
        </button>
      </form>

      {/* 1-Click Demo Personas */}
      <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <Zap className="w-4 h-4" />
          <span>1-Click Evaluator Demo Logins:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {DEMO_PERSONAS.map((p) => (
            <button
              key={p.role}
              onClick={() => handleDemoClick(p.role)}
              className="text-left p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 hover:border-emerald-500/60 text-slate-200 transition-all text-[11px]"
            >
              <span className="font-bold block text-white">{p.label}</span>
              <span className="text-[10px] text-slate-400 truncate block">{p.email}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
