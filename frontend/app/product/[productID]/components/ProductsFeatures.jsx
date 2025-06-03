import React from "react";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { IoReturnDownBack } from "react-icons/io5";
import { RiSecurePaymentFill } from "react-icons/ri";

const ProductsFeatures = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="flex items-center px-4 gap-4 bg-blue-50 rounded">
          <IoReturnDownBack className="text-amber-500 text-9xl" />
          <div className="">
            <h4 className="font-bold text-[15px]">Easy Return</h4>
            <p className="text-[12px] text-gray-500 font-medium">
              adipisicing elit. Culpa suscipit eaque voluptatem velit sit omnis
              facere consequatur necessitatibus cumque vitae.
            </p>
          </div>
        </div>
        <div className="flex items-center px-4 gap-4 bg-blue-50 rounded">
          <AiOutlineDeliveredProcedure className="text-cyan-500 text-9xl" />
          <div className="">
            <h4 className="font-bold text-[15px]">Fast Delivery</h4>
            <p className="text-[12px] text-gray-500 font-medium">
              elit. Culpa
              suscipit eaque voluptatem velit sit omnis facere consequatur
              necessitatibus cumque vitae.
            </p>
          </div>
        </div>
        <div className="flex items-center px-4 gap-4 bg-blue-50 rounded">
          <RiSecurePaymentFill className="text-red-700 text-9xl" />
          <div className="">
            <h4 className="font-bold text-[15px]">Secure Payment</h4>
            <p className="text-[12px] text-gray-500 font-medium">
              Culpa
              suscipit eaque voluptatem velit sit omnis facere consequatur
              necessitatibus cumque vitae.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFeatures;
