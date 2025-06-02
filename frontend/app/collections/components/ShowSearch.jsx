"use client";
import { ShopContext } from "@/app/_context/ShopContext";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const ShowSearch = () => {
  const pathname = usePathname();
  const { search, setSearch, isShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (pathname.includes("collections")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [pathname]);

  return (
    isShowSearch &&
    visible && (
      <div className="py-2">
        <div className="inline-flex w-full items-center justify-center bg-white p-2 rounded-2xl text-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="border-none outline-none w-full "
          />
          <div className="">
            <IoIosSearch />
          </div>
        </div>
      </div>
    )
  );
};

export default ShowSearch;
