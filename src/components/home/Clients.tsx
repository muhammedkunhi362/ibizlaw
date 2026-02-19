"use client";

import { motion } from "framer-motion";

const clients = [
    "TechFrontiers", "Global Synergy", "Apex Holdings", "Vanguard Corp", "Horizon Legal", "Quantum Inc"
];

export default function Clients() {
    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {clients.map((client, index) => (
                    <motion.span
                        key={client}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-xl md:text-2xl font-serif font-bold text-gray-400 uppercase tracking-widest cursor-default hover:text-primary transition-colors"
                    >
                        {client}
                    </motion.span>
                ))}
            </div>
        </section>
    );
}
