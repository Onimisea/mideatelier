
"use client";

import { Button, NavLink } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useIsScrolled } from "@/stores/mide.store";

export function NavMenu({
  isScrolled: isScrolledProp,
}: {
  isScrolled?: boolean;
}) {
  const isScrolledStore = useIsScrolled();
  const isScrolled =
    typeof isScrolledProp === "boolean" ? isScrolledProp : isScrolledStore;

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

  const linkClass = isScrolled
    ? "text-muted-gold hover:text-[#fafafa]"
    : "text-warm-beige hover:text-muted-gold";

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
          <NavLink
            href="/"
            label="Home"
            className={`${linkClass} transition-all duration-300`}
            component={Link}
          />
        </motion.div>

        <motion.div className="relative group" variants={itemVariants}>
          <Button className={`${linkClass} transition-all duration-300`}>
            <span className="flex items-center">
              Collections
              <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 duration-300 transition-all" />
            </span>
          </Button>

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-48 bg-muted-gold rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
            <div className="py-1">
              {["bridals", "corporate", "bespoke", "ready-to-wear"].map(
                (slug) => (
                  <Link
                    key={slug}
                    href={`/collections/${slug}`}
                    className="block px-4 py-2 text-sm text-deep-navy hover:bg-deep-navy hover:text-warm-beige"
                  >
                    {slug
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                )
              )}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <NavLink
            href="/lookbook"
            label="Lookbook"
            className={`${linkClass} transition-all duration-300`}
            component={Link}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <NavLink
            href="/about"
            label="About"
            className={`${linkClass} transition-all duration-300`}
            component={Link}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <NavLink
            href="/blog"
            label="Blog"
            className={`${linkClass} transition-all duration-300`}
            component={Link}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <NavLink
            href="/contact"
            label="Contact"
            className={`${linkClass} transition-all duration-300`}
            component={Link}
          />
        </motion.div>
      </motion.div>

      {/* Book Now CTA */}
      <motion.div variants={itemVariants}>
        <Link
          href="/book-now"
          className="bg-muted-gold hover:bg-burnt-orange text-deep-navy hover:text-white font-medium py-2 px-6 rounded-full transition-all duration-300"
        >
          Book Now
        </Link>
      </motion.div>
    </motion.nav>
  );
}
