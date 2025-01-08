import React from 'react';
import { Cloud, Server, Database, Globe, Terminal, BarChart } from 'lucide-react';

interface Environment {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  region: string;
  resources: {
    type: 'server' | 'database' | 'cache';
    name: string;
    status: 'healthy' | 'warning' | 'error';
    metrics: {
      cpu: number;
      memory: number;
      storage?: number;
    };
  }[];
  lastDeployed: string;
}

export default function Environments() {
  const environments: Environment[] = [
    {
      name: 'Production',
      status: 'healthy',
      region: 'us-west-2',
      resources: [
        {
          type: 'server',
          name: 'web-1',
          status: 'healthy',
          metrics: { cpu: 45, memory: 60 }
        },
        {
          type: 'database',
          name: 'main-db',
          status: 'healthy',
          metrics: { cpu: 30, memory: 50, storage: 65 }
        }
      ],
      lastDeployed: '2 hours ago'
    },
    {
      name: 'Staging',
      status: 'warning',
      region: 'us-east-1',
      resources: [
        {
          type: 'server',
          name: 'web-staging',
          status: 'warning',
          metrics: { cpu: 80, memory: 75 }
        },
        {
          type: 'database',
          name: 'staging-db',
          status: 'healthy',
          metrics: { cpu: 40, memory: 45, storage: 50 }
        }
      ],
      lastDeployed: '30 minutes ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return 'text-red-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Environments</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Cloud className="h-4 w-4" />
          New Environment
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {environments.map((env) => (
          <div key={env.name} className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${getStatusColor(env.status)}`} />
                <div>
                  <h3 className="font-medium">{env.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Globe className="h-4 w-4" />
                    {env.region}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-sm text-blue-500 hover:text-blue-600">
                  <Terminal className="h-4 w-4" />
                </button>
                <button className="text-sm text-blue-500 hover:text-blue-600">
                  <BarChart className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {env.resources.map((resource) => (
                  <div key={resource.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {resource.type === 'server' ? (
                        <Server className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Database className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <div className="font-medium">{resource.name}</div>
                        <div className="text-sm text-gray-500">{resource.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-sm">
                        <div className={getMetricColor(resource.metrics.cpu)}>
                          CPU: {resource.metrics.cpu}%
                        </div>
                        <div className={getMetricColor(resource.metrics.memory)}>
                          Memory: {resource.metrics.memory}%
                        </div>
                        {resource.metrics.storage && (
                          <div className={getMetricColor(resource.metrics.storage)}>
                            Storage: {resource.metrics.storage}%
                          </div>
                        )}
                      </div>
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(resource.status)}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}