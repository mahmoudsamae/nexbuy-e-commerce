"use client";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../_context/ShopContext";
import Title from "../_components/Title";
import Image from "next/image";
import { getUserOrders } from "../_utilts/orderAPIs";

const page = () => {
  const { token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const getUserOrders_ = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await getUserOrders(token);
      if (response.data.success) {
        let allOrders = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            (item["status"] = order.status),
              (item["payment"] = order.payment),
              (item["paymentMethod"] = order.paymentMethod),
              (item["date"] = order.date);
              allOrders.push(item)
          });
        });
        setOrderData(allOrders.reverse())
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserOrders_();
  }, [token]);
  return (
    <div className="bg-blue-50">
      <div className="container py-5 sm:py-10 mx-auto">
        <div className="">
          <Title title1={"Order"} title2={"List"} />
        </div>
        <div className="">
          <div className="flex flex-col gap-2">
            {orderData?.map((order, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 p-2 bg-white rounded-2xl"
              >
                <div className="relative h-[110px] w-[90px] sm:w-[100px] rounded-2xl overflow-hidden">
                  <Image src={order?.image[0]} fill alt="order-image" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h1 className="text-[14px] font-bold">{order.name}</h1>
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1">
                      <p className="text-[13px]">Price :</p>
                      <p className="text-[13px] font-medium text-gray-400">
                        {order?.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-[13px]">Quantity :</p>
                      <p className="text-[13px] font-medium text-gray-400">
                        {order?.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-[13px]">Size :</p>
                      <p className="text-[13px] font-medium text-gray-400">
                        {order?.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-[13px]">Date: </p>
                    <p className="text-[13px] font-medium text-gray-400">
                      {new Date(order.date).toDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-[13px]">Payment: </p>
                    <p className="text-[13px] font-medium text-gray-400">
                      {"COD"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <p className="text-[13px] font-medium text-gray-400">
                    {order?.status}
                  </p>
                  <button
                    onClick={() => getUserOrders_()}
                    className="bg-primary px-3 py-1 rounded-2xl text-white text-[12px] cursor-pointer"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
