import React from 'react';
import { Database, HardDrive, Activity, AlertTriangle, Search } from 'lucide-react';

export default function Databases() {
  const databases = [
    {
      name: 'Production DB',
      type: 'PostgreSQL',
      version: '14.5',
      status: 'healthy',
      size: '1.2 TB',
      connections: 234,
      metrics: {
        cpu: 45,
        memory: 60,
        iops: 2800
      }
    },
    {
      name: 'Analytics DB',
      type: 'MongoDB',
      version: '5.0',
      status: 'warning',
      size: '850 GB',
      connections: 89,
      metrics: {
        cpu: 78,
        memory: 85,
        iops: 1500
      }
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Database Management</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search databases..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Database className="h-4 w-4" />
            New Database
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {databases.map((db) => (
          <div key={db.name} className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database className="h-6 w-6 text-blue-500" />
                <div>
                  <h3 className="font-medium">{db.name}</h3>
                  <p className="text-sm text-gray-500">{db.type} {db.version}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {db.status === 'warning' && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  db.status === 'healthy' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {db.status}
                </span>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Storage Used</span>
                  <span className="text-sm font-medium">{db.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Active Connections</span>
                  <span className="text-sm font-medium">{db.connections}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU Usage</span>
                    <span className={db.metrics.cpu > 75 ? 'text-red-500' : 'text-gray-600'}>
                      {db.metrics.cpu}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        db.metrics.cpu > 75 ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${db.metrics.cpu}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memory Usage</span>
                    <span className={db.metrics.memory > 75 ? 'text-red-500' : 'text-gray-600'}>
                      {db.metrics.memory}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        db.metrics.memory > 75 ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${db.metrics.memory}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button className="px-4 py-2 text-sm text-blue-500 hover:bg-blue-50 rounded-lg">
                  Backup
                </button>
                <button className="px-4 py-2 text-sm text-blue-500 hover:bg-blue-50 rounded-lg">
                  Configure
                </button>
                <button className="px-4 py-2 text-sm text-blue-500 hover:bg-blue-50 rounded-lg">
                  Logs
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}