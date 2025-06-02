import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { IoIosStar } from "react-icons/io";

const ProductItem = ({product}) => {
  return (
    <Link
      href={product._id}
      className="rounded-2xl p-4 shadow-2xl min-h-[340px]"
    >
      <div className="relative h-[300px] sm:h-[240px] md:h-[220px]">
        <Image
          src={product?.image[0]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt="product-image"
          className="rounded-2xl"
          // priority
        />
      </div>
      <div className="pt-3">
        <h6 className="text-[13px] font-medium line-clamp-1">
          {product?.name}
        </h6>
        <div className="flex items-center justify-between">
          <h5 className="h4">${product?.price}.00</h5>
          <div className="flexCenter gap-1.5">
            <IoIosStar className="text-primary" />
            <p>4.5</p>
          </div>
        </div>
        <p className="text-[12px] text-gray-500 line-clamp-2">
          {product?.description}
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;