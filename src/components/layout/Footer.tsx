import Link from "next/link";
import { Scale, Mail, MapPin, Phone, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary border-t border-white/5 pt-16 pb-8 text-gray-400">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Column 1: Identity */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Scale className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                        <div className="flex flex-col">
                            <span className="text-xl font-serif font-bold tracking-wide text-white">IBIZLAW</span>
                            <span className="text-[0.6rem] uppercase tracking-[0.2em]">Legal & Advisory</span>
                        </div>
                    </Link>
                    <p className="text-sm leading-relaxed">
                        A full-service law practice dedicated to providing premium legal counsel with integrity and precision.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-white font-serif text-lg">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
                        <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                        <li><Link href="/practice-areas" className="hover:text-accent transition-colors">Practice Areas</Link></li>
                        <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
                        <li><Link href="/disclaimer" className="hover:text-accent transition-colors">Disclaimer</Link></li>
                    </ul>
                </div>

                {/* Column 3: Contact */}
                <div className="space-y-4">
                    <h3 className="text-white font-serif text-lg">Contact Us</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-accent shrink-0" />
                            <span>Bengaluru, Karnataka, India</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-accent shrink-0" />
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-accent shrink-0" />
                            <span>contact@ibizlaw.com</span>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Newsletter/Updates */}
                <div className="space-y-4">
                    <h3 className="text-white font-serif text-lg">Stay Informed</h3>
                    <p className="text-sm">Subscribe to our newsletter for legal updates.</p>
                    <form className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="px-4 py-2 bg-white/5 border border-white/10 focus:border-accent outline-none rounded-sm text-sm"
                        />
                        <button className="px-4 py-2 bg-accent text-white font-semibold uppercase tracking-wider text-xs hover:bg-accent/80 transition-colors rounded-sm">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs tracking-wider">
                <p>&copy; {new Date().getFullYear()} iBizLaw. All rights reserved. | <Link href="/privacy-policy" className="hover:text-accent">Privacy Policy</Link></p>
            </div>
        </footer>
    );
}
