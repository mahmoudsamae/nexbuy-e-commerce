"use client";
// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import NewArrivalItem from "./ProductItem";
import Title from "./Title";
import { ShopContext } from "../_context/ShopContext";

const NewArrivals = () => {
  const {products} = useContext(ShopContext);
  const [newArrivals, setNewArrivals] = useState([]);
  useEffect(() => {
    const data = products?.slice(0, 10);
    setNewArrivals(data);
  }, [products]);
  return (
    <section className="container py-4 mx-auto">
      <Title
        title1={"New"}
        title2={"Arrivals"}
        description={
          "Discover the best deals on top-quality products, Crafted to elevate your everyday experience."
        }
      />
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1020: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay, Pagination]}
        className="h-[530px] sm:h-[420px]"
      >
        {newArrivals?.map((product) => (
          <SwiperSlide className="p-3 sm:p-0">
            <NewArrivalItem key={product?._id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewArrivals;
