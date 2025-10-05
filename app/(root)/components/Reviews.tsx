"use client";

import React from "react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

// import required modules
import { Autoplay, FreeMode } from "swiper/modules";

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

const reviews = [
  {
    full_name: "Adesuwa Okafor",
    occupation: "Event Planner",
    work_or_business: "Golden Moments Events",
    image:
      "https://images.unsplash.com/photo-1617551307538-c9cdb9d71289?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    comment:
      "Mide’s Atelier made my bridal gown and it was everything I dreamed of — elegant and deeply personal.",
    status: "approved",
    created_at: "2025-03-15T10:32:00Z",
    updated_at: "2025-03-15T10:32:00Z",
  },
  {
    full_name: "Chiamaka Eze",
    occupation: "Corporate Executive",
    work_or_business: "Zenith Holdings",
    image:
      "https://images.unsplash.com/photo-1594737996820-af7654631790?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4,
    comment:
      "Their corporate collection gives me confidence and elegance in every meeting.",
    status: "approved",
    created_at: "2025-04-02T08:20:00Z",
    updated_at: "2025-04-02T08:20:00Z",
  },
  {
    full_name: "Lola Adebayo",
    occupation: "Photographer",
    work_or_business: "Lola Lens Studio",
    image:
      "https://plus.unsplash.com/premium_photo-1664867432842-16ae7a30aabd?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 3,
    comment:
      "I love the fabrics and the way they drape — a perfect blend of comfort and artistry.",
    status: "approved",
    created_at: "2025-06-10T15:45:00Z",
    updated_at: "2025-06-10T15:45:00Z",
  },
  {
    full_name: "Funmi Aluko",
    occupation: "Entrepreneur",
    work_or_business: "Maison Aluko Interiors",
    image:
      "https://images.unsplash.com/photo-1522512115668-c09775d6f424?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    comment:
      "My bespoke outfit was more than I imagined — personalized, cultural, and powerful.",
    status: "approved",
    created_at: "2025-07-18T12:00:00Z",
    updated_at: "2025-07-18T12:00:00Z",
  },
  {
    full_name: "Tosin Akinwale",
    occupation: "Makeup Artist",
    work_or_business: "Glam by Tosin",
    image:
      "https://images.unsplash.com/photo-1563132337-f159f484226c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4,
    comment:
      "From consultation to final fitting, their attention to detail is exceptional.",
    status: "approved",
    created_at: "2025-08-21T09:18:00Z",
    updated_at: "2025-08-21T09:18:00Z",
  },
];

const Reviews = () => {
  return (
    <div className="relative z-10 flex items-center justify-center h-full bg-muted-gold/80 py-28">
      <RiDoubleQuotesL
        size={120}
        className="absolute top-10 md:left-30 text-4xl text-burnt-orange opacity-50"
      />
      <RiDoubleQuotesR
        size={120}
        className="absolute bottom-10 md:right-30 text-4xl text-burnt-orange opacity-50"
      />
      <div className="w-[90%] md:w-[80%] lg:w-[60%] lg2:w-[50%] max-w-[1440px] mx-auto relative flex flex-col items-center justify-center overflow-hidden gap-6 my-12">
        <h2 className="font-playfair text-4xl flex flex-wrap gap-2 items-center justify-center">
          <span className="text-deep-navy font-semibold">What</span>
          <span className="text-burnt-orange font-bold">Our Clients</span>
          <span className="text-deep-navy font-semibold">Says</span>
        </h2>
        <motion.p
          className="sm:text-md text-deep-navy max-w-4xl mx-auto leading-relaxed font-light text-center"
          variants={textVariants}
        >
          Reviews and testimonials from our happy and satisfied clients all over
          Nigeria.
        </motion.p>

        <div className="w-full flex justify-center items-center">
          <Swiper
            initialSlide={
              typeof window !== "undefined" && window.innerWidth > 1024 ? 2 : 0
            }
            slidesPerView={1}
            spaceBetween={32}
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[FreeMode, Autoplay]}
            className="flex items-center justify-center"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className="bg-burnt-orange rounded-lg">
                <div className="flex flex-col md:flex-row items-center justify-between w-full rounded-lg  gap-6">
                  <div className="rounded-lg shadow-md w-full md:w-[45%] overflow-hidden relative">
                    <Image
                      src={review.image}
                      alt={review.full_name}
                      width={500}
                      height={300}
                      className="w-full md:h-[400px] object-cover object-center rounded-lg"
                    />

                    <div className="bg-gradient-to-t from-black via-black/60 to-transparent h-[150px] w-full absolute bottom-0 left-0 flex flex-col justify-end px-6 gap-1">
                      <div className="mb-4">
                        <h3 className="text-xl text-white">
                          {review.full_name}
                        </h3>
                        <p className="text-[15px] text-muted-gold font-bold">
                          {review.occupation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg w-full md:w-[50%] text-white text-center">
                    <div className="flex flex-col items-center justify-center mr-8 pb-10 px-6">
                      <p className=" text-center">{review.comment}</p>

                      {review.rating && (
                        <div className="flex items-center justify-center mt-8 gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <FaStar key={i} size={24} className="text-muted-gold" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
