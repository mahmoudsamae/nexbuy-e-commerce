import Image from "next/image";
import React from "react";

const featureData = [
  {
    id: 0,
    title: "Quality Product",
    text: " elit. Culpa ex fugit consectetur atque!  quas nobis dicta nulla.",
  },
  {
    id: 1,
    title: "Fast Delivery",
    text: " adipisicing elit. Culpa! Error magni officia quas nobis dicta nulla.",
  },
  {
    id: 2,
    title: "Secure Payment",
    text: "Lorem dolor sit amet . Culpa ex atque! Error quas nobis dicta nulla.",
  },
];

const Featuers = () => {
  return (
    <section className="container py-5 sm:py-10 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-4">
        <div className="flexCenter gap-5 px-5 sm:p-0">
          <div>
            <Image
              src={"/assets/features/feature1.png"}
              width={220}
              height={50}
              alt="feature"
              className="rounded-full"
              // priority
            />
          </div>
          <div>
            <Image
              src={"/assets/features/feature2.png"}
              width={220}
              height={50}
              alt="feature"
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flexCenter flex-wrap sm:flex-nowrap gap-3 sm:gap-5">
          {featureData.map((item) => (
            <div key={item.id} className="p-4 rounded-3xl w-[90%] sm:w-[200px] bg-gray-100 min-h-[120px]">
              <h4 className="h4 font-medium">{item.title}</h4>
              <p className="text-[12px] text-gray-500 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featuers;
