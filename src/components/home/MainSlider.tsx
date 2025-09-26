"use client";
import { on } from 'events';
import { use } from 'react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import slider1 from '../../assets/slider-image-1.jpeg';
import slider2 from '../../assets/slider-image-2.jpeg';
import slider3 from '../../assets/slider-image-3.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';


const swiperOptions = {
    pagination: {
        clickable: true,
        bulletClass: 'swiper-pagination-bullet !size-4 border-2',
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-red-500 border-white',
    },
    autoplay:{
        delay: 2000,
        disableOnInteraction: false,
    },
    modules: [Pagination,Autoplay],
};

const images = [
    {path: slider1, label: 'slider1'},
    {path: slider2, label: 'slider2'},
    {path: slider3, label: 'slider3'},
];
export default function MainSlider() {
    return (
        <div className="w-full h-[21.5rem] rounded-lg overflow-hidden">
            <Swiper
                className="main-slider h-full"
                style={{ height: '100%' }}
                {...swiperOptions}
            >
                {images.map((img, idx) => (
                    <SwiperSlide key={idx} className="h-full">
                        <Image
                            src={img.path}
                            alt={img.label}
                            width={1920}
                            height={344}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </div>
    );
}