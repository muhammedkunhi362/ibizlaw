"use client";

import { motion } from "framer-motion";
import { Gavel, Scale, FileCheck, Award } from "lucide-react";

const stats = [
    { label: "Cases Won", value: "500+", icon: Gavel },
    { label: "Recovered in Settlements", value: "$45M+", icon: Scale },
    { label: "Corporate Clients", value: "120+", icon: FileCheck },
    { label: "Years of Experience", value: "25+", icon: Award },
];

export default function Stats() {
    return (
        <section className="py-20 bg-primary border-y border-white/5 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 p-12 opacity-5">
                <Scale className="w-96 h-96 text-white" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-accent uppercase tracking-[0.2em] text-sm font-bold mb-3">Our Results</h2>
                    <h3 className="text-3xl md:text-4xl font-serif text-white">Verdicts & Settlements</h3>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="p-4 rounded-full bg-white/5 group-hover:bg-accent/20 transition-colors">
                                    <stat.icon className="w-8 h-8 text-accent" />
                                </div>
                            </div>
                            <h4 className="text-4xl md:text-5xl font-serif text-white font-bold mb-2">{stat.value}</h4>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
