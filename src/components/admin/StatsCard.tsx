import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    className?: string;
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    trendUp,
    className = '',
}: StatsCardProps) {
    return (
        <div
            className={`bg-admin-surface border border-admin-border rounded-xl p-5 hover:border-admin-border-light transition-all duration-200 ${className}`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-admin-muted font-medium">{title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{value}</p>
                    {trend && (
                        <p
                            className={`text-xs mt-2 ${trendUp ? 'text-emerald-400' : 'text-red-400'
                                }`}
                        >
                            {trend}
                        </p>
                    )}
                </div>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                </div>
            </div>
        </div>
    );
}
