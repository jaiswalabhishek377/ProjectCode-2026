import React from "react";
import { ShoppingBag, CreditCard, ArrowRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#05070c] border-t border-white/10 pt-16 pb-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Footer Navigation Columns */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
                    
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                <ShoppingBag className="w-4 h-4" />
                            </div>
                            <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                                NEXUS
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Discover curated premium electronics, limited edition footwear, timepieces, and streetwear apparel with express worldwide delivery.
                        </p>
                    </div>

                    {/* Shop Categories */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest">
                            Shop Categories
                        </h4>
                        <ul className="space-y-2 text-xs text-gray-400">
                            <li className="hover:text-white transition-colors cursor-pointer">Tech & Smart Electronics</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Designer Footwear</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Luxury Timepieces</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Streetwear Apparel</li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest">
                            Customer Care
                        </h4>
                        <ul className="space-y-2 text-xs text-gray-400">
                            <li className="hover:text-white transition-colors cursor-pointer">Order Tracking & History</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Shipping & Delivery Info</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Returns & Exchanges</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Privacy & Terms</li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest">
                            Stay Connected
                        </h4>
                        <p className="text-xs text-gray-400">
                            Subscribe to get early access to limited drops and private releases.
                        </p>
                        <div className="flex items-center gap-2">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full px-3.5 py-2.5 text-xs rounded-xl input-minimal"
                            />
                            <button className="p-2.5 rounded-xl btn-primary">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© 2026 NEXUS. All rights reserved.</p>
                    <div className="flex items-center gap-4 text-gray-400">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span>Stripe 256-Bit Encrypted</span>
                        <span>Visa / Mastercard / Apple Pay</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
