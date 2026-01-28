import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, TrendingUp, Lightbulb, FileText, Tag, Menu, X } from 'lucide-react';

interface LayoutProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { view: AppView.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { view: AppView.TRENDS, label: 'Trend Scout', icon: <TrendingUp size={20} /> },
    { view: AppView.IDEAS, label: 'Idea Lab', icon: <Lightbulb size={20} /> },
    { view: AppView.SCRIPT, label: 'Script Studio', icon: <FileText size={20} /> },
    { view: AppView.METADATA, label: 'Metadata Magic', icon: <Tag size={20} /> },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans selection:bg-red-500 selection:text-white">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 border-b border-slate-800 z-50 flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-bold text-white">TG</div>
           <span className="font-bold text-lg tracking-tight">TubeGrow</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400 hover:text-white">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-red-900/20">TG</div>
          <span className="font-bold text-xl tracking-tight text-white">TubeGrow</span>
        </div>

        <nav className="px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                setView(item.view);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${currentView === item.view 
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/30 font-medium' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-6">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Pro Tip</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use "Trend Scout" first to find viral topics, then move to "Idea Lab".
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-20 md:pt-0 overflow-y-auto h-screen scroll-smooth">
        <div className="max-w-5xl mx-auto p-6 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
};
