"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import Link from "next/link";
import { FreeMode, Thumbs } from "swiper/modules";

interface ProductSliderProps {
  images: string[];
}

export default function ProductSlider({ images }: ProductSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left thumbnails */}
      <div className="md:col-span-2">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={12}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          breakpoints={{
            0: { direction: "horizontal", slidesPerView: 4 },
            768: { direction: "vertical", slidesPerView: 5 },
          }}
          modules={[FreeMode, Thumbs]}
          className="md:h-[37rem]"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 cursor-pointer hover:border-red-500 hover:shadow-md">
                <Image
                  src={img}
                  alt={`Thumbnail ${i}`}
                  width={120}
                  height={120}
                  className="object-cover w-full h-24"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main product image */}
      <div className="md:col-span-10">
        <Swiper
          loop
          spaceBetween={20}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="rounded-xl overflow-hidden shadow-md bg-white"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="flex justify-center items-center bg-gray-50">
                <Image
                  src={img}
                  alt={`Product image ${i}`}
                  width={800}
                  height={600}
                  className="w-full h-[37rem] object-contain"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </div>
  );
}

