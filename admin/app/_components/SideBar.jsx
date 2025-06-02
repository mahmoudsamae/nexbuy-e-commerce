import Link from 'next/link';
import React, { useState } from 'react'
import { IoAddCircle } from "react-icons/io5";
import { FaRegListAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from 'next/navigation';



const SideBar = ({setToken}) => {
  const pathname = usePathname();
  return (
    <div className="bg-white flex flex-col justify-between gap-5 min-h-screen sticky top-0 mt-3">
      <div className="p-2 sm:p-8 md:p-10">
          <p className="text-[15px] sm:text-[20px] font-bold ">
            <span className="text-primary">N</span>ex
            <span className="text-primary">B</span>uy{" "}
          </p>
      </div>
      {/* Links  */}
      <div className="flex flex-col gap-5 flex-1">
        <Link
          href={"/"}
          className={`${
            pathname === "/" && "bg-blue-50 border-r-4 border-primary"
          }  cursor-pointer hover:text-primary transition duration-300`}
        >
          <div
            className={`${
              pathname === "/" && "text-primary"
            } flex items-center gap-3 px-1 sm:px-3 md:px-5 py-2 justify-center md:justify-start`}
          >
            <IoAddCircle className="text-[25px]" />
            <p className="hidden md:block font-medium">Add Item</p>
          </div>
        </Link>
        <Link
          href={"/list"}
          className={`${
            pathname === "/list" && "bg-blue-50 border-r-4 border-primary"
          }  cursor-pointer hover:text-primary transition duration-300`}
        >
          <div
            className={`${
              pathname === "/list" && "text-primary "
            } flex items-center gap-3 px-1 sm:px-3 md:px-5 py-2 justify-center md:justify-start`}
          >
            <FaRegListAlt className="text-[25px]" />
            <p className="hidden md:block font-medium">List</p>
          </div>
        </Link>
        <Link
          href={"/orders"}
          className={`${
            pathname === "/orders" && "bg-blue-50 border-r-4 border-primary"
          }  cursor-pointer`}
        >
          <div
            className={`${
              pathname === "/orders" && "text-primary "
            } flex items-center gap-3 px-1 sm:px-3 md:px-5 py-2 justify-center md:justify-start`}
          >
            <IoAddCircle className="text-[25px]" />
            <p className="hidden md:block font-medium">Orders</p>
          </div>
        </Link>
      </div>

      {/* Logout Button  */}
      <div className="px-2 py-5 sm:px-6 md:px-10 w-full text-center">
        <button
          onClick={() => setToken("")}
          className="px-2 sm:px-3 py-2 bg-primary text-white sm:w-full rounded-4xl cursor-pointer"
        >
          <IoIosLogOut className="sm:hidden" />
          <p className="hidden sm:block">Logout</p>
        </button>
      </div>
    </div>
  );
}

export default SideBar