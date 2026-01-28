import React from 'react';
import { AppView } from '../types';
import { TrendingUp, Lightbulb, FileText, ArrowRight } from 'lucide-react';

interface DashboardProps {
  setView: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tracking-tight pb-2">
          Grow Faster with Gemini
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Your all-in-one AI copilot for YouTube domination. Research trends, brainstorm viral ideas, and write scripts in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setView(AppView.TRENDS)}
          className="group relative overflow-hidden bg-slate-900 hover:bg-slate-800 border border-slate-800 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20 text-left"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={120} />
          </div>
          <div className="bg-red-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Trend Scout</h3>
          <p className="text-slate-400 mb-6 text-sm">Find real-time viral topics using Google Search data.</p>
          <div className="flex items-center text-red-500 text-sm font-semibold group-hover:translate-x-1 transition-transform">
            Start Scouting <ArrowRight size={16} className="ml-1" />
          </div>
        </button>

        <button 
          onClick={() => setView(AppView.IDEAS)}
          className="group relative overflow-hidden bg-slate-900 hover:bg-slate-800 border border-slate-800 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-900/20 text-left"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Lightbulb size={120} />
          </div>
          <div className="bg-orange-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
            <Lightbulb size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Idea Lab</h3>
          <p className="text-slate-400 mb-6 text-sm">Generate 50+ video ideas in your niche with viral scoring.</p>
          <div className="flex items-center text-orange-500 text-sm font-semibold group-hover:translate-x-1 transition-transform">
            Brainstorm Now <ArrowRight size={16} className="ml-1" />
          </div>
        </button>

        <button 
          onClick={() => setView(AppView.SCRIPT)}
          className="group relative overflow-hidden bg-slate-900 hover:bg-slate-800 border border-slate-800 p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 text-left"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText size={120} />
          </div>
          <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Script Studio</h3>
          <p className="text-slate-400 mb-6 text-sm">Write detailed, timed scripts structured for retention.</p>
          <div className="flex items-center text-blue-500 text-sm font-semibold group-hover:translate-x-1 transition-transform">
            Start Writing <ArrowRight size={16} className="ml-1" />
          </div>
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-white font-semibold text-lg mb-1">Powered by Gemini 3 Flash</h4>
          <p className="text-slate-400 text-sm">Leveraging the latest in multimodal AI for ultra-fast content generation.</p>
        </div>
        <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-mono text-green-500 uppercase tracking-widest">System Operational</span>
        </div>
      </div>
    </div>
  );
};
