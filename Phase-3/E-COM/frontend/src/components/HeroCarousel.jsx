import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import nikeairjordan from "../assets/airjordan1.jpg"
import boatwatch from "../assets/boatwatch.jpg"
import noiseheadphone from "../assets/noisehead.jpg"
const CAROUSEL_SLIDES = [
    {
        id: 1,
        tag: "2026 MERCHANDISE DROP",
        title: "STUDIO ACOUSTICS & WIRELESS SOUND",
        description: "Experience 40mm beryllium drivers, active noise cancellation, and 50-hour battery life engineered for audiophiles.",
        ctaText: "Shop Audio Drop",
        targetCategory: "tech",
        image: noiseheadphone,
        productName: "NEXUS ANC Pro Studio Headphones",
        price: "$2299.99"
    },
    {
        id: 2,
        tag: "LIMITED EDITION HOROLOGY",
        title: "PRECISION AUTOMATIC CHRONOGRAPHS",
        description: "Crafted with sapphire crystal glass, 316L stainless steel case, and a Japanese 24-jewel automatic movement.",
        ctaText: "Explore Timepieces",
        targetCategory: "watches",
        image: boatwatch,
        productName: "Stealth Automatic Black Chronograph",
        price: "$1199.00"
    },
    {
        id: 3,
        tag: "FOOTWEAR INNOVATION",
        title: "AEROGLIDE CARBON SNEAKERS",
        description: "Engineered with carbon fiber plate propulsion, breathable PrimeKnit uppers, and ultra-lightweight cushioning.",
        ctaText: "Shop Footwear",
        targetCategory: "footwear",
        image: nikeairjordan,
        productName: "AeroGlide Stealth Carbon Sneakers",
        price: "$4999.00"
    },
];

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    };

    const currentSlide = CAROUSEL_SLIDES[currentIndex];

    return (
        <div className="relative rounded-3xl bg-[#0e0e11] overflow-hidden border border-[#27272a] shadow-2xl">
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="p-8 sm:p-14"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                        
                        {/* Left Content Column */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold tracking-widest uppercase">
                                <Flame className="w-3.5 h-3.5 fill-zinc-300" />
                                <span>{currentSlide.tag}</span>
                            </div>

                            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]">
                                {currentSlide.title}
                            </h1>

                            <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
                                {currentSlide.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <a 
                                    href={`/category/${currentSlide.targetCategory}`} 
                                    className="px-7 py-3.5 btn-primary text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                                >
                                    <span>{currentSlide.ctaText}</span>
                                    <ArrowRight className="w-4 h-4 text-black" />
                                </a>
                            </div>
                        </div>

                        {/* Right Fixed Showcase Product Image Card */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative rounded-2xl overflow-hidden border border-[#27272a] shadow-2xl group bg-[#000000]">
                                <img 
                                    src={currentSlide.image} 
                                    alt={currentSlide.productName}
                                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0e0e11]/90 backdrop-blur-md border border-[#27272a] flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Spotlight Item</span>
                                        <h4 className="text-sm font-bold text-white line-clamp-1">{currentSlide.productName}</h4>
                                    </div>
                                    <span className="text-sm font-extrabold text-white">{currentSlide.price}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrow Controls */}
            <div className="absolute bottom-6 right-8 z-20 flex items-center gap-3">
                <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl bg-[#000000]/80 border border-[#27272a] text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                    title="Previous Slide"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                
                {/* Dots Indicators */}
                <div className="flex items-center gap-1.5 px-2">
                    {CAROUSEL_SLIDES.map((slide, idx) => (
                        <button
                            key={slide.id}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                                currentIndex === idx ? "w-6 bg-white" : "w-2 bg-zinc-700"
                            }`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="p-2.5 rounded-xl bg-[#000000]/80 border border-[#27272a] text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                    title="Next Slide"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

        </div>
    );
};

export default HeroCarousel;
