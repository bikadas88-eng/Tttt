import React, { useState } from 'react';
import { GeminiService } from '../services/gemini';
import { FullScript } from '../types';
import { FileText, Loader2, Copy, Check, Clock, Edit3 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const ScriptStudio: React.FC = () => {
  const [inputIdea, setInputIdea] = useState('');
  const [tone, setTone] = useState('Engaging and High Energy');
  const [script, setScript] = useState<FullScript | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!inputIdea.trim()) return;
    setLoading(true);
    setScript(null);
    try {
      const result = await GeminiService.generateScript(inputIdea, tone);
      setScript(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!script) return;
    const text = script.sections.map(s => `## ${s.heading} (${s.duration})\n${s.content}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">Script Studio</h2>
        <p className="text-slate-400">Turn your ideas into production-ready scripts with timing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        {/* Input Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Video Topic / Idea</label>
              <textarea
                value={inputIdea}
                onChange={(e) => setInputIdea(e.target.value)}
                placeholder="e.g. A day in the life of a software engineer..."
                className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option>Engaging and High Energy</option>
                <option>Serious and Informative</option>
                <option>Funny and Sarcastic</option>
                <option>Relaxed and Storytelling</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !inputIdea}
              className="w-full bg-white text-slate-900 hover:bg-slate-200 font-bold py-4 px-6 rounded-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Edit3 size={18} />}
              <span>Write Script</span>
            </button>
          </div>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-2">
          {script ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-full max-h-[800px]">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 rounded-t-2xl">
                <div>
                    <h3 className="font-bold text-lg text-white">{script.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">AI Generated Script</p>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {script.sections.map((section, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-800 hover:border-red-500 transition-colors">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg font-semibold text-red-400">{section.heading}</h4>
                      <div className="flex items-center gap-1 text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded">
                        <Clock size={12} />
                        {section.duration}
                      </div>
                    </div>
                    <div className="prose prose-invert prose-slate max-w-none text-slate-300">
                      <ReactMarkdown>{section.content}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 p-12 bg-slate-900/20">
              <FileText size={48} className="mb-4 opacity-50" />
              <p className="text-lg">Your script will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
