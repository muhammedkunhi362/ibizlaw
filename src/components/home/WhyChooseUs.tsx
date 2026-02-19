"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Users } from "lucide-react";

const reasons = [
    {
        title: "Client-Centric",
        description: "We prioritize your business goals effectively.",
        icon: Users,
    },
    {
        title: "Proven Track Record",
        description: "A history of successful verdicts and settlements.",
        icon: Award,
    },
    {
        title: "Ethical Standards",
        description: "Unwavering commitment to integrity and transparency.",
        icon: ShieldCheck,
    },
    {
        title: "Timely Resolution",
        description: "Efficiency in handling complex legal matters.",
        icon: Clock,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-primary text-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-accent uppercase tracking-widest text-sm font-bold mb-3">Why iBizLaw</h2>
                        <h3 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                            A Legacy of Trust & <br /> <span className="text-gray-500">Legal Excellence.</span>
                        </h3>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            We don&apos;t just practice law; we partner with our clients to navigate the complexities of the legal landscape with confidence and clarity.
                        </p>
                        <button className="px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-white transition-all uppercase tracking-wider text-sm rounded-sm">
                            Learn More About Us
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors rounded-sm"
                            >
                                <reason.icon className="w-10 h-10 text-accent mb-4" />
                                <h4 className="text-xl font-serif mb-2">{reason.title}</h4>
                                <p className="text-gray-400 text-sm">{reason.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
