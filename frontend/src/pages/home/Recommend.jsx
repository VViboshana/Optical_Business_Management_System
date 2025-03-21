import React, { useEffect, useState } from "react";
import GlassCard from "../glasses/GlassCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllGlassesQuery } from "../../redux/features/glasses/glassApi";

const Recommend = () => {

    const {data:glasses=[]}=useFetchAllGlassesQuery();

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {glasses.length > 0 &&
          glasses.slice(8, 18).map((glass, index) => (
            <SwiperSlide key={index}>
              <GlassCard glass={glass} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recommend;
