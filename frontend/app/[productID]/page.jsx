"use client";
import React, { use, useContext, useEffect, useState } from "react";
import { ShopContext } from "../_context/ShopContext";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import ProductDescription from "./components/ProductDescription";
import ProductsFeatures from "./components/ProductsFeatures";
import ProductsRelative from "./components/ProductsRelative";

const page = ({ params }) => {
  const { productID } = use(params);
  const { products, currency, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const getSelectetProduct = () => {
    const selected = products.find((item) => item._id === productID);
    if (selected) {
      setProduct(selected);
      setImage(selected?.image[0]);
    }
  };

  useEffect(() => {
    getSelectetProduct();
  }, [products, productID]);

  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col gap-8 py-5 px-5 sm:px-8 md:px-10 mx-auto">
      <div className="relative flex flex-col gap-2 sm:gap-5 md:gap-8 lg:gap-10 sm:flex-row ">
        {/* product images */}
        <div className="flex gap-2">
          <div className="flexCenter flex-col gap-1">
            {product?.image?.map((item, i) => (
              <Image
                key={i}
                src={item}
                alt="product-image"
                width={60}
                height={60}
                className="rounded cursor-pointer"
                onClick={() => setImage(item)}
                priority
              />
            ))}
          </div>
          <div className="">
            <Image
              src={image}
              alt="main-image"
              width={270}
              height={100}
              className="rounded"
              priority
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex flex-col gap-2">
          {/* title  */}
          <h1 className="font-bold text-[20px]">{product?.name}</h1>
          {/* stars  */}
          <div className="flex items-center gap-2 ">
            <FaStar className="text-primary" />
            <FaStar className="text-primary" />
            <FaStar className="text-primary" />
            <FaStar className="text-primary" />
            <FaStarHalfStroke className="text-primary" />
            <p className="text-primary">(122)</p>
          </div>
          {/* price  */}
          <h3 className="font-medium">
            {currency}
            {product?.price}.00
          </h3>
          {/* description */}
          <p className="text-[13px] text-gray-500">{product?.description}</p>
          {/* sizes */}
          <div className="flex gap-2 items-center">
            {[...product?.sizes]
              .sort((a, b) => {
                const order = ["S", "M", "L", "XL", "XXL"];
                return order.indexOf(a) - order.indexOf(b);
              })
              .map((item, i) => (
                <button
                  onClick={() => setSize(item)}
                  key={i}
                  className={` ${
                    size === item && "ring-1 ring-slate-900/20"
                  } !py-1 !px-3 cursor-pointer bg-blue-50 rounded text-sm`}
                >
                  {item}
                </button>
              ))}
          </div>
          {/* Add To Cart Button  */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => addToCart(product?._id, size)}
              className="flexCenter gap-2 bg-primary rounded-4xl py-2 px-3 min-w-[200px] text-white"
            >
              Add To Cart <FaShoppingCart />
            </button>
            <button className="py-3 px-3 bg-blue-50 rounded">
              <FaHeart />
            </button>
          </div>
          {/* Delivery */}
          <div className="flex items-center gap-3">
            <p className=" text-gray-500">
              <AiOutlineDeliveredProcedure />
            </p>
            <p className="text-[12px] font-medium text-gray-500">
              Free Delivery on orders over 500$
            </p>
          </div>
          <hr className="my-3 w-2/3 text-gray-200" />
          <div className="">
            <p className="text-gray-500 font-medium text-[12px]">
              Authenticy You Can Trust
            </p>
            <p className="text-gray-500 font-medium text-[12px]">
              Injoy Cash on Delivery for Your Convenience
            </p>
            <p className="text-gray-500 font-medium text-[12px]">
              Easy Delivery within 7 Days
            </p>
          </div>
        </div>
      </div>
      {/* product description  */}
      <ProductDescription />

      {/* Products Features  */}
      <ProductsFeatures />

      {/* Products Relative  */}
      <ProductsRelative
        category={product?.category}
        subCategory={product?.subCategory}
      />
    </div>
  );
};

export default page;
