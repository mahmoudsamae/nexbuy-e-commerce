import Title from "@/app/_components/Title";
import { ShopContext } from "@/app/_context/ShopContext";
import React, { useContext } from "react";

const CartTotal = () => {
  const { currency, getCartTotal, delivery_charges } = useContext(ShopContext);
  return (
    <section>
      <div className="">
        <Title title1={"Cart"} title2={"Total"} />
      </div>
      <div className="flex items-center justify-between">
        <h5>SubTotal :</h5>
        <h5>
          {currency}
          {getCartTotal()}.00
        </h5>
      </div>
      <hr className="mx-auto w-full text-gray-500 my-2" />
      <div className="flex items-center justify-between">
        <h5>Shipping Free :</h5>
        <h5>
          {getCartTotal() === 0 ? "0.00" : `${currency}${delivery_charges}.00`}
        </h5>
      </div>
      <hr className="mx-auto w-full text-gray-500 my-2" />
      <div className="flex items-center justify-between">
        <h5>Total :</h5>
        <h5>
          {currency}
          {getCartTotal() === 0 ? "0.00" : getCartTotal() + delivery_charges}.00
        </h5>
      </div>
    </section>
  );
};

export default CartTotal;
