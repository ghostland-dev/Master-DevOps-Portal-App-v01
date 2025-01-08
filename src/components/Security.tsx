import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Security() {
  const securityScore = 85;
  
  const vulnerabilities = [
    { severity: 'critical', count: 2, description: 'NPM packages with known vulnerabilities' },
    { severity: 'high', count: 3, description: 'Outdated SSL certificates' },
    { severity: 'medium', count: 8, description: 'Security patches pending' }
  ];

  const recentScans = [
    { type: 'Dependency Scan', status: 'completed', findings: 3, time: '1h ago' },
    { type: 'Container Scan', status: 'completed', findings: 0, time: '3h ago' },
    { type: 'Code Analysis', status: 'in_progress', time: 'Running...' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h2 className="text-lg font-semibold mb-4">Security Score</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{securityScore}</span>
              </div>
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke={securityScore > 80 ? '#22c55e' : '#eab308'}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${securityScore * 3.51} 351`}
                />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Security Status</p>
              <p className={`text-lg font-semibold ${
                securityScore > 80 ? 'text-green-500' : 'text-yellow-500'
              }`}>
                {securityScore > 80 ? 'Good' : 'Needs Attention'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Vulnerabilities</h2>
          <div className="space-y-4">
            {vulnerabilities.map((vuln, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-5 w-5 ${
                    vuln.severity === 'critical' ? 'text-red-500' :
                    vuln.severity === 'high' ? 'text-orange-500' : 'text-yellow-500'
                  }`} />
                  <span className="text-sm">{vuln.description}</span>
                </div>
                <span className="text-sm font-semibold">{vuln.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Recent Security Scans</h2>
        </div>
        <div className="divide-y">
          {recentScans.map((scan, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{scan.type}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {scan.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {scan.status === 'completed' ? (
                  <>
                    {scan.findings === 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm">
                      {scan.findings} {scan.findings === 1 ? 'finding' : 'findings'}
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                    <span className="text-sm text-gray-500">In Progress</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}