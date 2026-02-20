import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export const metadata: Metadata = {
    title: "iBizLaw | Corporate Law Firm",
    description: "Bengaluru-based full-service law practice specializing in litigation and corporate advisory.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(
                "min-h-screen font-sans antialiased"
            )}>
                <ConditionalLayout>{children}</ConditionalLayout>
            </body>
        </html>
    );
}
