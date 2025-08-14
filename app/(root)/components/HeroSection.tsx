"use client";

import React from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const containerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1] as const,
        staggerChildren: 0.2,
      },
    },
  };

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

  return (
    <motion.section
      className="relative w-full h-screen overflow-hidden top-0 left-0"
      variants={containerVariants}
      initial="initial"
      animate="animate" 
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/herovideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-deep-navy/80" />

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center w-[90%] max-w-4xl mx-auto flex flex-col gap-10 sm2:gap-12 md:gap-16 ">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white leading-tight flex justify-center flex-wrap"
            variants={textVariants}
          >
            Every <span className="block text-muted-gold mx-3">Stitch</span>
            Tells A<span className="block text-muted-gold ml-3">Story</span>
          </motion.h1>

          <motion.p
            className="sm:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed font-light"
            variants={textVariants}
          >
            Bespoke bridal gowns, powerful corporate wear, timeless
            ready-to-wear pieces, and high-fashion couture—each handcrafted to
            embody elegance, heritage, and refined femininity. Experience
            Afrocentric luxury designed for women who lead, love, and live
            boldly.
          </motion.p>

          <motion.div variants={buttonVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center"
            >
              <Link
                href="/#book-now"
                className="mt-6 bg-muted-gold hover:bg-transparent text-black hover:text-muted-gold hover:border hover:border-muted-gold px-10 py-4 text-lg rounded-full shadow-lg transition-all duration-300 hover:shadow-muted-gold/50 flex w-fit"
              >
                Book{" "}
                <span className="hidden sm:flex items-center mx-1">
                  Consultation
                </span>{" "}
                Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-gold/50 rounded-full flex justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-muted-gold/70 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
