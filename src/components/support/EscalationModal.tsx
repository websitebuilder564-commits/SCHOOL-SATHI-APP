import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { escalationService } from '../../services/escalationService';
import { EscalationRequest } from '../../types';
import { Send, CheckCircle2, UserCheck, Building2 } from 'lucide-react';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'TEACHER' | 'MANAGEMENT';
  studentId?: string;
  studentName?: string;
  onRequestSubmitted?: (req: EscalationRequest) => void;
}

export const EscalationModal: React.FC<EscalationModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'TEACHER',
  studentId,
  studentName,
  onRequestSubmitted,
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [type, setType] = useState<'TEACHER' | 'MANAGEMENT'>(defaultType);
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [priority, setPriority] = useState<'NORMAL' | 'HIGH' | 'URGENT'>('NORMAL');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{
    requestId: string;
    status: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !subject.trim() || !details.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await escalationService.createRequest({
        user,
        type,
        studentId: studentId || user.studentId,
        studentName: studentName || user.name,
        subject,
        details,
        priority,
      });

      if (res.success && res.request) {
        setSuccessResponse({
          requestId: res.requestId || res.request.id,
          status: res.status || 'SUBMITTED',
        });
        if (onRequestSubmitted) {
          onRequestSubmitted(res.request);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessResponse(null);
    setSubject('');
    setDetails('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={successResponse ? t('requestSubmitted') : 'Escalate & Request Support'}
      subtitle={
        successResponse
          ? 'Your escalation ticket is recorded and dispatched'
          : 'Direct formal channel to Class Teachers & School Management'
      }
      maxWidth="lg"
    >
      {successResponse ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900">
              {t('requestSubmitted')}
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Your inquiry has been assigned an immutable tracking number. The assigned personnel will review and follow up promptly.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-xs mx-auto text-left text-xs space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">{t('requestId')}:</span>
              <strong className="text-indigo-600">{successResponse.requestId}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t('status')}:</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 font-bold rounded text-[10px]">
                {successResponse.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Channel:</span>
              <span className="text-slate-700">{type}</span>
            </div>
          </div>

          <Button variant="primary" onClick={handleResetAndClose} className="mt-4">
            Done & View Status
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Channel Selection Buttons */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Escalation Destination
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('TEACHER')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                  type === 'TEACHER'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-semibold ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="p-2 rounded-lg bg-white shadow-2xs text-indigo-600">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xs">{t('talkToTeacher')}</div>
                  <div className="text-[10px] text-slate-500 font-normal">Academic, homework, & mentoring</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setType('MANAGEMENT')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                  type === 'MANAGEMENT'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-semibold ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="p-2 rounded-lg bg-white shadow-2xs text-purple-600">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-xs">{t('contactManagement')}</div>
                  <div className="text-[10px] text-slate-500 font-normal">Administration, bus, & fees</div>
                </div>
              </button>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Priority Level
            </label>
            <div className="flex gap-2">
              {(['NORMAL', 'HIGH', 'URGENT'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    priority === p
                      ? p === 'URGENT'
                        ? 'bg-rose-600 text-white border-rose-600'
                        : p === 'HIGH'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Subject / Topic <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Request for extra math problem mentoring sessions"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Detailed Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide context, specific dates, or student requirements..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleResetAndClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              {t('submitRequest')}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
