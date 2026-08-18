import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { analyticsService } from '../../services/analyticsService';
import { escalationService } from '../../services/escalationService';
import { auditService } from '../../services/auditService';
import { notificationService } from '../../services/notificationService';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AttendanceAreaChart } from '../../components/analytics/AttendanceAreaChart';
import { ClassComparisonBarChart } from '../../components/analytics/ClassComparisonBarChart';
import { ChatInterface } from '../../components/chat/ChatInterface';
import { VoiceInteractionPanel } from '../../components/voice/VoiceInteractionPanel';
import { AIAvatar, AvatarMode } from '../../components/AIAvatar/AIAvatar';
import { ApiExplorer } from '../../components/gateway/ApiExplorer';
import { EscalationModal } from '../../components/support/EscalationModal';
import { EscalationTicketList } from '../../components/support/EscalationTicketList';
import { SecuritySandbox } from '../../components/security/SecuritySandbox';
import { 
  ShieldCheck, 
  Users, 
  CalendarCheck, 
  Sparkles, 
  LifeBuoy, 
  Clock, 
  Award, 
  FileText, 
  BarChart3,
  TrendingUp,
  Download,
  CheckCircle2,
  AlertCircle,
  Building2
} from 'lucide-react';

interface ManagementPortalProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ManagementPortal: React.FC<ManagementPortalProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { user } = useAuth();
  const { t, language, setLanguage, languageOptions } = useLanguage();

  const [avatarMode, setAvatarMode] = useState<AvatarMode>('idle');
  const [isEscalationOpen, setIsEscalationOpen] = useState(false);
  const [aiViewMode, setAiViewMode] = useState<'chat' | 'voice' | 'avatar' | 'api'>('chat');

  if (!user) return null;

  const analyticsData = analyticsService.getInstitutionalAnalytics(user).data;
  const tickets = escalationService.getAllRequestsForManagement(user);
  const auditLogs = auditService.getLogs(15);
  const notifications = notificationService.getNotificationsForRole('principal');

  return (
    <div className="space-y-6">
      {/* Tab: Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Executive Welcome Banner */}
          <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-700/60 inline-flex items-center gap-1.5 mb-3">
                <ShieldCheck className="w-3 h-3" />
                Principal & Institutional Administration Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                School Executive Dashboard
              </h2>
              <p className="text-xs sm:text-sm text-purple-200 mt-2 leading-relaxed">
                Logged in as <strong>{user.name}</strong> • Institutional Attendance: <strong className="text-emerald-400">91.8%</strong> • Total Active Students: <strong className="text-white">1,248</strong>
              </p>

              {/* Quick Actions Row */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveTab('analytics')}
                  className="bg-white text-purple-950 hover:bg-slate-100 font-semibold"
                  leftIcon={<BarChart3 className="w-3.5 h-3.5 text-purple-600" />}
                >
                  {t('viewAnalytics')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('xyzai')}
                  className="bg-purple-900/40 text-white hover:bg-purple-900/70 border-purple-700/60"
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                >
                  {t('openXyzAi')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('support')}
                  className="bg-purple-900/40 text-white hover:bg-purple-900/70 border-purple-700/60"
                  leftIcon={<LifeBuoy className="w-3.5 h-3.5" />}
                >
                  Parent & Faculty Inquiries ({tickets.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('security')}
                  className="bg-purple-900/40 text-white hover:bg-purple-900/70 border-purple-700/60"
                  leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
                >
                  Audit Trail
                </Button>
              </div>
            </div>
          </div>

          {/* Institutional KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Enrolled Students"
              value={analyticsData ? analyticsData.totalStudents.toLocaleString() : '1,248'}
              subtitle="Spread over 32 Class Sections"
              trend={{ value: 4.2, isPositive: true }}
              icon={<Users className="w-5 h-5 text-indigo-600" />}
            />
            <StatCard
              title="Overall Attendance Rate"
              value={analyticsData ? `${analyticsData.overallRate}%` : '91.8%'}
              subtitle="Above 75% CBSE Benchmark"
              trend={{ value: 1.4, isPositive: true }}
              icon={<CalendarCheck className="w-5 h-5 text-emerald-600" />}
            />
            <StatCard
              title="Active Faculty & Mentors"
              value={analyticsData ? analyticsData.totalTeachers.toString() : '84'}
              subtitle="100% Attendance marked today"
              icon={<Award className="w-5 h-5 text-amber-600" />}
            />
            <StatCard
              title="Active Inbound Tickets"
              value={`${tickets.filter((t) => t.status !== 'COMPLETED').length} Open`}
              subtitle="Assigned to teachers & admin"
              icon={<LifeBuoy className="w-5 h-5 text-purple-600" />}
            />
          </div>

          {/* Charts Row */}
          {analyticsData && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <AttendanceAreaChart
                  data={analyticsData.monthlyVariance}
                  title="Campus Attendance Trajectory (Aug 2026)"
                  subtitle="Day-by-day institutional attendance rates"
                />
              </div>
              <div className="lg:col-span-5">
                <ClassComparisonBarChart
                  data={analyticsData.classStats}
                  title="Class-by-Class Attendance Rates"
                />
              </div>
            </div>
          )}

          {/* Live Institutional Audit Log Table */}
          <Card>
            <CardHeader
              title="Institutional Audit & Security Logs"
              subtitle="Tamper-evident logs of ERP data access and XYZ AI integration requests"
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('security')}
                >
                  Full Security Console →
                </Button>
              }
            />
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4 font-mono">Timestamp</th>
                      <th className="py-2.5 px-4">User</th>
                      <th className="py-2.5 px-4">Action</th>
                      <th className="py-2.5 px-4">Resource</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.slice(0, 6).map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-mono text-[10px] text-slate-400">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-slate-900">
                          {log.userName}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-indigo-600 font-semibold">
                          {log.action}
                        </td>
                        <td className="py-2.5 px-4 text-slate-600">{log.resource}</td>
                        <td className="py-2.5 px-4">
                          <Badge
                            variant={log.status === 'SUCCESS' ? 'success' : 'danger'}
                            size="sm"
                          >
                            {log.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab: Analytics */}
      {activeTab === 'analytics' && analyticsData && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Institution-Wide Analytical Report</h3>
              <p className="text-xs text-slate-500">Term 1 (Academic Year 2026-27)</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert('Exporting encrypted attendance & academic CSV bundle...')}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export CSV Report
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <AttendanceAreaChart
                data={analyticsData.monthlyVariance}
                title="Institutional Attendance Trend"
                subtitle="Aggregated attendance rate across 1,248 enrolled students"
              />
            </div>
            <div className="lg:col-span-5">
              <ClassComparisonBarChart
                data={analyticsData.classStats}
                title="Grade Section Performance"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: School-Wide Attendance */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">School-Wide Attendance & Anomaly Console</h3>
              <p className="text-xs text-slate-500">Real-time attendance registry across all 12 grade sections and faculty rosters</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert('Generating CBSE Attendance Compliance Report...')}
                leftIcon={<FileText className="w-3.5 h-3.5" />}
              >
                CBSE Compliance PDF
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => alert('Downloading attendance CSV...')}
                leftIcon={<Download className="w-3.5 h-3.5" />}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Export CSV
              </Button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Today's Student Turnout"
              value="91.8%"
              subtext="1,146 / 1,248 Present"
              icon={<Users className="w-5 h-5 text-emerald-600" />}
              variant="default"
            />
            <StatCard
              title="Faculty Attendance"
              value="97.4%"
              subtext="74 / 76 Teachers on Duty"
              icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
              variant="default"
            />
            <StatCard
              title="Mandatory At-Risk (<75%)"
              value="14 Students"
              subtext="Requires Parent Intimation"
              icon={<AlertCircle className="w-5 h-5 text-rose-600" />}
              variant="default"
            />
            <StatCard
              title="Best Performing Class"
              value="Class 8A"
              subtext="96.2% Avg Attendance"
              icon={<Award className="w-5 h-5 text-amber-500" />}
              variant="default"
            />
          </div>

          {/* Class Attendance Table */}
          <Card>
            <CardHeader
              title="Section-by-Section Attendance Summary"
              subtitle="Daily attendance status reported by respective Class Teachers"
            />
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Class Section</th>
                      <th className="py-3 px-4">Class Teacher</th>
                      <th className="py-3 px-4 text-center">Enrolled</th>
                      <th className="py-3 px-4 text-center">Present</th>
                      <th className="py-3 px-4 text-center">Absent</th>
                      <th className="py-3 px-4 text-center">Turnout</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { cls: 'Class 8A', teacher: 'Mr. Amit Kumar', enrolled: 42, present: 39, absent: 3, rate: 92.8, status: 'Submitted' },
                      { cls: 'Class 8B', teacher: 'Mrs. S. Sharma', enrolled: 40, present: 36, absent: 4, rate: 90.0, status: 'Submitted' },
                      { cls: 'Class 9A', teacher: 'Mr. R. Rao', enrolled: 38, present: 36, absent: 2, rate: 94.7, status: 'Submitted' },
                      { cls: 'Class 9B', teacher: 'Ms. M. Nair', enrolled: 41, present: 38, absent: 3, rate: 92.6, status: 'Submitted' },
                      { cls: 'Class 10A', teacher: 'Dr. S. Verma', enrolled: 45, present: 43, absent: 2, rate: 95.5, status: 'Submitted' },
                      { cls: 'Class 10B', teacher: 'Mr. P. Gupta', enrolled: 44, present: 40, absent: 4, rate: 90.9, status: 'Submitted' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">{row.cls}</td>
                        <td className="py-3 px-4 text-slate-600">{row.teacher}</td>
                        <td className="py-3 px-4 text-center font-mono">{row.enrolled}</td>
                        <td className="py-3 px-4 text-center font-mono text-emerald-600 font-bold">{row.present}</td>
                        <td className="py-3 px-4 text-center font-mono text-rose-500">{row.absent}</td>
                        <td className="py-3 px-4 text-center font-bold text-slate-900">{row.rate}%</td>
                        <td className="py-3 px-4 text-right">
                          <Badge variant="success" size="sm">{row.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">Institutional Audit & Compliance Ledger</h3>
              <p className="text-xs text-slate-500">Immutable, cryptographic logs of ERP access, attendance modifications, and AI interactions</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert('Exporting full institutional audit log ledger in CSV format...')}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export Audit Trail (CSV)
            </Button>
          </div>

          <Card>
            <CardHeader
              title={`Audit Events Log (${auditLogs.length} Events Recorded)`}
              subtitle="All system mutations are signed with HMAC-SHA256 nonces for tamper-evident compliance"
            />
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-mono">Timestamp</th>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Target Resource</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 font-mono text-slate-400">Log Hash</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">{log.userName}</td>
                        <td className="py-3 px-4 text-slate-500 font-medium">{log.userRole}</td>
                        <td className="py-3 px-4 font-mono font-semibold text-purple-700">{log.action}</td>
                        <td className="py-3 px-4 text-slate-600">{log.resource}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={log.status === 'SUCCESS' ? 'success' : 'danger'} size="sm">
                            {log.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-mono text-[10px] text-slate-400">
                          {log.id.substring(0, 10)}...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab: Inquiries / Support Desk */}
      {activeTab === 'support' && (
        <div className="space-y-6">
          <EscalationTicketList
            tickets={tickets}
            onOpenNewTicketModal={() => setIsEscalationOpen(true)}
          />
        </div>
      )}

      {/* Tab: XYZ AI Integration */}
      {activeTab === 'xyzai' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 flex-wrap">
            {[
              { id: 'chat', label: t('aiChat'), icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: 'voice', label: t('aiVoice'), icon: <Clock className="w-3.5 h-3.5" /> },
              { id: 'avatar', label: t('aiAvatar'), icon: <Award className="w-3.5 h-3.5" /> },
              { id: 'api', label: t('apiExplorer'), icon: <FileText className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setAiViewMode(tab.id as typeof aiViewMode)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  aiViewMode === tab.id
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {aiViewMode === 'chat' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <ChatInterface
                  onOpenEscalation={() => setIsEscalationOpen(true)}
                  onAvatarModeChange={setAvatarMode}
                />
              </div>
              <div className="lg:col-span-4">
                <AIAvatar mode={avatarMode} onModeChange={setAvatarMode} />
              </div>
            </div>
          )}

          {aiViewMode === 'voice' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <VoiceInteractionPanel onAvatarModeChange={setAvatarMode} />
              </div>
              <div className="lg:col-span-4">
                <AIAvatar mode={avatarMode} onModeChange={setAvatarMode} />
              </div>
            </div>
          )}

          {aiViewMode === 'avatar' && (
            <AIAvatar mode={avatarMode} onModeChange={setAvatarMode} />
          )}

          {aiViewMode === 'api' && <ApiExplorer />}
        </div>
      )}

      {/* Tab: Security Sandbox & RBAC verification */}
      {activeTab === 'security' && <SecuritySandbox />}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <Card>
          <CardHeader
            title={t('settings')}
            subtitle="Configure administrative system settings and multi-lingual options"
          />
          <CardContent className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('language')} (Multi-Lingual Localization)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setLanguage(opt.code)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold transition-all ${
                      language === opt.code
                        ? 'border-purple-600 bg-purple-50 text-purple-900 ring-1 ring-purple-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-base">{opt.flag}</span>
                    <div>
                      <div>{opt.nativeName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{opt.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Escalation Modal */}
      <EscalationModal
        isOpen={isEscalationOpen}
        onClose={() => setIsEscalationOpen(false)}
        defaultType="MANAGEMENT"
      />
    </div>
  );
};
