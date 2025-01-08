import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CICDPipeline from './components/CICDPipeline';
import Environments from './components/Environments';
import Monitoring from './components/Monitoring';
import Security from './components/Security';
import Databases from './components/Databases';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getTabTitle = (tab: string) => {
    const titles: { [key: string]: string } = {
      dashboard: 'Dashboard Overview',
      'ci-cd': 'CI/CD Pipeline',
      environments: 'Environment Management',
      monitoring: 'System Monitoring',
      security: 'Security & Compliance',
      terminal: 'Terminal Access',
      databases: 'Database Management',
      applications: 'Applications',
      teams: 'Team Management',
      docs: 'Documentation',
      settings: 'Settings',
    };
    return titles[tab] || 'DevOps Portal';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <Header title={getTabTitle(activeTab)} />
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'ci-cd' && <CICDPipeline />}
        {activeTab === 'environments' && <Environments />}
        {activeTab === 'monitoring' && <Monitoring />}
        {activeTab === 'security' && <Security />}
        {activeTab === 'databases' && <Databases />}
      </div>
    </div>
  );
}

export default App;