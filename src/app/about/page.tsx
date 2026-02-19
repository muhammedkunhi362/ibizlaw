"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="pt-24 pb-16 bg-primary min-h-screen text-white">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mb-16"
                >
                    <h1 className="text-5xl font-serif text-white mb-6">Our Philosophy</h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Founded on the principles of integrity, excellence, and strategic foresight, iBizLaw has established itself as a cornerstone of legal advocacy in Bengaluru.
                    </p>
                </motion.div>

                {/* Story Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="aspect-video bg-white/5 rounded-lg overflow-hidden relative border border-white/10">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500 uppercase tracking-widest text-sm">
                                Office Interior / Heritage Image
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-gray-400 leading-relaxed text-lg"
                    >
                        <h2 className="text-3xl font-serif text-white">A Heritage of Excellence</h2>
                        <p>
                            With roots deeply embedded in the legal traditions of India, we bring a modern approach to complex legal challenges. Our team is composed of seasoned advocates who understand both the letter of the law and the nuances of the courtroom.
                        </p>
                        <p>
                            We believe that every client deserves not just representation, but a partnership that prioritizes their long-term success. Whether it&apos;s high-stakes litigation or intricate corporate restructuring, our commitment remains absolute.
                        </p>
                    </motion.div>
                </div>

                {/* Team Section Placeholder */}
                <div className="mb-16">
                    <h2 className="text-3xl font-serif text-white mb-8 text-center">Leadership</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/5 p-8 rounded-lg text-center group hover:bg-white/10 hover:shadow-lg transition-all border border-white/5 cursor-pointer">
                                <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full mb-4 group-hover:bg-accent transition-colors" />
                                <h3 className="text-xl font-serif text-white">Partner Name</h3>
                                <p className="text-accent text-sm uppercase tracking-wider">Senior Advocate</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
