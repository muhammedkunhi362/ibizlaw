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
    X,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/cases', label: 'All Cases', icon: FolderOpen },
    { href: '/admin/cases/new', label: 'New Case', icon: Plus },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        if (onClose) {
            onClose();
        }
    }, [pathname, onClose]);

    return (
        <>
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 bg-admin-surface border-r border-admin-border flex flex-col transition-all duration-300 ease-in-out
                    lg:static lg:translate-x-0 lg:h-screen
                    ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
                    ${collapsed ? 'lg:w-[72px]' : 'lg:w-64'}
                    w-64
                `}
            >
                {/* Logo */}
                <div className="p-4 border-b border-admin-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-admin-accent-hover flex items-center justify-center flex-shrink-0">
                            <Scale className="w-5 h-5 text-white" />
                        </div>
                        {(!collapsed || isOpen) && (
                            <div className={`overflow-hidden ${collapsed && !isOpen ? 'lg:hidden' : ''}`}>
                                <h1 className="text-sm font-bold text-white tracking-wide">iBizLaw</h1>
                                <p className="text-[10px] text-admin-muted uppercase tracking-widest">
                                    Case Manager
                                </p>
                            </div>
                        )}
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1 text-admin-muted hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
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
                                title={collapsed && !isOpen ? item.label : undefined}
                            >
                                <Icon
                                    className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-accent' : 'text-admin-muted group-hover:text-white'
                                        }`}
                                />
                                {(!collapsed || isOpen) && (
                                    <span className={collapsed && !isOpen ? 'lg:hidden' : ''}>
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom section */}
                <div className="p-3 border-t border-admin-border space-y-1">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-admin-muted hover:text-white hover:bg-admin-surface-hover transition-all duration-200 w-full"
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
                        title={collapsed && !isOpen ? 'Sign Out' : undefined}
                    >
                        <LogOut className="w-[18px] h-[18px]" />
                        {(!collapsed || isOpen) && (
                            <span className={collapsed && !isOpen ? 'lg:hidden' : ''}>
                                Sign Out
                            </span>
                        )}
                    </button>
                </div>
            </aside>
        </>
    );
}
