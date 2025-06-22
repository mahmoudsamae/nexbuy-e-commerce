import Image from "next/image";
import React from "react";
import { FaFirefox } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";


const Hero = () => {
  return (
    <section className="bg-[url(/assets/bg.png)] bg-cover bg-center">
      <div className="flex flex-col gap-10 p-5 container px-6 py-4 mx-auto">
        <div className="p-2 rounded-2xl bg-white flex flex-col gap-2 w-[200px]">
          <Image
            src={"/assets/hero.png"}
            width={200}
            height={200}
            alt="hero"
            className="rounded-2xl"
          />
          <p className="text-[13px]">
            <b>UNLOCK</b> your best look, one click at a tim, Your style upgrade
            statshere, shop today!
          </p>
        </div>
        <div className="flex flex-col gap-3 ">
          <h3 className="text-primary text-[25px] font-bold flex items-center gap-1.5">
            MODERN COLLECTION <FaFirefox />
          </h3>
          <h1 className="text-[25px] sm:text-[32px] max-w-[500px]">
            Every Click Brings You Closer To Perfection Shop Now!
          </h1>
          <button className="flex items-center gap-2 cursor-pointer bg-white w-fit px-4 py-1.5 rounded-4xl">
            Check Our Modern Collection
            <div className="rounded-full">
              <FiArrowRight className="bg-primary h-[30px] w-[30px] text-white rounded-full" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
