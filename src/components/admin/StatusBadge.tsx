import { CaseStatus } from '@prisma/client';

const statusConfig: Record<
    CaseStatus,
    { label: string; className: string; dot: string }
> = {
    OPEN: {
        label: 'Open',
        className: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
        dot: 'bg-blue-400',
    },
    IN_PROGRESS: {
        label: 'In Progress',
        className: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
        dot: 'bg-amber-400',
    },
    HEARING_SCHEDULED: {
        label: 'Hearing Scheduled',
        className: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
        dot: 'bg-purple-400',
    },
    ADJOURNED: {
        label: 'Adjourned',
        className: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
        dot: 'bg-orange-400',
    },
    CLOSED: {
        label: 'Closed',
        className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
        dot: 'bg-emerald-400',
    },
};

export default function StatusBadge({ status }: { status: CaseStatus }) {
    const config = statusConfig[status];

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {config.label}
        </span>
    );
}

export { statusConfig };
