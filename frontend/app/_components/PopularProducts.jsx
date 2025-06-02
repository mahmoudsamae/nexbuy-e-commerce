"use client";
import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../_context/ShopContext";
import ProductItem from "./ProductItem";

const PopularProducts = () => {
  const { products } = useContext(ShopContext);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const data = products?.filter((product) => product?.popular);
    setPopularProducts(data.slice(0, 5));
  }, [products]);
  return (
    <div className="flex flex-col gap-5 p-5 mx-auto">
      <Title
        title1={"Popular"}
        title2={"Products"}
        description={
          "Discover our most loved items, handpicked by our customers. Shop the latest trends and best-sellers now!"
        }
      />
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {popularProducts?.map((product) => (
          <ProductItem key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
