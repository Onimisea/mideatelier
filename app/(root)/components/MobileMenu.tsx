"use client";

import { NavLink } from "@mantine/core";
import { ChevronDown, Instagram, Facebook, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobileNavOpen, useMobileNavClose } from "@/stores/mide.store";

export default function MobileMenu() {
  const isMobileMenuOpen = useMobileNavOpen();
  const closeMobileMenu = useMobileNavClose();
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu and collections dropdown when viewport is md and above
  useEffect(() => {
    const handleResize = () => {
      // Check if viewport is md and above (768px)
      if (window.innerWidth >= 768) {
        closeMobileMenu();
        setIsCollectionsOpen(false);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Check initial viewport size
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [closeMobileMenu]);

  const handleLinkClick = () => {
    closeMobileMenu();
    setIsCollectionsOpen(false);
  };

  const toggleCollections = () => {
    setIsCollectionsOpen(!isCollectionsOpen);
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const menuVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween" as const,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        type: "tween" as const,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
        when: "afterChildren",
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };

  const decorativeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.05,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
        delay: 0.3,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -45 },
    visible: {
      scale: 1,
      opacity: 0.05,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
        delay: 0.3,
        duration: 0.8,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      rotate: 45,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const navItemVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const dropdownItemVariants = {
    hidden: {
      x: -20,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      x: 20,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  };

  const socialVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
        staggerChildren: 0.1,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  const socialItemVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 300,
      },
    },
    exit: {
      scale: 0,
      rotate: 180,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="w-full h-full bg-gradient-to-br from-deep-navy via-chocolate-brown to-deep-navy relative overflow-hidden">
              {/* Close Button */}
              <motion.button
                onClick={closeMobileMenu}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-muted-gold/20 hover:bg-muted-gold/30 transition-all duration-300 group cursor-pointer"
                aria-label="Close mobile menu"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{
                  type: "spring" as const,
                  damping: 20,
                  stiffness: 300,
                  delay: 0.5,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4 text-muted-gold group-hover:text-warm-beige transition-colors duration-300" />
              </motion.button>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                <motion.div
                  className="absolute top-1/4 left-1/4 w-32 h-32 bg-muted-gold rounded-full blur-3xl"
                  variants={decorativeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-burnt-orange rounded-full blur-3xl"
                  variants={decorativeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ delay: 0.4 }}
                />
              </div>

              {/* Logo Watermark */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <span className="text-[6rem] font-playfair font-bold text-muted-gold">
                  MA
                </span>
              </motion.div>

              {/* Menu Content */}
              <motion.div
                className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-8"
                variants={navContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Navigation Links */}
                <nav className="flex flex-col items-center space-y-3 mb-6">
                  <motion.div variants={navItemVariants}>
                    <NavLink
                      component={Link}
                      href="/"
                      onClick={handleLinkClick}
                      className="group relative overflow-hidden"
                      label={
                        <motion.span
                          className="text-lg font-playfair font-light text-warm-beige group-hover:text-muted-gold transition-colors duration-500 tracking-wide"
                          whileHover={{ scale: 1.05 }}
                        >
                          Home
                        </motion.span>
                      }
                    />
                  </motion.div>

                  {/* Collections Dropdown */}
                  <motion.div
                    className="group relative"
                    variants={navItemVariants}
                  >
                    <motion.button
                      onClick={toggleCollections}
                      className="flex items-center space-x-2 group-hover:text-muted-gold transition-colors duration-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg font-playfair font-light text-warm-beige tracking-wide">
                        Collections
                      </span>
                      <motion.div
                        animate={{ rotate: isCollectionsOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-3 h-3 text-muted-gold" />
                      </motion.div>
                    </motion.button>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-muted-gold group-hover:w-full transition-all duration-700 ease-out"></div>

                    {/* Collections Submenu */}
                    <AnimatePresence>
                      {isCollectionsOpen && (
                        <motion.div
                          className="mt-2 space-y-1"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          {[
                            { href: "/collections/bridals", label: "Bridals" },
                            {
                              href: "/collections/corporate",
                              label: "Corporate",
                            },
                            { href: "/collections/bespoke", label: "Bespoke" },
                            {
                              href: "/collections/ready-to-wear",
                              label: "Ready To Wear",
                            },
                          ].map((item) => (
                            <motion.div
                              key={item.href}
                              variants={dropdownItemVariants}
                            >
                              <NavLink
                                component={Link}
                                href={item.href}
                                onClick={handleLinkClick}
                                className="block text-center group relative hover:bg-muted-gold/10 rounded-lg py-1 px-3 transition-all duration-300"
                                label={
                                  <motion.span
                                    className="text-sm font-light text-muted-gold group-hover:text-muted-gold transition-colors duration-300 tracking-wide group-hover:hover:text-white"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    {item.label}
                                  </motion.span>
                                }
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {["Lookbook", "About", "Blog", "Contact"].map((item) => (
                    <motion.div key={item} variants={navItemVariants}>
                      <NavLink
                        component={Link}
                        href={`/${item.toLowerCase()}`}
                        onClick={handleLinkClick}
                        className="group relative overflow-hidden"
                        label={
                          <motion.span
                            className="text-lg font-playfair font-light text-warm-beige group-hover:text-muted-gold transition-colors duration-500 tracking-wide"
                            whileHover={{ scale: 1.05 }}
                          >
                            {item}
                          </motion.span>
                        }
                      />
                    </motion.div>
                  ))}
                </nav>

                {/* CTA Button */}
                <Link
                  href="/book-now"
                  onClick={handleLinkClick}
                  className="group relative overflow-hidden bg-muted-gold hover:bg-burnt-orange text-deep-navy hover:text-white font-playfair font-medium py-2 px-5 rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl mb-6"
                >
                  <span className="relative z-10 text-sm tracking-wide">
                    Book Consultation
                  </span>
                  <div className="absolute inset-0 bg-burnt-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Link>

                {/* Social Media Icons */}
                <motion.div
                  className="flex space-x-4 mb-4"
                  variants={socialVariants}
                >
                  {[
                    { Icon: Instagram, href: "#" },
                    { Icon: Facebook, href: "#" },
                    {
                      Icon: () => (
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                        </svg>
                      ),
                      href: "#",
                    },
                  ].map(({ Icon, href }, index) => (
                    <motion.a
                      key={index}
                      href={href}
                      className="group relative p-2 rounded-full border border-muted-gold/30 hover:border-muted-gold transition-all duration-500 hover:bg-muted-gold/10"
                      variants={socialItemVariants}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-3 h-3 text-muted-gold group-hover:text-warm-beige transition-colors duration-300" />
                    </motion.a>
                  ))}
                </motion.div>

                {/* Elegant Tagline */}
                <motion.div
                  className="text-center"
                  variants={navItemVariants}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-muted-gold/70 font-light text-xs tracking-widest uppercase">
                    Luxurious Couture • Timeless Elegance
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
