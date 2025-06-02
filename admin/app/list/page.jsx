"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backend_url, currency } from "../layout";
import { toast } from "react-toastify";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { UserContext } from "../_context/userContext";

const page = () => {
  const { token } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [productsTotal, setProductsTotal] = useState(0);

  const getProducts = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
        setProductsTotal(response.data.products.length)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.post(
        backend_url + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if(response.data.success){
        getProducts();
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="p-3 sm:p-6 ms:p-9 lg:p-11 ">
        <div className="text-[13px] font-medium text-gray-400 mb-2">
          You Have Added <span className="font-bold text-primary text-[14px]">{productsTotal}</span> product
        </div>
        <div className="p-2 grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center gap-2 p1 bg-white rounded-xl">
          <h5 className="font-bold text-[13px] sm:text-[16px]">Image</h5>
          <h5 className="font-bold text-[13px] sm:text-[16px]">Name</h5>
          <h5 className="font-bold text-[13px] sm:text-[16px]">Category</h5>
          <h5 className="font-bold text-[13px] sm:text-[16px]">Price</h5>
          <h5 className="font-bold text-[13px] sm:text-[16px]">Remove</h5>
        </div>
        <div className="flex flex-col gap-2 mt-3">
          {list?.map((product) => (
            <div
              key={product._id}
              className=" grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center gap-2 bg-white rounded-xl"
            >
              <Image
                src={product.image[0]}
                alt="productIMG"
                width={55}
                height={40}
                className="rounded-xl m-1"
              />
              <p className="text-[14px] font-medium text-gray-600">
                {product.name}
              </p>
              <p className="text-[14px] font-medium text-gray-600">
                {product.category}
              </p>
              <div className="text-[14px] font-medium text-gray-600">
                {currency}
                {product.price}.00
              </div>
              <div className="flex justify-center">
                <FaTrashAlt
                  onClick={() => deleteProduct(product._id)}
                  className="text-right md:text-center cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
