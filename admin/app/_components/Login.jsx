"use client"
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { backend_url } from "../layout";
import { UserContext } from "../_context/userContext";
import { toast } from "react-toastify";

const Login = () => {
  const {token, setToken} = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backend_url + "/api/user/admin", {email, password});
      if (response?.data?.success) {
        setToken(response?.data?.token);
        console.log(response);
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh]">
      <div className="flex border-2 w-full h-full">
        <div className="relative h-full flex-1 hidden md:block">
          <Image src={"/assets/loginImg.png"} fill alt="login-image" />
        </div>

        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="w-[90%] xs:w-[300px] shadow-2xl shadow-blue-500 p-4 rounded-2xl">
            <h1 className="text-center text-[30px] font-bold">Sign Up</h1>
            <form onSubmit={onSubmitHandle} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[13px] text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none bg-blue-50 rounded-2xl py-1.5 px-2 text-sm "
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-[13px] text-gray-500">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none bg-blue-50 rounded-2xl py-1.5 px-2 text-sm "
                  placeholder="Your Password"
                  required
                />
              </div>
              <button type="submit" className="bg-primary py-1 px-3 rounded-2xl text-white w-full cursor-pointer">
                Login
              </button>
            </form>
            <div className="text-center mt-2">
              <p className="text-[13px]">Forget Your Password ?</p>
              {/* <div className="">
                {currentState === "Login" ? (
                  <div className="text-[13px]">
                    Don't have an account ?<span>Create an account</span>
                  </div>
                ) : (
                  <div className="text-[13px]">
                    Already have an account ?<span>Login</span>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
