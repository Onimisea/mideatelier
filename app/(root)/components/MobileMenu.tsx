"use client";

import { X } from "lucide-react";
import { RiWhatsappFill, RiInstagramFill, RiTiktokFill } from "react-icons/ri";

import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store";
import BookNow from "./BookNow";

export default function MobileMenu() {
  const { isMobileNavOpen, setMobileNavOpen } = useAppStore();

  // const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileNavOpen]);

  // Close mobile menu and collections dropdown when viewport is md and above
  useEffect(() => {
    const handleResize = () => {
      // Check if viewport is md and above (768px)
      if (window.innerWidth >= 768) {
        setMobileNavOpen(false);
        // setIsCollectionsOpen(false);
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
  }, [isMobileNavOpen, setMobileNavOpen]);

  // const toggleCollections = () => {
  //   setIsCollectionsOpen(!isCollectionsOpen);
  // };

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

  // const dropdownVariants = {
  //   hidden: {
  //     opacity: 0,
  //     height: 0,
  //     y: -20,
  //   },
  //   visible: {
  //     opacity: 1,
  //     height: "auto",
  //     y: 0,
  //     transition: {
  //       type: "spring" as const,
  //       damping: 25,
  //       stiffness: 300,
  //       staggerChildren: 0.1,
  //       delayChildren: 0.1,
  //     },
  //   },
  //   exit: {
  //     opacity: 0,
  //     height: 0,
  //     y: -20,
  //     transition: {
  //       duration: 0.3,
  //       staggerChildren: 0.05,
  //       staggerDirection: -1,
  //     },
  //   },
  // };

  // const dropdownItemVariants = {
  //   hidden: {
  //     x: -20,
  //     opacity: 0,
  //     scale: 0.9,
  //   },
  //   visible: {
  //     x: 0,
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       type: "spring" as const,
  //       damping: 20,
  //       stiffness: 300,
  //     },
  //   },
  //   exit: {
  //     x: 20,
  //     opacity: 0,
  //     scale: 0.9,
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  // };

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
      {isMobileNavOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={() => setMobileNavOpen(false)}
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
                onClick={() => setMobileNavOpen(false)}
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
                    <Link
                      href="/"
                      className="group relative overflow-hidden text-muted-gold hover:text-burnt-orange duration-300 transition-all hover:font-semibold"
                    >
                      Home
                    </Link>
                  </motion.div>

                  {["Gallery", "Login", "Register"].map((item) => (
                    <motion.div key={item} variants={navItemVariants}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="group relative overflow-hidden text-muted-gold hover:text-burnt-orange duration-300 transition-all hover:font-semibold"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mb-6">
                  <BookNow
                    triggerButtonClassName="bg-burnt-orange hover:bg-muted-gold text-white hover:text-deep-navy px-10 py-6 text-lg rounded-full shadow-lg transition-all duration-300 hover:shadow-burnt-orange/70 gap-1"
                    firstText="Book"
                    firstTextClassName=""
                    secondText="Now"
                    secondTextClassName=""
                    thirdText=""
                    thirdTextClassName=""
                  />
                </div>

                {/* Social Media Icons */}
                <motion.div
                  className="flex space-x-4 mb-4"
                  variants={socialVariants}
                >
                  {[
                    { Icon: RiInstagramFill, href: "#" },
                    { Icon: RiTiktokFill, href: "#" },
                    {
                      Icon: RiWhatsappFill,
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
