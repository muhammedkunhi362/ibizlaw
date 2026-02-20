import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
    FolderOpen,
    Clock,
    Scale,
    CheckCircle,
    ArrowRight,
    Plus,
} from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import StatusBadge from '@/components/admin/StatusBadge';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/admin/login');

    const [totalCases, openCases, inProgressCases, closedCases, recentCases] =
        await Promise.all([
            prisma.case.count({ where: { isArchived: false } }),
            prisma.case.count({ where: { status: 'OPEN', isArchived: false } }),
            prisma.case.count({
                where: { status: 'IN_PROGRESS', isArchived: false },
            }),
            prisma.case.count({ where: { status: 'CLOSED', isArchived: false } }),
            prisma.case.findMany({
                where: { isArchived: false },
                orderBy: { updatedAt: 'desc' },
                take: 5,
            }),
        ]);

    const upcomingHearings = await prisma.case.findMany({
        where: {
            isArchived: false,
            nextHearingDate: { gte: new Date() },
        },
        orderBy: { nextHearingDate: 'asc' },
        take: 5,
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-admin-muted text-sm mt-1">
                        Welcome back, {session.user?.name || 'Admin'}
                    </p>
                </div>
                <Link
                    href="/admin/cases/new"
                    className="flex items-center justify-center sm:justify-start gap-2 bg-gradient-to-r from-accent to-admin-accent-hover text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-accent/10 sm:w-auto w-full"
                >
                    <Plus className="w-4 h-4" />
                    New Case
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Cases"
                    value={totalCases}
                    icon={FolderOpen}
                />
                <StatsCard title="Open" value={openCases} icon={Scale} />
                <StatsCard
                    title="In Progress"
                    value={inProgressCases}
                    icon={Clock}
                />
                <StatsCard
                    title="Closed"
                    value={closedCases}
                    icon={CheckCircle}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Cases */}
                <div className="bg-admin-surface border border-admin-border rounded-xl">
                    <div className="px-5 py-4 border-b border-admin-border flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-white">Recent Cases</h2>
                        <Link
                            href="/admin/cases"
                            className="text-xs text-accent hover:text-admin-accent-hover transition-colors flex items-center gap-1"
                        >
                            View all <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-admin-border">
                        {recentCases.length === 0 ? (
                            <div className="px-5 py-8 text-center text-admin-muted text-sm">
                                No cases yet. Create your first case.
                            </div>
                        ) : (
                            recentCases.map((c) => (
                                <Link
                                    key={c.id}
                                    href={`/admin/cases/${c.caseId}`}
                                    className="flex items-center justify-between px-5 py-3.5 hover:bg-admin-surface-hover transition-colors group"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono text-admin-muted">
                                                {c.caseId}
                                            </span>
                                            <StatusBadge status={c.status} />
                                        </div>
                                        <p className="text-sm text-white mt-1 truncate group-hover:text-accent transition-colors">
                                            {c.title}
                                        </p>
                                        <p className="text-xs text-admin-muted mt-0.5">
                                            {c.clientName}
                                        </p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-admin-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-3" />
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Upcoming Hearings */}
                <div className="bg-admin-surface border border-admin-border rounded-xl">
                    <div className="px-5 py-4 border-b border-admin-border">
                        <h2 className="text-sm font-semibold text-white">
                            Upcoming Hearings
                        </h2>
                    </div>
                    <div className="divide-y divide-admin-border">
                        {upcomingHearings.length === 0 ? (
                            <div className="px-5 py-8 text-center text-admin-muted text-sm">
                                No upcoming hearings scheduled.
                            </div>
                        ) : (
                            upcomingHearings.map((c) => (
                                <Link
                                    key={c.id}
                                    href={`/admin/cases/${c.caseId}`}
                                    className="flex items-center justify-between px-5 py-3.5 hover:bg-admin-surface-hover transition-colors group"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-white truncate group-hover:text-accent transition-colors">
                                            {c.title}
                                        </p>
                                        <p className="text-xs text-admin-muted mt-0.5">
                                            {c.clientName} • {c.caseId}
                                        </p>
                                    </div>
                                    <div className="text-right flex-shrink-0 ml-3">
                                        <p className="text-sm font-medium text-accent">
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
                                        <p className="text-xs text-admin-muted mt-0.5">
                                            {c.nextHearingDate
                                                ? `${Math.ceil(
                                                    (new Date(c.nextHearingDate).getTime() -
                                                        Date.now()) /
                                                    (1000 * 60 * 60 * 24)
                                                )} days`
                                                : ''}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
