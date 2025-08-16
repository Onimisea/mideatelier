"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";

const buttonVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const DealSection = () => {
  return (
    <div className="relative z-10 flex items-center justify-center h-full bg-muted-gold py-28">
      <div className="w-[90%] md:w-[80%] lg3:w-[70%] lg:w-[60%] xl:w-[50%] max-w-[1440px] mx-auto relative flex flex-col md:flex-row items-center justify-center overflow-hidden gap-6">
        <div className="w-full sm:w-[80%] sm2:w-[70%] md2:w-[50%] flex flex-col items-center gap-12 md2:gap-6 md2:px-6 md2:py-12 ">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold font-playfair text-deep-navy">
              Deal Of The Month
            </h3>
            <p className="text-[#626262]">
              Designed for the modern woman who appreciates quality and style.
            </p>
            <motion.div variants={buttonVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center "
              >
                <Link
                  href="/#book-now"
                  className="bg-deep-navy hover:bg-muted-gold text-white hover:text-deep-navy hover:border hover:border-deepbg-deep-navy px-10 py-2 text-lg rounded-full shadow-lg transition-all duration-300 hover:shadow-deepbg-deep-navy/50 flex w-fit"
                >
                  Book Now
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="w-fit flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold text-deep-navy">
              Hurry, Before It&apos;s Too Late!
            </h3>
            <CountdownTimer hours={1} size="medium" />
          </div>
        </div>
        <div className="w-full hidden md2:flex md2:w-[50%] relative">
          <Image
            src="/gallery/corporate.jpg"
            alt="Mide's Atelier"
            width={560}
            height={700}
            className="w-auto max-h-[500px]"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default DealSection;
