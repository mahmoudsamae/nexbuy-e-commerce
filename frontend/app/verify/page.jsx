"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../_context/ShopContext';
import { verifyStripe } from '../_utilts/orderAPIs';
import { toast } from 'react-toastify';

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
      const response = await verifyStripe(success, orderId, token);
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
    <div>page</div>
  )
}

export default page