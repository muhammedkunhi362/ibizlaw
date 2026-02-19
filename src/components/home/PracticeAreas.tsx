"use client";

import { motion } from "framer-motion";
import { Gavel, Briefcase, Scale, FileText, Globe, Building2 } from "lucide-react";

const practices = [
    {
        category: "Litigation",
        description: "Aggressive courtroom advocacy for complex disputes.",
        items: [
            { title: "Civil Litigation", icon: Scale },
            { title: "Criminal Defense", icon: Gavel },
            { title: "Commercial Disputes", icon: Building2 },
        ]
    },
    {
        category: "Non-Litigation",
        description: "Strategic advisory for business growth and compliance.",
        items: [
            { title: "Corporate Advisory", icon: Briefcase },
            { title: "Contract Drafting", icon: FileText },
            { title: "Global Compliance", icon: Globe },
        ]
    }
];

export default function PracticeAreas() {
    return (
        <section className="py-24 bg-secondary">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-accent uppercase tracking-widest text-sm font-bold mb-3">Our Expertise</h2>
                    <h3 className="text-4xl font-serif text-primary">Comprehensive Legal Solutions</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {practices.map((area, index) => (
                        <motion.div
                            key={area.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <h4 className="text-2xl font-serif text-primary mb-2">{area.category}</h4>
                            <p className="text-gray-500 mb-8">{area.description}</p>

                            <div className="space-y-6">
                                {area.items.map((item) => (
                                    <div key={item.title} className="flex items-center gap-4 group cursor-pointer">
                                        <div className="p-3 bg-secondary rounded-full text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-lg text-primary font-medium group-hover:text-accent transition-colors">
                                            {item.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
