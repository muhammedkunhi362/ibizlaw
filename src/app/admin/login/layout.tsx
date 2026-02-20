import type { Metadata } from 'next';
import AuthProvider from '@/components/admin/AuthProvider';

export const metadata: Metadata = {
    title: 'Login | iBizLaw Admin',
    robots: { index: false, follow: false },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-admin-bg text-white">
                {children}
            </div>
        </AuthProvider>
    );
}
