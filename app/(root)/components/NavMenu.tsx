"use client";

// import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiUser } from "react-icons/hi2";
// import { HiOutlineShoppingBag } from "react-icons/hi2";
// import { useAppStore } from "@/store";
// import { Button } from "@/components/ui/button";

export function NavMenu() {

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  // const linkClass = isScrolled
  //   ? ""
  //   : "text-warm-beige hover:text-muted-gold";



  return (
    <motion.nav
      className="flex items-center space-x-4 md2:space-x-6 md3:space-x-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="hidden md:flex items-center space-x-4 md2:space-x-6 md3:space-x-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className={`text-muted-gold hover:text-[#fafafa] transition-all duration-300`}
          >
            Home
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link
            href="/#gallery"
            className={`text-muted-gold hover:text-[#fafafa] transition-all duration-300`}
          >
            Gallery
          </Link>
        </motion.div>
      </motion.div>

      {/* Book Now CTA */}
      <motion.div variants={itemVariants}>
        <Link
          href="/#book-now"
          className="bg-muted-gold hover:bg-transparent text-black hover:text-muted-gold hover:border hover:border-muted-gold px-10 py-3 text-lg rounded-full shadow-lg transition-all duration-300 hover:shadow-muted-gold/50 "
        >
          Book Now
        </Link>
      </motion.div>
      {/* <HiOutlineShoppingBag className="text-muted-gold" size={21} /> */}
      <HiUser className="text-muted-gold" size={24} />
    </motion.nav>
  );
}
