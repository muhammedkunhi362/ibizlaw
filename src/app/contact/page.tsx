"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="pt-24 pb-16 bg-primary min-h-screen">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-white"
                    >
                        <h1 className="text-5xl font-serif mb-8">Get in Touch</h1>
                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                            We invite you to schedule a consultation to discuss your legal requirements. Please verify our disclaimer before proceeding.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-white/5 rounded-full border border-white/10">
                                    <MapPin className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif mb-2">Office Location</h3>
                                    <p className="text-gray-400">
                                        #123, Prestige Tower, MG Road,<br />
                                        Bengaluru, Karnataka - 560001
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-white/5 rounded-full border border-white/10">
                                    <Phone className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif mb-2">Phone</h3>
                                    <p className="text-gray-400">+91 98765 43210</p>
                                    <p className="text-gray-400 text-sm mt-1">(Mon-Sat, 10 AM - 7 PM)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-white/5 rounded-full border border-white/10">
                                    <Mail className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif mb-2">Email</h3>
                                    <p className="text-gray-400">contact@ibizlaw.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 md:p-12 rounded-lg"
                    >
                        <h2 className="text-2xl font-serif text-primary mb-6">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Name</label>
                                    <input type="text" className="w-full bg-secondary border border-gray-200 p-3 outline-none focus:border-accent transition-colors text-primary" placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Phone</label>
                                    <input type="tel" className="w-full bg-secondary border border-gray-200 p-3 outline-none focus:border-accent transition-colors text-primary" placeholder="Your Phone" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Email</label>
                                <input type="email" className="w-full bg-secondary border border-gray-200 p-3 outline-none focus:border-accent transition-colors text-primary" placeholder="Your Email" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Message</label>
                                <textarea rows={4} className="w-full bg-secondary border border-gray-200 p-3 outline-none focus:border-accent transition-colors text-primary" placeholder="How can we help you?"></textarea>
                            </div>

                            <button className="w-full bg-primary text-white py-4 font-semibold uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center gap-2">
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
