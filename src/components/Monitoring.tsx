import React from 'react';
import { Activity, AlertTriangle, ArrowUp, ArrowDown, Clock, RefreshCw } from 'lucide-react';

export default function Monitoring() {
  const metrics = [
    { name: 'System Load', value: '72%', trend: 'up', change: '+5%' },
    { name: 'Response Time', value: '245ms', trend: 'down', change: '-12ms' },
    { name: 'Error Rate', value: '0.12%', trend: 'down', change: '-0.05%' },
    { name: 'Active Users', value: '1,234', trend: 'up', change: '+102' }
  ];

  const alerts = [
    { severity: 'high', message: 'High CPU usage on prod-db-1', time: '5m ago' },
    { severity: 'medium', message: 'Memory usage above 80% on web-2', time: '15m ago' },
    { severity: 'low', message: 'Increased latency in EU region', time: '1h ago' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-sm text-gray-500">{metric.name}</h3>
              {metric.trend === 'up' ? (
                <ArrowUp className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-green-500" />
              )}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{metric.value}</span>
              <span className={`text-sm ${
                metric.trend === 'up' ? 'text-red-500' : 'text-green-500'
              }`}>{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Active Alerts</h2>
          <button className="text-blue-500 hover:text-blue-600">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        <div className="divide-y">
          {alerts.map((alert, index) => (
            <div key={index} className="p-4 flex items-center gap-4">
              <AlertTriangle className={`h-5 w-5 ${
                alert.severity === 'high' ? 'text-red-500' :
                alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
              }`} />
              <div className="flex-1">
                <p className="font-medium">{alert.message}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {alert.time}
                </p>
              </div>
              <button className="text-sm text-blue-500 hover:text-blue-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}