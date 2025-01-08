import React from 'react';
import {
  LayoutDashboard,
  GitBranch,
  Terminal,
  Activity,
  Settings,
  Cloud,
  Shield,
  Server,
  Database,
  FileCode,
  Users,
  BookOpen,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'ci-cd', icon: GitBranch, label: 'CI/CD Pipeline' },
    { id: 'environments', icon: Cloud, label: 'Environments' },
    { id: 'monitoring', icon: Activity, label: 'Monitoring' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'terminal', icon: Terminal, label: 'Terminal' },
    { id: 'databases', icon: Database, label: 'Databases' },
    { id: 'applications', icon: FileCode, label: 'Applications' },
    { id: 'teams', icon: Users, label: 'Teams' },
    { id: 'docs', icon: BookOpen, label: 'Documentation' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Server className="h-6 w-6" />
          DevOps Portal
        </h1>
      </div>
      <nav className="mt-8 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 text-sm ${
              activeTab === item.id
                ? 'bg-gray-800 border-l-4 border-blue-500'
                : 'hover:bg-gray-800'
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}