"use client";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../_context/ShopContext";
import Image from "next/image";
import Title from "../_components/Title";
import { FiDelete } from "react-icons/fi";
import CartTotal from "./components/CartTotal";
import Link from "next/link";

const page = () => {
  const { products, cartItems, updateQuantity, currency, getCartCount } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      const initialQuantity = {};
      for (let items in cartItems) {
        for (let item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
            initialQuantity[`${items}-${item}`] = cartItems[items][item];
          }
        }
        setCartData(tempData);
        setQuantities(initialQuantity);
      }
    }
  }, [cartItems, products]);

  const increment = (id, size) => {
    const key = `${id}-${size}`;
    const newValue = quantities[key] + 1;
    setQuantities((prev) => ({ ...prev, key: newValue }));
    updateQuantity(id, size, newValue);
  };

  const decrement = (id, size) => {
    const key = `${id}-${size}`;
    if (quantities[key] > 1) {
      const newValue = quantities[key] - 1;
      setQuantities((prev) => ({ ...prev, key: newValue }));
      updateQuantity(id, size, newValue);
    }
  };
  return (
    <div className=" bg-blue-50">
      <div className="container p-6 mx-auto flex flex-col gap-3">
        <Title
          title1={"Popular"}
          title2={"Products"}
          description={
            "Discover our most loved items, handpicked by our customers. Shop the latest trends and best-sellers now!"
          }
        />
        <span className="text-[16px] text-primary font-bold">{getCartCount()} <span className="text-gray-500">Items</span></span>
        {cartData?.map((item, i) => {
          const productData = products?.find(
            (product) => product?._id === item._id
          );
          const key = `${item._id}-${item.size}`;
          return (
            <div key={i} className="flex flex-col gap-5 ">
              <div className="flex items-center gap-4 bg-white p-3 rounded">
                <Image
                  src={productData?.image[0]}
                  alt="product-image"
                  width={60}
                  height={60}
                  className=" rounded-sm object-cover"
                />

                <div>
                  <h3 className="text-sm text-gray-900">{productData?.name}</h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">Size:</dt>
                      <dd className="inline font-medium ml-1">{item.size}</dd>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 bg-blue-50 rounded-4xl p-1 w-fit">
                        <button
                          className="px-1 text-[15px] bg-primary text-white rounded-full"
                          onClick={() => decrement(item?._id, item?.size)}
                        >
                          -
                        </button>
                        <p className="text-[15px]">{quantities[key]}</p>
                        <button
                          className="px-1 text-[15px] bg-primary text-white rounded-full"
                          onClick={() => increment(item?._id, item?.size)}
                        >
                          + 
                        </button>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                  <div className="flex flex-col gap-2">
                    <button className="text-gray-600 transition hover:text-red-600">
                      <span className="sr-only">Remove item</span>
                      <FiDelete />
                    </button>
                    <h1 className="text-[20] font-bold">
                      {currency}
                      {productData?.price}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <CartTotal />
        <Link className="px-3 py-1 rounded-2xl bg-primary w-fit text-white" href={"/checkout"}>Proceedr To Checkout</Link>
      </div>

    </div>
  );
};

export default page;
