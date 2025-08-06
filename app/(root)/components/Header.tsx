"use client";

import { Button } from "@mantine/core";
import Link from "next/link";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavMenu } from "./NavMenu";
import { Menu, X } from "lucide-react";

import { useMobileNavOpen, useMobileNavToggle } from "@/stores/mide.store";
import { useIsScrolled, useSetScrolled } from "@/stores/mide.store";

const Header = () => {
  const isMobileMenuOpen = useMobileNavOpen();
  const toggleMobileMenu = useMobileNavToggle();
  const isScrolled = useIsScrolled();
  const setIsScrolled = useSetScrolled();

  // Scroll detection for dynamic styling, update Zustand store
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsScrolled]);

  // Animation variants
  const headerVariants = {
    initial: {
      opacity: 0,
      y: -30, // slide from top
    },
    animate: {
      opacity: 1,
      y: 0, // back to natural position
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };
  

  const navContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  const backgroundVariants = {
    transparent: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
      boxShadow: "none",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    scrolled: {
      backgroundColor: "rgba(107, 70, 51, 0.95)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const innerContainerVariants = {
    transparent: {
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    scrolled: {
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-30 w-full h-[80px] flex items-center justify-center ${
        isScrolled ? "py-2" : "py-6"
      }`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        variants={backgroundVariants}
        animate={isScrolled ? "scrolled" : "transparent"}
      />

      <motion.div
        className="w-[90%] container mx-auto relative flex flex-col items-center justify-center "
        variants={innerContainerVariants}
        animate={isScrolled ? "scrolled" : "transparent"}
      >
        <motion.nav
          className="w-full flex items-center justify-between"
          variants={navContainerVariants}
        >
          {/* Logo */}
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
              {/* Elegant underline animation */}
              <motion.div
                className="h-0.5 bg-muted-gold w-0 group-hover:w-full transition-all duration-500 ease-out"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </Link>
          </motion.div>

          {/* Navigation Menu */}
          <motion.div variants={navMenuVariants} className="hidden md:block">
            <NavMenu isScrolled={isScrolled} />
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div variants={mobileButtonVariants} className="md:hidden">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={toggleMobileMenu}
                className="text-muted-gold hover:text-white cursor-pointer transition-all duration-300 outline-none border-none bg-transparent hover:bg-muted-gold/10 rounded-full p-2"
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
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
                      <X className="h-6 w-6" />
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
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.div>
        </motion.nav>
      </motion.div>

      {/* Decorative Elements */}
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

      {/* Subtle glow effect when scrolled */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-muted-gold/5 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1] as const,
        }}
      />
    </motion.header>
  );
};

export default Header;
