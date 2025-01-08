import React from 'react';
import { GitBranch, Play, Check, AlertCircle, Clock, RefreshCw } from 'lucide-react';

interface Pipeline {
  id: string;
  name: string;
  branch: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  stages: {
    name: string;
    status: 'running' | 'success' | 'failed' | 'pending';
    duration?: string;
  }[];
  triggered: string;
  duration: string;
}

export default function CICDPipeline() {
  const pipelines: Pipeline[] = [
    {
      id: '1',
      name: 'main-pipeline',
      branch: 'main',
      status: 'running',
      stages: [
        { name: 'Build', status: 'success', duration: '2m 30s' },
        { name: 'Test', status: 'success', duration: '3m 45s' },
        { name: 'Deploy', status: 'running' },
      ],
      triggered: '5 minutes ago',
      duration: '6m 15s'
    },
    {
      id: '2',
      name: 'feature-auth',
      branch: 'feature/auth',
      status: 'success',
      stages: [
        { name: 'Build', status: 'success', duration: '2m 15s' },
        { name: 'Test', status: 'success', duration: '3m 30s' },
        { name: 'Deploy', status: 'success', duration: '1m 45s' },
      ],
      triggered: '1 hour ago',
      duration: '7m 30s'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <RefreshCw className="animate-spin h-5 w-5 text-blue-500" />;
      case 'success': return <Check className="h-5 w-5 text-green-500" />;
      case 'failed': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">CI/CD Pipelines</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Play className="h-4 w-4" />
          Run Pipeline
        </button>
      </div>

      <div className="space-y-4">
        {pipelines.map((pipeline) => (
          <div key={pipeline.id} className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GitBranch className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium">{pipeline.name}</h3>
                  <p className="text-sm text-gray-500">{pipeline.branch}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {pipeline.triggered}
                </div>
                {getStatusIcon(pipeline.status)}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-4">
                {pipeline.stages.map((stage, index) => (
                  <React.Fragment key={stage.name}>
                    <div className="flex flex-col items-center">
                      <div className="text-sm font-medium mb-2">{stage.name}</div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(stage.status)}
                        {stage.duration && (
                          <span className="text-xs text-gray-500">{stage.duration}</span>
                        )}
                      </div>
                    </div>
                    {index < pipeline.stages.length - 1 && (
                      <div className="h-px w-12 bg-gray-200" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}