import React, { useState } from 'react';
import { AppView } from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TrendScout } from './components/TrendScout';
import { IdeaLab } from './components/IdeaLab';
import { ScriptStudio } from './components/ScriptStudio';
import { MetadataMagic } from './components/MetadataMagic';

function App() {
  const [currentView, setView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard setView={setView} />;
      case AppView.TRENDS:
        return <TrendScout />;
      case AppView.IDEAS:
        return <IdeaLab />;
      case AppView.SCRIPT:
        return <ScriptStudio />;
      case AppView.METADATA:
        return <MetadataMagic />;
      default:
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setView}>
      {renderView()}
    </Layout>
  );
}

export default App;
