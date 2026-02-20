'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    FolderOpen,
    Plus,
    LogOut,
    Scale,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/cases', label: 'All Cases', icon: FolderOpen },
    { href: '/admin/cases/new', label: 'New Case', icon: Plus },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`${collapsed ? 'w-[72px]' : 'w-64'
                } bg-admin-surface border-r border-admin-border flex flex-col transition-all duration-300 ease-in-out min-h-screen`}
        >
            {/* Logo */}
            <div className="p-4 border-b border-admin-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-admin-accent-hover flex items-center justify-center flex-shrink-0">
                    <Scale className="w-5 h-5 text-white" />
                </div>
                {!collapsed && (
                    <div className="overflow-hidden">
                        <h1 className="text-sm font-bold text-white tracking-wide">iBizLaw</h1>
                        <p className="text-[10px] text-admin-muted uppercase tracking-widest">
                            Case Manager
                        </p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href === '/admin/cases' && pathname.startsWith('/admin/cases') && !pathname.includes('/new'));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive
                                    ? 'bg-accent/15 text-accent border border-accent/20'
                                    : 'text-admin-muted hover:text-white hover:bg-admin-surface-hover'
                                }`}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon
                                className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-accent' : 'text-admin-muted group-hover:text-white'
                                    }`}
                            />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom section */}
            <div className="p-3 border-t border-admin-border space-y-1">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-admin-muted hover:text-white hover:bg-admin-surface-hover transition-all duration-200 w-full"
                >
                    {collapsed ? (
                        <ChevronRight className="w-[18px] h-[18px]" />
                    ) : (
                        <>
                            <ChevronLeft className="w-[18px] h-[18px]" />
                            <span>Collapse</span>
                        </>
                    )}
                </button>
                <button
                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 w-full"
                    title={collapsed ? 'Sign Out' : undefined}
                >
                    <LogOut className="w-[18px] h-[18px]" />
                    {!collapsed && <span>Sign Out</span>}
                </button>
            </div>
        </aside>
    );
}
