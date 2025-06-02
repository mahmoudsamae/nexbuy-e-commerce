"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../_context/userContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { backend_url, currency } from '../layout';
import { AiFillCodeSandboxCircle } from "react-icons/ai";


const page = () => {
  const {token} = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      if(!token){
        return null
      }
      const response = await axios.post(backend_url + "/api/order/list", {}, {headers: {token}});
      if(response.data.success){
        setOrders(response.data.orders);
        console.log(response.data)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // change status handler 
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backend_url + "/api/order/status",
        {orderId, status: e.target.value},
        { headers: { token } }
      );
      if(response.data.success){
        getOrders();
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getOrders();
  }, [token])
  
  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-2 rounded-md">
        {orders.map((order) => (
          <div key={order._id} className=" bg-white p-2">
            <div className="flex gap-2 sm:gap-4 md:gap-6 flex-col sm:flex-row">
              <div className="">
                <AiFillCodeSandboxCircle className="text-[40px] sm:text-[60px] md:text-[80px] text-primary" />
              </div>
              <div className="flex flex-col md:flex-row md:gap-4 lg:gap-8">
                <div>
                  <div className="flex items-start sm:gap-2 flex-col sm:flex-row">
                    <div className="text-[14px] font-bold">Items : </div>
                    <div className="flex flex-col md:mt-1">
                      {order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return (
                            <p
                              className="text-[12px] sm:text-[14px]   text-gray-400 font-medium"
                              key={index}
                            >
                              {item.name} x {item.quantity}{" "}
                              <span>"{item.size}"</span>
                            </p>
                          );
                        } else {
                          return (
                            <p
                              className="text-[14px] text-gray-400 font-medium"
                              key={index}
                            >
                              {item.name} x {item.quantity}{" "}
                              <span>"{item.size}"</span> ,
                            </p>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div className="">
                    <p className="text-[14px] font-medium">
                      Name :{" "}
                      <span className="text-gray-400 ">
                        {order.address.firstname} {order.address.lastName}
                      </span>
                    </p>
                    <p className="text-[14px] font-medium">
                      Address :{" "}
                      <span className="text-gray-400 ">
                        {order.address.country}, {order.address.city},{" "}
                        {order.address.state}, {order.address.street},{" "}
                        {order.address.zipCode}
                      </span>
                    </p>
                    <p className="text-[14px] font-medium ">
                      Phone Number :
                      <span className="text-gray-400">
                        {" "}
                        {order.address.phoneNumber}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="">
                  <p className="text-[14px] font-medium">
                    Total :{" "}
                    <span className="text-gray-400 ">{order.items.length}</span>
                  </p>
                  <p className="text-[14px] font-medium">
                    Method :{" "}
                    <span className="text-gray-400 ">
                      {order.paymentMethod}
                    </span>
                  </p>
                  <p className="text-[14px] font-medium">
                    Payment :{" "}
                    <span className="text-gray-400 ">
                      {order.payment ? "Donn" : "Panding"}
                    </span>
                  </p>
                  <p className="text-[14px] font-medium">
                    Date :{" "}
                    <span className="text-gray-400 ">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-9 md:gap-16 mt-3">
              <p className="text-[14px] font-medium text-gray-500">
                {currency}
                {order.amount}
              </p>
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className="bg-blue-50 max-w-50 px-2 text-[14px]">
                <option value="Order Place">Order Place</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Deliverd">Deliverd</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page