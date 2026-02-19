"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary">
            {/* Background with Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-primary to-black opacity-80" />
            <div className="absolute inset-0 bg-black/40" /> {/* additional darken */}

            <div className="container relative z-10 px-6 mx-auto text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <h2 className="text-accent uppercase tracking-[0.2em] text-sm md:text-base mb-4 font-bold">
                        Bengaluru&apos;s Premier Corporate Law Firm
                    </h2>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-8">
                        Guiding Litigation & <br />
                        <span className="text-gray-300">Corporate Strategy.</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                        A full-service legal practice dedicated to aggressive representation and strategic counsel. We merge traditional advocacy with modern business solutions.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4">
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-accent text-white font-semibold uppercase tracking-wider text-sm hover:bg-white hover:text-primary transition-all duration-300 rounded-sm flex items-center justify-center gap-2 group"
                        >
                            Consult Us
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/practice-areas"
                            className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold uppercase tracking-wider text-sm hover:border-accent hover:text-accent transition-all duration-300 rounded-sm flex items-center justify-center"
                        >
                            Our Practice
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
