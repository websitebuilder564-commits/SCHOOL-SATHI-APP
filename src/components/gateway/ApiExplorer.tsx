import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { APPROVED_AI_ENDPOINTS, ApiEndpointDefinition, xyzAiService } from '../../services/xyzAiService';
import { useAuth } from '../../context/AuthContext';
import { Code, Play, CheckCircle2, AlertTriangle, ShieldCheck, Lock } from 'lucide-react';

export const ApiExplorer: React.FC = () => {
  const { user } = useAuth();
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpointDefinition>(
    APPROVED_AI_ENDPOINTS[0]
  );
  const [testResult, setTestResult] = useState<{
    status: number;
    data: unknown;
    latencyMs: number;
  } | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    if (!user) return;
    setIsExecuting(true);
    const start = performance.now();

    try {
      const res = await xyzAiService.invokeApiEndpoint(
        selectedEndpoint.path,
        user,
        selectedEndpoint.parameters
      );
      const latencyMs = Math.round(performance.now() - start);
      setTestResult({
        status: res.status,
        data: res.data,
        latencyMs,
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const isRoleAuthorized = user ? selectedEndpoint.requiredRole.includes(user.role) : false;

  return (
    <div className="space-y-6">
      {/* Top Description Banner */}
      <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-950">
          <p className="font-bold">XYZ AI Integration Gateway & Endpoint Testing Bench</p>
          <p className="mt-0.5 text-indigo-800">
            These authorized REST endpoints provide structured ERP data access to the independently hosted XYZ AI conversational engine. No database credentials or internal secrets are exposed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Endpoint List Selector */}
        <div className="lg:col-span-5 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Approved ERP Endpoints ({APPROVED_AI_ENDPOINTS.length})
          </h4>
          <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
            {APPROVED_AI_ENDPOINTS.map((ep) => {
              const isSelected = ep.path === selectedEndpoint.path;
              const hasAccess = user ? ep.requiredRole.includes(user.role) : false;

              return (
                <button
                  key={ep.path}
                  onClick={() => {
                    setSelectedEndpoint(ep);
                    setTestResult(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          ep.method === 'GET'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-900 truncate">
                        {ep.path}
                      </span>
                    </div>

                    {!hasAccess && (
                      <span
                        className="text-[9px] px-1.5 py-0.5 bg-rose-50 text-rose-600 rounded border border-rose-200 font-semibold"
                        title="Your current authenticated role cannot invoke this endpoint"
                      >
                        403
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {ep.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Endpoint Inspector & Live Test Console */}
        <div className="lg:col-span-7">
          <Card>
            <CardHeader
              title={
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-indigo-600" />
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {selectedEndpoint.method} {selectedEndpoint.path}
                  </span>
                </div>
              }
              action={
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleExecute}
                  isLoading={isExecuting}
                  leftIcon={<Play className="w-3.5 h-3.5" />}
                >
                  Invoke API
                </Button>
              }
            />

            <CardContent className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold text-[10px] uppercase block">
                  Description
                </span>
                <p className="text-slate-800 mt-0.5">{selectedEndpoint.description}</p>
              </div>

              {/* Roles required & current status */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Authorized Roles:</span>
                  <div className="flex gap-1">
                    {selectedEndpoint.requiredRole.map((r) => (
                      <Badge
                        key={r}
                        variant={user?.role === r ? 'primary' : 'neutral'}
                        size="sm"
                      >
                        {r}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-slate-500 font-medium">Session Permission Status:</span>
                  {isRoleAuthorized ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Authorized as {user?.role.toUpperCase()}
                    </span>
                  ) : (
                    <span className="text-rose-700 font-semibold flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      Forbidden for role '{user?.role}' (Will yield 403)
                    </span>
                  )}
                </div>
              </div>

              {/* Execution Result Box */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 font-semibold text-[10px] uppercase">
                    Response Payload
                  </span>
                  {testResult && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono font-bold text-[10px] px-1.5 py-0.5 rounded ${
                          testResult.status === 200
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        HTTP {testResult.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {testResult.latencyMs}ms
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-slate-900 text-emerald-400 font-mono text-[11px] p-3.5 rounded-xl max-h-64 overflow-y-auto border border-slate-800">
                  <pre>
                    {JSON.stringify(
                      testResult ? testResult.data : selectedEndpoint.sampleResponse,
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
