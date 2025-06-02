"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../_context/ShopContext';
import { toast } from 'react-toastify';
import axiosClient from '../_utilts/axiosClient';

const page = () => {
  const { token, setCartItems } = useContext(ShopContext);
  const searchParams = useSearchParams();
  const navigate = useRouter()
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  
  const verifyPayment = async () => {
    try {
      if(!token){
        return null
      }
      const response = await axiosClient.post(
        "/api/order/verifystripe",
        { success, orderId },
        { headers: { token } }
      );
      if(response.data.success){
        setCartItems({});
        navigate.push("/orders")
      }else{
        navigate.push("/")  
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    verifyPayment();
  }, [token])
  return (
    <div>Loading ...</div>
  )
}

export default page