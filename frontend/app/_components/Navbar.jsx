
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


const navData = [
  { title: "Home", path: "/" },
  { title: "Collections", path: "/collections" },
  { title: "Testimonial", path: "/testimonial" },
];

const Navbar = ({ setIsOpen }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col md:flex-row w-full md:w-auto  gap-2 text-gray-600 capitalize dark:text-gray-300 md:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
      {navData.map((item) => (
        <Link
          onClick={() => setIsOpen(false)}
          key={item.title}
          href={item.path}
          className={` transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 px-2 py-1 rounded-4xl text-center ${
            pathname === item.path && "bg-primary text-white hover:text-white"
          } hover:text-hover`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
