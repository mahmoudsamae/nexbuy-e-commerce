"use client";
import React, { useContext, useState } from "react";
import Title from "../_components/Title";
import { ShopContext } from "../_context/ShopContext";
import CartTotal from "../cart/components/CartTotal";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { payWithCOD, payWithStripe } from "../_utilts/orderAPIs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const {
    products,
    delivery_charges,
    token,
    getCartTotal,
    cartItems,
    setCartItems,
  } = useContext(ShopContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useRouter();

  const [method, setMethod] = useState("COD");

  const onSubmit = async (data) => {
    const {
      firstname,
      lastName,
      email,
      phoneNumber,
      street,
      city,
      state,
      zipCode,
      country,
    } = data;
    const formData = {
      firstname,
      lastName,
      email,
      phoneNumber,
      street,
      city,
      state,
      zipCode,
      country,
    };
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartTotal() + delivery_charges,
      };
      switch (method) {
        case "COD":
          const response = await payWithCOD(orderData, token);
          console.log("cod")
          if (response?.data?.success) {
            setCartItems({});
            navigate.push("/orders");
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const res = await payWithStripe(orderData, token);
          console.log("stripe ");
          if (res?.data?.success) {
            const {session_url} = res.data
            window.location.replace(session_url);
          } else {
            toast.error(res.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className=" bg-blue-50">
      <div className="container p-6 mx-auto flex flex-col gap-3">
        <div className="flex items-center flex-col sm:flex-row gap-3 sm:gap-10 md:gap-15 lg:gap-20">
          <form
            id="checkoutForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 flex-1"
          >
            <div className="">
              <Title title1={"Delivery"} title2={"Information"} />
            </div>
            <div className="flex ms:flex-col gap-2">
              <label className="flex-1">
                <input
                  {...register("firstname", { required: true })}
                  type="text"
                  className="outline-none bg-white border-2 border-gray-200 p-1.5 text-[14px] w-full"
                  placeholder="First Name"
                />
                {errors.firstname && (
                  <p className="text-[13px] text-red-500">
                    This field is required
                  </p>
                )}
              </label>
              <label className="flex-1">
                <input
                  {...register("lastName", { required: true })}
                  type="text"
                  className="outline-none bg-white border-2 border-gray-200 p-1.5 text-[14px] w-full"
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-[13px] text-red-500">
                    This field is required
                  </p>
                )}
              </label>
            </div>
            <input
              {...register("email", { required: true })}
              type="Email"
              className="outline-none bg-white border-2 border-gray-200 p-1.5 text-[14px] w-full"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-[13px] text-red-500">This field is required</p>
            )}
            <input
              {...register("phoneNumber", { required: true })}
              type="text"
              className="outline-none bg-white border-2 border-gray-200 p-1.5 text-[14px] w-full"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-[13px] text-red-500">This field is required</p>
            )}
            <input
              {...register("street", { required: true })}
              type="text"
              className="outline-none bg-white border-2 border-gray-200 p-1.5 text-[14px] w-full"
              placeholder="Street"
            />
            {errors.street && (
              <p className="text-[13px] text-red-500">This field is required</p>
            )}
            <div className="flex ms:flex-col gap-2">
              <label className="flex-1">
                <input
                  {...register("city", { required: true })}
                  type="text"
                  className="outline-none bg-white border-2 border-gray-200 p-1.5 text-[14px] w-full"
                  placeholder="City"
                />
                {errors.city && (
                  <p className="text-[13px] text-red-500">
                    This field is required
                  </p>
                )}
              </label>
              <label className="flex-1">
                <input
                  {...register("state", { required: true })}
                  type="text"
                  className="outline-none bg-white border-2 border-gray-200 p-1.5 text-[14px] w-full"
                  placeholder="State"
                />
                {errors.state && (
                  <p className="text-[13px] text-red-500">
                    This field is required
                  </p>
                )}
              </label>
            </div>
            <div className="flex ms:flex-col gap-2">
              <label className="flex-1">
                <input
                  {...register("zipCode", { required: true })}
                  type="text"
                  className="outline-none bg-white border-2 border-gray-200 p-1.5 text-[14px] w-full"
                  placeholder="Zip Code"
                />
                {errors.zipCode && (
                  <p className="text-[13px] text-red-500">
                    This field is required
                  </p>
                )}
              </label>
              <label className="flex-1">
                <input
                  {...register("country", { required: true })}
                  type="text"
                  className="outline-none bg-white border-2 border-gray-200 p-1.5 text-[14px] w-full"
                  placeholder="Country"
                />
                {errors.country && (
                  <p className="text-[13px] text-red-500">
                    This field is required
                  </p>
                )}
              </label>
            </div>
          </form>
          <div className="flex-1">
            <CartTotal />

            {/* paynent method */}
            <div className="flex flex-col gap-5">
              <Title title1={"Payment"} title2={"Method"} />
              <div className="flex items-center gap-2">
                <div
                  onClick={() => setMethod("stripe")}
                  className={`${
                    method === "stripe"
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  } py-1 px-2 rounded-2xl cursor-pointer`}
                >
                  Stripe
                </div>
                <div
                  onClick={() => setMethod("COD")}
                  className={`${
                    method === "COD"
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  } py-1 px-2 rounded-2xl cursor-pointer `}
                >
                  Cash To Delivery
                </div>
              </div>
              <button
                type="submit"
                form="checkoutForm"
                className="px-3 py-1 rounded-2xl bg-primary w-fit text-white cursor-pointer"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
