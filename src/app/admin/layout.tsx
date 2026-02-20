import type { Metadata } from 'next';
import AuthProvider from '@/components/admin/AuthProvider';
import AdminLayoutContent from '@/components/admin/AdminLayoutContent';
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
            <AdminLayoutContent>
                {children}
            </AdminLayoutContent>
            <ToastContainer />
        </AuthProvider>
    );
}
