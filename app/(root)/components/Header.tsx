"use client";

import Link from "next/link";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavMenu } from "./NavMenu";
import { Menu, X } from "lucide-react";

import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { isMobileNavOpen, setMobileNavOpen } = useAppStore();

  const headerVariants = {
    initial: {
      opacity: 0,
      y: -30,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const logoVariants = {
    initial: {
      scale: 0.9,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const navMenuVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const mobileButtonVariants = {
    initial: {
      scale: 0.9,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <motion.header
      className="absolute top-0 left-0 right-0 z-30 w-full h-[80px] flex items-center bg-transparent justify-center"
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div className="w-[90%] container mx-auto relative flex flex-col items-center justify-center">
        <motion.nav className="w-full flex items-center justify-between">
          <motion.div variants={logoVariants}>
            <Link href="/" className="focus:outline-none group">
              <motion.span
                className="text-4xl font-playfair font-bold text-muted-gold"
                whileHover={{
                  scale: 1.05,
                  color: "#F5E6D3",
                  transition: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1] as const,
                  },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: {
                    duration: 0.1,
                  },
                }}
              >
                MA
              </motion.span>
              <motion.div
                className="h-0.5 bg-muted-gold w-0 group-hover:w-full transition-all duration-500 ease-out"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </Link>
          </motion.div>

          <motion.div variants={navMenuVariants} className="hidden md:block">
            <NavMenu />
          </motion.div>

          <motion.div variants={mobileButtonVariants} className="md:hidden">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={() => setMobileNavOpen(!isMobileNavOpen)}
                className="text-muted-gold hover:text-white cursor-pointer transition-all duration-300 outline-none border-none bg-transparent hover:bg-muted-gold/10 rounded-full p-2"
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileNavOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1] as const,
                      }}
                    >
                      <X style={{ width: '30px', height: '30px' }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1] as const,
                      }}
                    >
                      <Menu style={{ width: '30px', height: '30px' }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.div>
        </motion.nav>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-muted-gold/20 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: [0.4, 0, 0.2, 1] as const,
        }}
      />
    </motion.header>
  );
};

export default Header;
