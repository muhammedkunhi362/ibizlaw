'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Filter, Plus, Eye, Trash2, Loader2 } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import Pagination from '@/components/admin/Pagination';
import { showToast } from '@/components/admin/Toast';
import { CaseStatus } from '@prisma/client';

interface CaseItem {
    id: string;
    caseId: string;
    title: string;
    clientName: string;
    status: CaseStatus;
    nextHearingDate: string | null;
    createdAt: string;
    updatedAt: string;
}

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const statusOptions = [
    { value: 'ALL', label: 'All Statuses' },
    { value: 'OPEN', label: 'Open' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'HEARING_SCHEDULED', label: 'Hearing Scheduled' },
    { value: 'ADJOURNED', label: 'Adjourned' },
    { value: 'CLOSED', label: 'Closed' },
];

export default function CasesPage() {
    const [cases, setCases] = useState<CaseItem[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    const fetchCases = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: '10',
            });
            if (search) params.set('search', search);
            if (statusFilter !== 'ALL') params.set('status', statusFilter);

            const res = await fetch(`/api/cases?${params}`);
            const data = await res.json();
            setCases(data.cases);
            setPagination(data.pagination);
        } catch {
            showToast('Failed to load cases', 'error');
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter]);

    useEffect(() => {
        fetchCases(1);
    }, [fetchCases]);

    const handleDelete = async (caseId: string) => {
        if (!confirm(`Are you sure you want to archive case ${caseId}?`)) return;
        setDeleting(caseId);
        try {
            const res = await fetch(`/api/cases/${caseId}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Case archived successfully', 'success');
                fetchCases(pagination.page);
            } else {
                showToast('Failed to archive case', 'error');
            }
        } catch {
            showToast('Failed to archive case', 'error');
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Cases</h1>
                    <p className="text-admin-muted text-sm mt-1">
                        Manage all legal cases
                    </p>
                </div>
                <Link
                    href="/admin/cases/new"
                    className="flex items-center gap-2 bg-gradient-to-r from-accent to-admin-accent-hover text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-accent/10"
                >
                    <Plus className="w-4 h-4" />
                    New Case
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
                    <input
                        type="text"
                        placeholder="Search by Case ID, title, or client..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-black border border-admin-border rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-muted" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-black border border-admin-border rounded-lg pl-10 pr-8 py-2.5 text-white text-sm focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all appearance-none cursor-pointer min-w-[180px]"
                    >
                        {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-admin-surface border border-admin-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-admin-border">
                                <th className="text-left text-xs font-medium text-admin-muted uppercase tracking-wider px-5 py-3">
                                    Case ID
                                </th>
                                <th className="text-left text-xs font-medium text-admin-muted uppercase tracking-wider px-5 py-3">
                                    Title
                                </th>
                                <th className="text-left text-xs font-medium text-admin-muted uppercase tracking-wider px-5 py-3">
                                    Client
                                </th>
                                <th className="text-left text-xs font-medium text-admin-muted uppercase tracking-wider px-5 py-3">
                                    Status
                                </th>
                                <th className="text-left text-xs font-medium text-admin-muted uppercase tracking-wider px-5 py-3">
                                    Next Hearing
                                </th>
                                <th className="text-right text-xs font-medium text-admin-muted uppercase tracking-wider px-5 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-accent mx-auto" />
                                        <p className="text-admin-muted text-sm mt-2">
                                            Loading cases...
                                        </p>
                                    </td>
                                </tr>
                            ) : cases.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-5 py-12 text-center text-admin-muted text-sm"
                                    >
                                        No cases found. Try adjusting your filters.
                                    </td>
                                </tr>
                            ) : (
                                cases.map((c) => (
                                    <tr
                                        key={c.id}
                                        className="hover:bg-admin-surface-hover transition-colors"
                                    >
                                        <td className="px-5 py-3.5">
                                            <span className="text-sm font-mono text-accent">
                                                {c.caseId}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-sm text-white font-medium truncate max-w-[250px]">
                                                {c.title}
                                            </p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-sm text-admin-muted">{c.clientName}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <StatusBadge status={c.status} />
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-sm text-admin-muted">
                                                {c.nextHearingDate
                                                    ? new Date(c.nextHearingDate).toLocaleDateString(
                                                        'en-IN',
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        }
                                                    )
                                                    : '—'}
                                            </p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link
                                                    href={`/admin/cases/${c.caseId}`}
                                                    className="p-2 rounded-lg text-admin-muted hover:text-white hover:bg-admin-bg transition-all"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(c.caseId)}
                                                    disabled={deleting === c.caseId}
                                                    className="p-2 rounded-lg text-admin-muted hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                                                    title="Archive"
                                                >
                                                    {deleting === c.caseId ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="px-5 py-4 border-t border-admin-border flex items-center justify-between">
                        <p className="text-xs text-admin-muted">
                            Showing {(pagination.page - 1) * pagination.limit + 1}–
                            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                            {pagination.total}
                        </p>
                        <Pagination
                            currentPage={pagination.page}
                            totalPages={pagination.totalPages}
                            onPageChange={(page) => fetchCases(page)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
