"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { RiWhatsappFill, RiInstagramFill, RiTiktokFill } from "react-icons/ri";

const Footer = () => {
  const containerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <footer className="w-full bg-deep-navy py-12">
      <div className="w-[90%] container mx-auto relative flex flex-col items-center justify-center gap-8 my-4">
        <motion.div
          className="w-full flex flex-wrap justify-between gap-8 lg:gap-12"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={itemVariants} className="space-y-4 md:w-[30%] ">
            <h3 className="text-2xl font-playfair font-bold text-muted-gold">
              Mide&apos;s Atelier
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Mide&apos;s Atelier crafts elegant, Afrocentric fashion—from
              bridal gowns to corporate, ready-to-wear, and couture—designed for
              bold, refined women who lead with grace and style.
            </p>
            <div className="flex space-x-5 pt-2">
              <motion.a
                href="#"
                className="p-2 border border-muted-gold text-muted-gold hover:bg-muted-gold/20 hover:text-white rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiWhatsappFill className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#"
                className="p-2 border border-muted-gold text-muted-gold hover:bg-muted-gold/20 hover:text-white rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiInstagramFill className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#"
                className="p-2 border border-muted-gold text-muted-gold hover:bg-muted-gold/20 hover:text-white rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiTiktokFill className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-4 md:w-[25%]"
          >
            <h4 className="text-lg font-semibold text-muted-gold mb-6">
              Services
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-muted-gold rounded-full mr-3 flex-shrink-0"></span>
                Bridal Services
              </li>
              <li className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-muted-gold rounded-full mr-3 flex-shrink-0"></span>
                Bespoke Fashion & Couture
              </li>
              <li className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-muted-gold rounded-full mr-3 flex-shrink-0"></span>
                Ready-to-Wear Collections
              </li>
              <li className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-muted-gold rounded-full mr-3 flex-shrink-0"></span>
                Corporate & Power Dressing
              </li>
              <li className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-muted-gold rounded-full mr-3 flex-shrink-0"></span>
                Styling & Image Consulting
              </li>
              <li className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-muted-gold rounded-full mr-3 flex-shrink-0"></span>
                Alterations & Restyling
              </li>
              <li className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center">
                <span className="w-2 h-2 bg-muted-gold rounded-full mr-3 flex-shrink-0"></span>
                Cultural & Heritage Design
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-4 md:w-[25%]"
          >
            <h4 className="text-lg font-semibold text-muted-gold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-muted-gold mt-1 flex-shrink-0" />
                <p className="text-white text-sm">
                  123 Creative Street Lagos, Nigeria
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-gold flex-shrink-0" />
                <a
                  href="tel:+2348063116588"
                  className="text-white hover:text-muted-gold transition-colors duration-300 text-sm"
                >
                  +234 806 311 6588
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-gold flex-shrink-0" />
                <a
                  href="mailto:hello@midesatelier.com"
                  className="text-white hover:text-muted-gold transition-colors duration-300 text-sm"
                >
                  hello@midesatelier.com
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <Separator className="bg-muted-gold" />

        <p className="text-center text-[min(10vw,16px)] text-white">
          &copy; {new Date().getFullYear()} Mide&apos;s Atelier All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
