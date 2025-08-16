"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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

// Utility: Fisher–Yates shuffle
const shuffleArray = (array: number[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const CollectionSection = () => {
  

  const cards = useMemo(() => {
    return [
      {
        id: 1,
        height: "h-[700px]",
        img: "/gallery/bridal.jpg",
        title: "Bridal",
        description:
          "Custom-designed bridal gowns blending heritage, elegance, and modern femininity.",
      },
      {
        id: 2,
        height: "h-[500px]",
        img: "/gallery/corporate.jpg",
        title: "Corporate",
        description:
          "Powerful, tailored pieces crafted for women who lead with style and confidence.",
      },
      {
        id: 3,
        height: "h-[500px]",
        img: "/gallery/bespoke.WEBP",
        title: "Bespoke",
        description:
          "One-of-a-kind couture made to measure for your most important moments.",
      },
      {
        id: 4,
        height: "h-[700px]",
        img: "/gallery/ready2wear.JPG",
        title: "Ready To Wear",
        description:
          "Effortless Afrocentric fashion designed for everyday elegance and ease.",
      },
      {
        id: 5,
        height: "h-[700px]",
        img: "/gallery/corporate2.PNG",
        title: "Corporate",
        description:
          "Timeless ready-to-wear pieces that merge sophistication with cultural soul.",
      },
      {
        id: 6,
        height: "h-[500px]",
        img: "/gallery/bespoke4.JPG",
        title: "Bespoke",
        description:
          "Luxurious garments tailored from concept to stitch for standout occasions.",
      },
    ];
  }, []);


  const [shuffledOrder, setShuffledOrder] = useState<number[]>(
    cards.map((_, i) => i)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newOrder = shuffleArray(cards.map((_, i) => i));
      setShuffledOrder(newOrder);
    }, 15000);

    return () => clearInterval(interval);
  }, [cards]);

  const rotatedCards = shuffledOrder.map((i) => cards[i]);

  return (
    <div className="w-full bg-[#f5f5f5] py-28" id="gallery">
      <div className="w-[90%] container mx-auto relative flex flex-col items-center justify-center gap-8">
        <h2 className="font-playfair text-4xl">
          <span className="text-deep-navy font-semibold">Our</span>{" "}
          <span className="text-burnt-orange font-semibold">Gallery</span>
        </h2>
        <motion.p
          className="sm:text-lg text-deep-navy max-w-4xl mx-auto leading-relaxed font-light text-center"
          variants={textVariants}
        >
          Discover Afrocentric elegance and modern femininity—crafted for every
          moment, from bridal to boardroom. Each piece blends timeless design
          with rich textures, tailored to empower and inspire.
        </motion.p>

        <div className="columns-1 sm3:columns-2 lg:columns-3 gap-8 space-y-8 mt-10 relative w-full">
          {rotatedCards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                layout: {
                  duration: 1.5,
                  ease: [0.23, 1, 0.32, 1],
                },
                opacity: { duration: 0.8, ease: "easeInOut" },
                scale: { duration: 0.8, ease: "easeInOut" },
                y: { duration: 0.8, ease: "easeOut" },
              }}
              whileHover={{
                scale: 1.05,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
              className="break-inside-avoid rounded-lg shadow-md overflow-hidden cursor-pointer relative mb-8"
            >
              <div className={`${card.height} relative overflow-hidden`}>
                <Image
                  src={card.img}
                  alt={card.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6">
                  <h3 className="font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-sm">{card.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;
