"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations";

const Hero = () => {
  return (
    <section className="relative min-h-[auto] sm:min-h-[75vh] w-full flex items-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-4 sm:py-10 lg:py-16">
      {/* Sketched decorative marks */}
      <svg
        className="absolute top-16 right-12 w-10 sm:w-16 h-10 sm:h-16 text-gold-400 opacity-60 pointer-events-none"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 5 L27 20 L35 8 L28 21 L40 18 L29 23 L42 28 L28 25 L35 38 L26 27 L25 42 L24 27 L15 38 L22 25 L8 28 L21 23 L10 18 L22 21 L15 8 L23 20 Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.15"
        />
      </svg>
      <svg
        className="absolute bottom-24 left-16 w-8 sm:w-10 h-8 sm:h-10 text-rose-300 opacity-50 pointer-events-none"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 2 L30 18 L47 18 L33 28 L38 45 L25 35 L12 45 L17 28 L3 18 L20 18 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.1"
        />
      </svg>
      <svg
        className="absolute top-1/3 right-1/4 w-8 h-8 text-sage-400 opacity-40 pointer-events-none"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 3 L17 12 L26 12 L19 18 L21 27 L15 22 L9 27 L11 18 L4 12 L13 12 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-1/3 right-20 w-6 h-6 text-steel-300 opacity-50 pointer-events-none"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="10"
          cy="10"
          r="3"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M10 2 L10 6 M10 14 L10 18 M2 10 L6 10 M14 10 L18 10"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute top-2/3 left-1/3 w-12 h-12 text-gold-400 opacity-30 pointer-events-none"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 5 L22 16 L33 10 L24 18 L35 20 L24 22 L33 30 L22 24 L20 35 L18 24 L7 30 L16 22 L5 20 L16 18 L7 10 L18 16 Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="max-w-7xl mx-auto w-full sm:w-[90%] lg:w-[85%] xl:w-[75%] flex flex-col lg:flex-row items-center lg:items-center gap-3 sm:gap-6">
        {/* Left - Heading & Subtitle */}
        <div className="relative z-10 flex-1 max-w-3xl text-center lg:text-left">
          <FadeIn delay={0.25}>
            <div className="flex flex-col justify-center">
              <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[4rem] 2xl:text-[4.5rem] font-bold tracking-tight text-steel-800 leading-[1.1] mb-2 sm:mb-5">
                You don&apos;t have to face it alone.
              </h1>
              <p className="text-sm sm:text-lg lg:text-lg text-steel-500 leading-relaxed max-w-lg pb-2 sm:pb-3">
                Your digital retreat. A calm space to explore, share, and find
                comfort in the journey of mental wellness.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
              <Link href="/Information">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative font-journal text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 text-steel-700"
                >
                  <img
                    src="/scribble-btn.svg"
                    alt=""
                    className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none"
                    aria-hidden="true"
                  />
                  <span className="relative z-10">Explore Resources</span>
                </motion.button>
              </Link>
              <Link href="/journal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative font-journal text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 text-steel-700"
                >
                  <img
                    src="/scribble-btn.svg"
                    alt=""
                    className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] pointer-events-none"
                    aria-hidden="true"
                  />
                  <span className="relative z-10">Start Journaling</span>
                </motion.button>
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Right - Illustration */}
        <div className="flex flex-shrink-0 items-center justify-center">
          <FadeIn delay={0.35}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/Contemplating-bro.svg"
                alt="Person contemplating"
                width={600}
                height={600}
                className="w-[200px] sm:w-[280px] lg:w-[340px] xl:w-[400px] 2xl:w-[440px] h-auto"
                priority
              />
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
