import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { EscalationRequest } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { escalationService } from '../../services/escalationService';
import { LifeBuoy, Clock, CheckCircle2, AlertCircle, Plus, MessageSquare } from 'lucide-react';

interface EscalationTicketListProps {
  tickets: EscalationRequest[];
  onOpenNewTicketModal: () => void;
  onRefresh?: () => void;
}

export const EscalationTicketList: React.FC<EscalationTicketListProps> = ({
  tickets,
  onOpenNewTicketModal,
  onRefresh,
}) => {
  const { user } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<EscalationRequest | null>(null);

  const getStatusBadge = (status: EscalationRequest['status']) => {
    switch (status) {
      case 'SUBMITTED':
        return <Badge variant="primary" size="sm">SUBMITTED</Badge>;
      case 'PENDING':
        return <Badge variant="warning" size="sm">PENDING</Badge>;
      case 'ACCEPTED':
        return <Badge variant="indigo" size="sm">IN REVIEW / ACCEPTED</Badge>;
      case 'COMPLETED':
        return <Badge variant="success" size="sm">RESOLVED</Badge>;
      case 'CANCELLED':
      case 'FAILED':
        return <Badge variant="danger" size="sm">{status}</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  const handleStatusUpdate = (ticketId: string, newStatus: EscalationRequest['status']) => {
    if (!user) return;
    escalationService.updateRequestStatus(ticketId, newStatus, user);
    if (onRefresh) onRefresh();
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  };

  return (
    <Card>
      <CardHeader
        title="Support & Escalation Requests"
        subtitle="Track submitted queries to faculty and school management"
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenNewTicketModal}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            New Support Request
          </Button>
        }
      />

      <CardContent>
        {tickets.length === 0 ? (
          <div className="text-center py-10">
            <LifeBuoy className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No support requests yet</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              If you have inquiries regarding student attendance, academics, or school facilities, open a direct request.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={onOpenNewTicketModal}
            >
              Open First Request
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className="py-3.5 hover:bg-slate-50/70 cursor-pointer transition-colors rounded-xl px-3 -mx-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-xs text-indigo-600">
                        {ticket.id}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {ticket.type}
                      </span>
                      {getStatusBadge(ticket.status)}
                      {ticket.priority === 'URGENT' && (
                        <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded">
                          URGENT
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900">{ticket.subject}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{ticket.details}</p>
                    
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1">
                      <span>Submitted by: <strong>{ticket.userName}</strong></span>
                      {ticket.assignedTo && <span>Assigned: <strong>{ticket.assignedTo}</strong></span>}
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="shrink-0 text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Ticket Modal */}
        {selectedTicket && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
              <div>
                <span className="font-mono text-xs text-indigo-600 font-bold">
                  {selectedTicket.id}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">{selectedTicket.subject}</h4>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                ✕ Close
              </button>
            </div>

            <div className="text-xs text-slate-700 space-y-2">
              <p className="leading-relaxed bg-white p-3 rounded-lg border border-slate-200/60">
                {selectedTicket.details}
              </p>
              
              {selectedTicket.resolutionNotes && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                  <span className="font-bold block text-[11px] mb-0.5">Faculty / Management Note:</span>
                  {selectedTicket.resolutionNotes}
                </div>
              )}
            </div>

            {/* Management / Teacher status transition actions */}
            {(user?.role === 'teacher' || user?.role === 'principal') && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                <span className="text-slate-500 font-medium">Update Ticket Status:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleStatusUpdate(selectedTicket.id, 'ACCEPTED')}
                    className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded font-medium text-[11px]"
                  >
                    Mark In Review
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedTicket.id, 'COMPLETED')}
                    className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded font-medium text-[11px]"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
