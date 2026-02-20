import type { Metadata } from 'next';
import AuthProvider from '@/components/admin/AuthProvider';
import Sidebar from '@/components/admin/Sidebar';
import ToastContainer from '@/components/admin/Toast';

export const metadata: Metadata = {
    title: 'Admin | iBizLaw Case Management',
    robots: { index: false, follow: false },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <div className="flex min-h-screen bg-admin-bg text-white">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                    <div className="p-6 lg:p-8">{children}</div>
                </main>
            </div>
            <ToastContainer />
        </AuthProvider>
    );
}
