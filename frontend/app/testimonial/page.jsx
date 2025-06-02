import React from "react";
import { FaStar } from "react-icons/fa6";
import Title from "../_components/Title";
import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";


const page = () => {
  return (
    <div className="bg-blue-50">
      <div className="container py-5 sm:py-10 mx-auto">
        <div className="">
          <Title title1={"What People"} title2={"Say"} />
        </div>
        <div className="flex flex-col gap-5 p-2 sm:p-4">
          <div className="flex flex-col gap-1 bg-white py-2 px-3 mt-2 rounded-md w-fit">
            <div className="flex items-center gap-2">
              <FaStar className="text-primary" />
              <FaStar className="text-primary" />
              <FaStar className="text-primary" />
              <FaStar className="text-primary" />
              <FaStar className="text-primary" />
            </div>
            <p className="text-[13px]">
              more then <span className="font-bold">+25,000 reviews</span>
            </p>
          </div>

          <div className="flex items-center flex-col sm:flex-row gap-[50px]">
            <div className="flex-1 p-3 bg-white rounded-md">
              {/* cart Header  */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/assets/testimonials/user1.png"}
                    alt="user-image"
                    width={45}
                    height={45}
                    className="rounded-full"
                  />
                  <p className="text-[13px] font-bold">John Doe</p>
                </div>
                <div className="flex items-center h-7 px-2 gap-2 rounded-2xl bg-primary">
                  <AiOutlineCheck className="text-white" />
                  <p className="text-[12px] text-white">Verified</p>
                </div>
              </div>
              <hr className="text-gray-300 mt-2 mb-4" />
              {/* Cart Info */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <FaStar className="text-primary" />
                  <FaStar className="text-primary" />
                  <FaStar className="text-primary" />
                  <FaStar className="text-primary" />
                  <FaStar className="text-primary" />
                </div>
                <p className="font-bold">High Quality</p>
                <p className="text-[13px] text-gray-400 font-medium">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore alias maxime, magni molestiae culpa similique. Laudantium, ducimus. Quibusdam molestiae neque dicta vitae hic cumque facere magnam ipsam ullam, id reiciendis?</p>
                <div className="flex items-center gap-2 mt-4">
                  <Image src={"/assets/product_1.png"} alt="product-1" width={50} height={50} className="rounded-md"/>
                  <Image src={"/assets/product_2_1.png"} alt="product-2" width={50} height={50} className="rounded-md"/>
                </div>
              </div>
            </div>
            <div className="flex-1 p-3 bg-white rounded-md">
              {/* cart Header  */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/assets/testimonials/user2.png"}
                    alt="user-image"
                    width={45}
                    height={45}
                    className="rounded-full"
                  />
                  <p className="text-[13px] font-bold">John Doe</p>
                </div>
                <div className="flex items-center h-7 px-2 gap-2 rounded-2xl bg-primary">
                  <AiOutlineCheck className="text-white" />
                  <p className="text-[12px] text-white">Verified</p>
                </div>
              </div>
              <hr className="text-gray-300 mt-2 mb-4" />
              {/* Cart Info */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FaStar className="text-primary" />
                  <FaStar className="text-primary" />
                  <FaStar className="text-primary" />
                  <FaStar className="text-primary" />
                  <FaStar className="text-primary" />
                </div>
                <p className="font-bold">High Quality</p>
                <p className="text-[13px] text-gray-400 font-medium">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore alias maxime, magni molestiae culpa similique. Laudantium, ducimus. Quibusdam molestiae neque dicta vitae hic cumque facere magnam ipsam ullam, id reiciendis?</p>
                <div className="flex items-center gap-2 mt-4">
                  <Image src={"/assets/product_2_2.png"} alt="product-1" width={45} height={40} className="rounded-md"/>
                  <Image src={"/assets/product_2_3.png"} alt="product-2" width={45} height={40} className="rounded-md"/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
