'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { showToast } from '@/components/admin/Toast';

const statusOptions = [
    { value: 'OPEN', label: 'Open' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'HEARING_SCHEDULED', label: 'Hearing Scheduled' },
    { value: 'ADJOURNED', label: 'Adjourned' },
    { value: 'CLOSED', label: 'Closed' },
];

export default function NewCasePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        clientName: '',
        status: 'OPEN',
        description: '',
        nextHearingDate: '',
        notes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/cases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    nextHearingDate: formData.nextHearingDate || null,
                    description: formData.description || null,
                    notes: formData.notes || null,
                }),
            });

            if (res.ok) {
                const newCase = await res.json();
                showToast(`Case ${newCase.caseId} created successfully`, 'success');
                router.push('/admin/cases');
            } else {
                const error = await res.json();
                showToast(error.error || 'Failed to create case', 'error');
            }
        } catch {
            showToast('An error occurred', 'error');
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        'w-full bg-black border border-admin-border rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all';
    const labelClass = 'block text-sm font-medium text-admin-muted mb-1.5';

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/cases"
                    className="p-2 rounded-lg text-admin-muted hover:text-white hover:bg-admin-surface-hover transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">New Case</h1>
                    <p className="text-admin-muted text-sm mt-0.5">
                        A case ID will be auto-generated
                    </p>
                </div>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-admin-surface border border-admin-border rounded-xl p-6 space-y-5"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="title" className={labelClass}>
                            Case Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className={inputClass}
                            placeholder="e.g. Cheque Bounce - Section 138"
                        />
                    </div>
                    <div>
                        <label htmlFor="clientName" className={labelClass}>
                            Client Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="clientName"
                            type="text"
                            required
                            value={formData.clientName}
                            onChange={(e) =>
                                setFormData({ ...formData, clientName: e.target.value })
                            }
                            className={inputClass}
                            placeholder="e.g. Arjun Mehta"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="status" className={labelClass}>
                            Status
                        </label>
                        <select
                            id="status"
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
                        <label htmlFor="nextHearingDate" className={labelClass}>
                            Next Hearing Date
                        </label>
                        <input
                            id="nextHearingDate"
                            type="date"
                            value={formData.nextHearingDate}
                            onChange={(e) =>
                                setFormData({ ...formData, nextHearingDate: e.target.value })
                            }
                            className={`${inputClass} [color-scheme:dark]`}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className={labelClass}>
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        className={`${inputClass} resize-none`}
                        placeholder="Brief description of the case..."
                    />
                </div>

                <div>
                    <label htmlFor="notes" className={labelClass}>
                        Notes
                    </label>
                    <textarea
                        id="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                        }
                        className={`${inputClass} resize-none`}
                        placeholder="Internal notes..."
                    />
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-gradient-to-r from-accent to-admin-accent-hover text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Create Case
                            </>
                        )}
                    </button>
                    <Link
                        href="/admin/cases"
                        className="px-5 py-2.5 rounded-lg text-sm font-medium text-admin-muted hover:text-white hover:bg-admin-surface-hover transition-all"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
