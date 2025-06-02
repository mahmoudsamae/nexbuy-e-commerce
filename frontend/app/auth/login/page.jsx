"use client";
import { ShopContext } from "@/app/_context/ShopContext";
import { userLogin, userRegister } from "@/app/_utilts/userAPIs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const page = () => {
  const { token, setToken } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Login");
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      if (currentState === "Sign Up") {
        const response = await userRegister({ name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await userLogin({ email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate.push("/");
    }
  }, [token]);
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh]">
      <div className="flex border-2 w-full h-full">
        <div className="relative h-full flex-1 hidden md:block">
          <Image src={"/assets/login.png"} fill alt="login-image" />
        </div>

        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="w-[90%] xs:w-[300px] shadow-2xl shadow-blue-500 p-4 rounded-2xl">
            <h1 className="text-center text-[30px] font-bold">
              {currentState}
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              {currentState === "Sign Up" && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-[13px] text-gray-500">
                    Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    id="name"
                    className="outline-none bg-blue-50 rounded-2xl py-1.5 px-2 text-sm "
                    placeholder="Your Name"
                    required
                  />
                  {errors.name && (
                    <p className="text-[13px] text-red-500">
                      field is required.
                    </p>
                  )}
                </div>
              )}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[13px] text-gray-500">
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  id="email"
                  className="outline-none bg-blue-50 rounded-2xl py-1.5 px-2 text-sm "
                  placeholder="Your Email"
                  required
                />
                {errors.email && (
                  <p className="text-[13px] text-red-500">field is required.</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-[13px] text-gray-500">
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  id="password"
                  className="outline-none bg-blue-50 rounded-2xl py-1.5 px-2 text-sm "
                  placeholder="Your Password"
                  required
                />
                {errors.password && (
                  <p className="text-[13px] text-red-500">field is required.</p>
                )}
              </div>
              <button className="bg-primary py-1 px-3 rounded-2xl text-white w-full cursor-pointer">
                {currentState === "Sign Up" ? "Sign Up" : "Login"}
              </button>
            </form>
            <div className="text-center mt-2">
              {currentState === "Login" && (
                <p className="text-[13px]">Forget Your Password ?</p>
              )}
              <div className="">
                {currentState === "Login" ? (
                  <div
                    onClick={() => setCurrentState("Sign Up")}
                    className="text-[13px] cursor-pointer"
                  >
                    Don't have an account ?<span>Create an account</span>
                  </div>
                ) : (
                  <div
                    onClick={() => setCurrentState("Login")}
                    className="text-[13px] cursor-pointer"
                  >
                    Already have an account ?<span>Login</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
