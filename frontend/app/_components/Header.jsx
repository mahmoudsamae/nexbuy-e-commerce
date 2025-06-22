"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

import Navbar from "./Navbar";
import { ShopContext } from "../_context/ShopContext";
import { useRouter } from "next/navigation";

const Header = ({showSearch}) => {
  const { token, setToken, getCartCount } = useContext(ShopContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useRouter()
  
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate.push("/auth/login")
  }
  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <Link href="/">
              <p className="text-[20px] font-bold "><span className="text-primary">N</span>ex<span className="text-primary">B</span>uy </p>
            </Link>
          </div>
          <div
            className={`${
              isOpen
                ? " flex absolute top-15 right-10 bg-gray-100 w-[200px] rounded-2xl p-3 z-50"
                : "hidden md:flex "
            } `}
          >
            <Navbar setIsOpen={setIsOpen} />
          </div>
          <div className="flex items-center">
            {/* Mobile menu button  */}
            <div className="flex md:hidden mr-3">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <RiMenu3Fill className="w-6 h-6" />
                ) : (
                  <IoClose className=" w-6 h-6" />
                )}
              </button>
            </div>
            <div className="flex justify-center items-center gap-4 ">
              <Link href={"/cart"} className="relative cursor-pointer">
                <AiOutlineShoppingCart className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {getCartCount()}
                </span>
              </Link>

              <div className="relative group">
                <div>
                  {token ? (
                    <img src="/assets/user.png" alt="userImg" className="w-7 h-7 cursor-pointer" />
                  ) : (
                    <Link
                      href={"/auth/login"}
                      className="flex items-center justify-center gap-2 px-2 py-1 rounded-4xl bg-blue-50 cursor-pointer"
                    >
                      Login
                      <FaRegUser />
                    </Link>
                  )}
                </div>
                {token && (
                  <div className="absolute z-50 bg-white p-1 py-2 border-2 border-blue-100 rounded-lg right-0 w-[100px] hidden group-hover:flex flex-col gap-1 items-center justify-center">
                    <Link
                      href={"/orders"}
                      className="rounded-2xl hover:bg-blue-50 w-full text-[14px] text-center"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="rounded-2xl hover:bg-blue-50 w-full text-[14px] text-center"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
