import React from 'react';
import {
  Box,
  Activity,
  Server,
  Lock,
  Users,
  Database,
  GitBranch,
  Clock,
} from 'lucide-react';

interface Metric {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function Dashboard() {
  const environments = ['Development', 'Staging', 'Production'];
  
  const metrics: Metric[] = [
    { 
      label: 'Total Deployments', 
      value: 124, 
      icon: Box,
      trend: { value: 12, isPositive: true }
    },
    { 
      label: 'System Uptime', 
      value: '99.9%', 
      icon: Activity,
      trend: { value: 0.2, isPositive: true }
    },
    { 
      label: 'Active Servers', 
      value: 8, 
      icon: Server,
      trend: { value: 2, isPositive: true }
    },
    { 
      label: 'Security Alerts', 
      value: 2, 
      icon: Lock,
      trend: { value: 1, isPositive: false }
    },
    { 
      label: 'Active Users', 
      value: 45, 
      icon: Users,
      trend: { value: 5, isPositive: true }
    },
    { 
      label: 'Database Health', 
      value: '98%', 
      icon: Database,
      trend: { value: 1, isPositive: true }
    },
  ];

  const activities = [
    { 
      message: 'Production deployment successful - v2.1.0',
      status: 'success',
      time: '10 minutes ago',
      icon: GitBranch
    },
    { 
      message: 'New server instance launched - us-west-2',
      status: 'success',
      time: '25 minutes ago',
      icon: Server
    },
    { 
      message: 'Database backup completed',
      status: 'success',
      time: '1 hour ago',
      icon: Database
    },
    { 
      message: 'Security scan completed - 2 warnings',
      status: 'warning',
      time: '2 hours ago',
      icon: Lock
    },
    { 
      message: 'CI pipeline passed - main branch',
      status: 'success',
      time: '3 hours ago',
      icon: GitBranch
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Environment Status */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Environment Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {environments.map((env) => (
            <div key={env} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{env}</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="text-xs text-gray-500">Last deployed: 2h ago</div>
              <div className="mt-2 text-xs">
                <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full">Healthy</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className="text-2xl font-semibold mt-1">{metric.value}</p>
                {metric.trend && (
                  <div className={`text-sm mt-1 ${
                    metric.trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend.isPositive ? '↑' : '↓'} {metric.trend.value}
                  </div>
                )}
              </div>
              <metric.icon className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
              >
                <activity.icon className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{activity.message}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
                <div 
                  className={`h-2 w-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}