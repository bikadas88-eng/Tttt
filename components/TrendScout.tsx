import React, { useState } from 'react';
import { GeminiService } from '../services/gemini';
import { TrendItem } from '../types';
import { Search, Loader2, ExternalLink, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const TrendScout: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;

    setLoading(true);
    setTrends([]);
    try {
      const results = await GeminiService.getTrends(niche);
      setTrends(results);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch trends. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">Trend Scout</h2>
        <p className="text-slate-400">Discover what's happening right now in your niche using Google Search data.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Enter your niche (e.g., 'AI Technology', 'Vegan Cooking', 'Minecraft')..."
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !niche}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-900/20 flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Globe />}
          <span>Scan</span>
        </button>
      </form>

      <div className="space-y-6">
        {trends.map((trend, index) => (
          <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
              <TrendingUpIcon /> Analysis
            </h3>
            <div className="prose prose-invert prose-slate max-w-none">
              <ReactMarkdown>{trend.relevance}</ReactMarkdown>
            </div>
            {trend.sourceUrl && (
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-sm text-slate-400">
                 <span className="font-medium text-slate-500">Source:</span>
                 <a href={trend.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 flex items-center gap-1 hover:underline">
                    {trend.sourceTitle || trend.sourceUrl}
                    <ExternalLink size={14} />
                 </a>
              </div>
            )}
          </div>
        ))}
        {!loading && trends.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/50">
            <Globe className="mx-auto h-12 w-12 text-slate-700 mb-4" />
            <h3 className="text-lg font-medium text-slate-300">No trends yet</h3>
            <p className="text-slate-500">Enter a niche above to start scouting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TrendingUpIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
