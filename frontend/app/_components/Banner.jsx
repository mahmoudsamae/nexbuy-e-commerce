import Image from "next/image";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const Banner = () => {
  return (
    <section className="shadow-2xl">
      <div className="flex items-center  justify-between">
        <div className="flex flex-col gap-4 flex-1 mx-3 sm:ml-10 md:ml-15 lg:ml-20">
          <h1 className="font-medium text-[20px] text-center sm:text-start uppercase">
            affordable style, timeless appleal
          </h1>
          <p className="font-medium text-center text-gray-400">Transform your closet today</p>
          <button className="flex items-center mb-3 gap-2 text-white cursor-pointer bg-primary w-fit px-4 py-1.5 rounded-4xl">
            Check Our Modern Collection
            <div className="rounded-full">
              <FiArrowRight className="bg-white h-[30px] w-[30px] text-black rounded-full" />
            </div>
          </button>
        </div>
        <div className="hidden sm:block flex-1">
          <Image
            src={"/assets/banner.png"}
            alt="banner"
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
