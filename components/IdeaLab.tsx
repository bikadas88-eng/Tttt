import React, { useState } from 'react';
import { GeminiService } from '../services/gemini';
import { VideoIdea } from '../types';
import { Lightbulb, Loader2, Sparkles, Target, BarChart2 } from 'lucide-react';

export const IdeaLab: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const results = await GeminiService.generateIdeas(topic);
      setIdeas(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">Idea Lab</h2>
          <p className="text-slate-400">Brainstorm high-CTR video concepts instantly.</p>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic (e.g., 'Productivity Hacks', 'iPhone 15 Review')"
          className="flex-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="w-full md:w-auto bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-semibold py-3 px-8 rounded-xl disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
          <span>Generate Ideas</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ideas.map((idea, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-red-500/30 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-red-500/10 text-red-400 p-2 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                <Lightbulb size={24} />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium bg-slate-800 px-3 py-1 rounded-full text-slate-300">
                <BarChart2 size={14} />
                <span>Score: {idea.viralScore}/100</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 leading-snug">{idea.title}</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">The Hook</p>
                <p className="text-slate-300 text-sm leading-relaxed">{idea.hook}</p>
              </div>
              
              <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
                <Target size={16} className="text-slate-500" />
                <span className="text-sm text-slate-400">Audience: {idea.targetAudience}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
