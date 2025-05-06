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
import { useFetchAllGlassesQuery } from "../../../Inventory/redux/features/glasses/glassApi";
import { data } from "react-router";

const categories = [
  "Choose a category",
  "Professional",
  "Casual",
  "Sports & Adventure",
  "Luxury & Fashion",
];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a category");

  const { data: glasses = [] } = useFetchAllGlassesQuery();
  console.log(data);

  const filteredGlasses =
    selectedCategory === "Choose a category"
      ? glasses
      : glasses.filter((glass) => glass.category === selectedCategory);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      {/* Category Filtering */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

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
        {filteredGlasses.length > 0 &&
          filteredGlasses.map((glass, index) => (
            <SwiperSlide key={index}>
              <GlassCard glass={glass} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
