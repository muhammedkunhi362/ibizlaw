'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Save,
    Loader2,
    Clock,
    User,
    FileText,
    Calendar,
    Activity,
} from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { showToast } from '@/components/admin/Toast';
import { CaseStatus } from '@prisma/client';

interface CaseData {
    id: string;
    caseId: string;
    title: string;
    clientName: string;
    status: CaseStatus;
    description: string | null;
    nextHearingDate: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    updateLogs: {
        id: string;
        actionType: string;
        oldValue: string | null;
        newValue: string | null;
        updatedBy: string;
        updatedAt: string;
    }[];
}

const statusOptions = [
    { value: 'OPEN', label: 'Open' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'HEARING_SCHEDULED', label: 'Hearing Scheduled' },
    { value: 'ADJOURNED', label: 'Adjourned' },
    { value: 'CLOSED', label: 'Closed' },
];

export default function CaseDetailPage() {
    const router = useRouter();
    const params = useParams();
    const caseId = params.caseId as string;

    const [caseData, setCaseData] = useState<CaseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        clientName: '',
        status: 'OPEN',
        description: '',
        nextHearingDate: '',
        notes: '',
    });

    const fetchCase = useCallback(async () => {
        try {
            const res = await fetch(`/api/cases/${caseId}`);
            if (!res.ok) {
                showToast('Case not found', 'error');
                router.push('/admin/cases');
                return;
            }
            const data = await res.json();
            setCaseData(data);
            setFormData({
                title: data.title,
                clientName: data.clientName,
                status: data.status,
                description: data.description || '',
                nextHearingDate: data.nextHearingDate
                    ? new Date(data.nextHearingDate).toISOString().split('T')[0]
                    : '',
                notes: data.notes || '',
            });
        } catch {
            showToast('Failed to load case', 'error');
        } finally {
            setLoading(false);
        }
    }, [caseId, router]);

    useEffect(() => {
        fetchCase();
    }, [fetchCase]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/cases/${caseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    nextHearingDate: formData.nextHearingDate || null,
                    description: formData.description || null,
                    notes: formData.notes || null,
                }),
            });

            if (res.ok) {
                showToast('Case updated successfully', 'success');
                setIsEditing(false);
                fetchCase();
            } else {
                const error = await res.json();
                showToast(error.error || 'Failed to update', 'error');
            }
        } catch {
            showToast('An error occurred', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        try {
            const res = await fetch(`/api/cases/${caseId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                showToast(`Status updated to ${newStatus.replace('_', ' ')}`, 'success');
                fetchCase();
            } else {
                showToast('Failed to update status', 'error');
            }
        } catch {
            showToast('An error occurred', 'error');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    if (!caseData) return null;

    const inputClass =
        'w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-admin-muted/50 focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all';
    const labelClass = 'block text-sm font-medium text-admin-muted mb-1.5';

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    const formatActionType = (action: string) => {
        const map: Record<string, string> = {
            CREATED: 'Case Created',
            STATUS_CHANGED: 'Status Changed',
            ARCHIVED: 'Case Archived',
            UPDATED_TITLE: 'Title Updated',
            UPDATED_CLIENTNAME: 'Client Name Updated',
            UPDATED_STATUS: 'Status Updated',
            UPDATED_NEXTHEARINGDATE: 'Hearing Date Updated',
        };
        return map[action] || action.replace(/_/g, ' ');
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/cases"
                        className="p-2 rounded-lg text-admin-muted hover:text-white hover:bg-admin-surface-hover transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white">
                                {caseData.caseId}
                            </h1>
                            <StatusBadge status={caseData.status} />
                        </div>
                        <p className="text-admin-muted text-sm mt-0.5">
                            {caseData.title}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 rounded-lg text-sm font-medium border border-admin-border text-white hover:bg-admin-surface-hover transition-all"
                        >
                            Edit Case
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    // Reset form
                                    setFormData({
                                        title: caseData.title,
                                        clientName: caseData.clientName,
                                        status: caseData.status,
                                        description: caseData.description || '',
                                        nextHearingDate: caseData.nextHearingDate
                                            ? new Date(caseData.nextHearingDate).toISOString().split('T')[0]
                                            : '',
                                        notes: caseData.notes || '',
                                    });
                                }}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-admin-muted hover:text-white hover:bg-admin-surface-hover transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 bg-gradient-to-r from-accent to-admin-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
                            >
                                {saving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                Save
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Case Details */}
                    <div className="bg-admin-surface border border-admin-border rounded-xl p-6">
                        <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-accent" />
                            Case Details
                        </h2>

                        {isEditing ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Client Name</label>
                                        <input
                                            type="text"
                                            value={formData.clientName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, clientName: e.target.value })
                                            }
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) =>
                                                setFormData({ ...formData, status: e.target.value })
                                            }
                                            className={`${inputClass} appearance-none cursor-pointer`}
                                        >
                                            {statusOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Next Hearing Date</label>
                                        <input
                                            type="date"
                                            value={formData.nextHearingDate}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    nextHearingDate: e.target.value,
                                                })
                                            }
                                            className={`${inputClass} [color-scheme:dark]`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Description</label>
                                    <textarea
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Notes</label>
                                    <textarea
                                        rows={3}
                                        value={formData.notes}
                                        onChange={(e) =>
                                            setFormData({ ...formData, notes: e.target.value })
                                        }
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-admin-muted uppercase tracking-wide">
                                            Title
                                        </p>
                                        <p className="text-sm text-white mt-1">{caseData.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-admin-muted uppercase tracking-wide">
                                            Client
                                        </p>
                                        <p className="text-sm text-white mt-1">
                                            {caseData.clientName}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-admin-muted uppercase tracking-wide">
                                            Next Hearing
                                        </p>
                                        <p className="text-sm text-white mt-1">
                                            {caseData.nextHearingDate
                                                ? new Date(caseData.nextHearingDate).toLocaleDateString(
                                                    'en-IN',
                                                    {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    }
                                                )
                                                : '—'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-admin-muted uppercase tracking-wide">
                                            Created
                                        </p>
                                        <p className="text-sm text-white mt-1">
                                            {formatDate(caseData.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                {caseData.description && (
                                    <div>
                                        <p className="text-xs text-admin-muted uppercase tracking-wide">
                                            Description
                                        </p>
                                        <p className="text-sm text-white/80 mt-1 leading-relaxed">
                                            {caseData.description}
                                        </p>
                                    </div>
                                )}
                                {caseData.notes && (
                                    <div>
                                        <p className="text-xs text-admin-muted uppercase tracking-wide">
                                            Notes
                                        </p>
                                        <p className="text-sm text-white/80 mt-1 leading-relaxed">
                                            {caseData.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Status Change */}
                    <div className="bg-admin-surface border border-admin-border rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-accent" />
                            Quick Status
                        </h3>
                        <div className="space-y-1.5">
                            {statusOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleStatusChange(opt.value)}
                                    disabled={caseData.status === opt.value}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${caseData.status === opt.value
                                            ? 'bg-accent/15 text-accent border border-accent/20 font-medium'
                                            : 'text-admin-muted hover:text-white hover:bg-admin-surface-hover'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Case Info */}
                    <div className="bg-admin-surface border border-admin-border rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent" />
                            Timestamps
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-admin-muted flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-admin-muted">Created</p>
                                    <p className="text-sm text-white">
                                        {formatDate(caseData.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-admin-muted flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-admin-muted">Last Updated</p>
                                    <p className="text-sm text-white">
                                        {formatDate(caseData.updatedAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-admin-surface border border-admin-border rounded-xl p-6">
                <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent" />
                    Activity Timeline
                </h2>

                {caseData.updateLogs.length === 0 ? (
                    <p className="text-admin-muted text-sm">No activity recorded yet.</p>
                ) : (
                    <div className="space-y-0">
                        {caseData.updateLogs.map((log, index) => (
                            <div key={log.id} className="flex gap-4">
                                {/* Timeline line */}
                                <div className="flex flex-col items-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-accent/60 mt-1.5 flex-shrink-0" />
                                    {index < caseData.updateLogs.length - 1 && (
                                        <div className="w-px flex-1 bg-admin-border" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="pb-6 min-w-0 flex-1">
                                    <p className="text-sm font-medium text-white">
                                        {formatActionType(log.actionType)}
                                    </p>
                                    {(log.oldValue || log.newValue) && (
                                        <div className="mt-1 flex items-center gap-2 text-xs">
                                            {log.oldValue && (
                                                <span className="text-red-400/70 line-through">
                                                    {log.oldValue}
                                                </span>
                                            )}
                                            {log.oldValue && log.newValue && (
                                                <span className="text-admin-muted">→</span>
                                            )}
                                            {log.newValue && (
                                                <span className="text-emerald-400/70">
                                                    {log.newValue.length > 100
                                                        ? log.newValue.substring(0, 100) + '...'
                                                        : log.newValue}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 mt-1.5 text-xs text-admin-muted">
                                        <User className="w-3 h-3" />
                                        <span>{log.updatedBy}</span>
                                        <span>•</span>
                                        <span>{formatDate(log.updatedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
