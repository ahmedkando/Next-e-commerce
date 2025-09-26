"use client";
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ICategory } from '@/interfaces/category.interface';


const swiperOptions = {
  spaceBetween: 30,
  slidesPerView: 6,
  modules: [Pagination, Navigation],
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

export default function CategorySlider({ categories }: { categories: ICategory[] }) {
  return (
    <div className="w-full">
      {/* Slider */}
      <Swiper className="categories-slider mb-20" {...swiperOptions}>
        {categories &&
          categories.map((cat) => (
            <SwiperSlide key={cat._id} className="mb-8">
              <div
                className={`flex flex-col items-center justify-center border rounded-lg shadow-sm transition-all duration-200 h-40 w-40 cursor-pointer
                bg-white hover:border-red-500 hover:shadow-md`}
              >
                <div className="w-20 h-20 flex items-center justify-center mb-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-base font-medium">{cat.name}</span>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

