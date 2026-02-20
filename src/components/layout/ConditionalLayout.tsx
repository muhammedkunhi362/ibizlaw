'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DisclaimerModal from '@/components/ui/DisclaimerModal';

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <div className="bg-primary text-primary-foreground selection:bg-accent selection:text-accent-foreground flex flex-col min-h-screen">
            <DisclaimerModal />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
