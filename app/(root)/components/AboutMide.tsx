"use client";


import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const textVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const AboutMide = () => {
  return (
    <div className="w-full bg-deep-navy flex items-center justify-center md:justify-between flex-col md:flex-row">
      <div className="w-full md:hidden lg:flex lg:w-[45%]">
        <Image
          src="/mide-new.jpg"
          alt="Mide's Atelier"
          width={560}
          height={700}
          className="w-full h-auto"
          priority
        />
      </div>
      <div className="py-20 w-[80%] md:mx-auto md:text-center lg:w-[50%] lg:mx-0 lg:text-left lg:py-0">
        <div className="lg:w-[90%] flex flex-col gap-12 ">
          <h2 className="font-playfair text-4xl text-white">
            About <span className="text-muted-gold font-semibold">Mide</span>
          </h2>

          <div className="flex flex-col gap-8 ">
            <motion.p
              className="sm:text-lg text-white/90  mx-auto leading-relaxed font-light "
              variants={textVariants}
            >
              Mide’s Atelier began in 2014 as a simple love for sewing—starting
              with cloth purses and personal pieces. As I wore my own designs,
              admiration from others turned into requests, revealing that this
              passion was more than a hobby—it was a calling waiting to unfold.
            </motion.p>

            <motion.p
              className="sm:text-lg text-white/90  mx-auto leading-relaxed font-light "
              variants={textVariants}
            >
              In 2021, I committed fully, refining my craft and sharing my work
              through a styled shoot. The response was incredible. By 2022,
              Mide’s Atelier became a thriving business. I registered the brand
              in 2023 and opened my walk-in store in 2025. Today, it stands as a
              symbol of elegance, heritage, and the beauty of purposeful
              creation.
            </motion.p>

            <motion.p
              className="text-xl text-muted-gold font-bold mx-auto leading-relaxed w-full"
              variants={textVariants}
            >
              Every stitch tells a story—and yours is next.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMide;
