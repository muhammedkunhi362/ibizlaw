"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale } from "lucide-react";

export default function DisclaimerModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasAgreed = localStorage.getItem("bci-disclaimer-agreed");
        if (!hasAgreed) {
            setIsOpen(true);
        }
    }, []);

    const handleAgree = () => {
        localStorage.setItem("bci-disclaimer-agreed", "true");
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                >
                    <div className="max-w-2xl w-full bg-primary border border-accent/20 p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden">
                        {/* Decorative decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-accent" />

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="p-4 bg-accent/10 rounded-full">
                                <Scale className="w-12 h-12 text-accent" />
                            </div>

                            <h2 className="text-3xl font-serif text-accent">Disclaimer</h2>

                            <div className="text-gray-300 space-y-4 text-sm md:text-base leading-relaxed text-justify">
                                <p>
                                    As per the rules of the Bar Council of India, advocates and law firms are not permitted to solicit work or advertise their services. By clicking explicitly on the &quot;I Agree&quot; button below, the user acknowledges the following:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-left">
                                    <li>There has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever from us or any of our members to solicit any work through this website.</li>
                                    <li>The user wishes to gain more information about us for his/her own information and use.</li>
                                    <li>The information about us is provided to the user on his/her specific request.</li>
                                </ul>
                                <p>
                                    The information provided under this website is solely available at your request for informational purposes only and should not be interpreted as soliciting or advertisement.
                                </p>
                            </div>

                            <button
                                onClick={handleAgree}
                                className="mt-8 px-8 py-3 bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 font-semibold tracking-wider uppercase text-sm rounded-sm"
                            >
                                I Agree
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
