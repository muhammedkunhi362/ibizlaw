import type { Metadata } from "next";
// import { Inter, Playfair_Display } from "next/font/google"; // Import fonts
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DisclaimerModal from "@/components/ui/DisclaimerModal";

// const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
// const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

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
                "min-h-screen bg-primary font-sans antialiased text-primary-foreground selection:bg-accent selection:text-accent-foreground flex flex-col"
            )}>
                <DisclaimerModal />
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
