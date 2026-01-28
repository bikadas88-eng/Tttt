import React, { useState } from 'react';
import { GeminiService } from '../services/gemini';
import { VideoMetadata } from '../types';
import { Tag, Loader2, Image as ImageIcon, AlignLeft, Hash } from 'lucide-react';

export const MetadataMagic: React.FC = () => {
  const [context, setContext] = useState('');
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOptimize = async () => {
    if (!context.trim()) return;
    setLoading(true);
    try {
      const result = await GeminiService.optimizeMetadata(context);
      setMetadata(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">Metadata Magic</h2>
        <p className="text-slate-400">Generate SEO-optimized titles, descriptions, and tags.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Paste your Script or Describe your Video
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Reviewing the new Tesla Model 3 Highland. Covering interior, range, and new features..."
            className="flex-1 h-24 bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
          />
          <button
            onClick={handleOptimize}
            disabled={loading || !context}
            className="md:w-48 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl disabled:opacity-50 transition-all shadow-lg flex flex-col items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Tag />}
            <span>Optimize</span>
          </button>
        </div>
      </div>

      {metadata && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Titles */}
          <div className="col-span-1 md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlignLeft className="text-red-500" /> Optimized Titles
            </h3>
            <div className="space-y-3">
              {metadata.titles.map((title, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-red-500/50 transition-colors">
                  <span className="text-slate-200 font-medium">{title}</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(title)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-2 py-1 rounded transition-colors"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlignLeft className="text-blue-500" /> Description
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed h-64 overflow-y-auto">
              {metadata.description}
            </div>
          </div>

          {/* Thumbnail & Tags */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ImageIcon className="text-purple-500" /> Thumbnail Concept
              </h3>
              <p className="text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm italic">
                "{metadata.thumbnailPrompt}"
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Hash className="text-green-500" /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {metadata.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
