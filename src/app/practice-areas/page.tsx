"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const areas = [
    {
        title: "Litigation",
        items: [
            "Civil Disputes & Property Law",
            "Criminal Defense & Bail Matters",
            "Constitutional Writs & PILs",
            "Family & Matrimonial Law",
            "Consumer Protection",
            "Arbitration & Mediation"
        ]
    },
    {
        title: "Non-Litigation",
        items: [
            "Corporate Advisory & Structuring",
            "Mergers & Acquisitions",
            "Intellectual Property Rights",
            "Real Estate Due Diligence",
            "Labor & Employment Law",
            "Contract Drafting & Review"
        ]
    }
];

export default function PracticeAreasPage() {
    return (
        <div className="pt-24 pb-16 bg-primary min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h1 className="text-5xl font-serif text-white mb-6">Our Expertise</h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Comprehensive legal solutions tailored to the diverse needs of individuals, businesses, and institutions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {areas.map((division, idx) => (
                        <motion.div
                            key={division.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-white/5 rounded-lg p-10 shadow-sm border border-white/10 hover:border-accent/30 transition-colors"
                        >
                            <h2 className="text-3xl font-serif text-accent mb-8 border-b border-white/10 pb-4">
                                {division.title}
                            </h2>
                            <ul className="space-y-4">
                                {division.items.map((item) => (
                                    <li key={item} className="flex items-center gap-3 group text-lg text-gray-300 hover:text-accent transition-colors cursor-default">
                                        <ChevronRight className="w-5 h-5 text-accent/50 group-hover:text-accent" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
