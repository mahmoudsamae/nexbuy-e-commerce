"use client";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addProductToCart, getAllProduct, getCartData, updateCartData } from "../_utilts/productAPIs";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isShowSearch, setIsShowSearch] = useState(true);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const currency = "$";
  const delivery_charges = 10;

  // add product to cart
  const addToCart = async (itemID, size) => {
    if (!size) {
      toast.error("Please, select size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemID]) {
      if (cartData[itemID][size]) {
        cartData[itemID][size] += 1;
      } else {
        cartData[itemID][size] = 1;
      }
    } else {
      cartData[itemID] = {};
      cartData[itemID][size] = 1;
    }

    if (token) {
      try {
        const response = await addProductToCart(itemID, size, token);
        if (response.success) {
          getCartProducts(token);
          toast.success(response.message, { position: "top-center" });
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message, {position: "top-center"})
      }
    }
  };

  // remove product 


  
  // get Cart Data 
  const getCartProducts = async (token) => {
    try {
      const response = await getCartData(token);
      if(response.success){
        setCartItems(response.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { position: "top-center" });
    }
  } 

  // get cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (let items in cartItems) {
      for (let item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  // get cart total
  const getCartTotal = () => {
    let total = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product?._id === items);
      for (const item in cartItems[items]) {
        try {
          total += itemInfo?.price * cartItems[items][item];
        } catch (error) {
          console.log(error);
        }
      }
    }
    return total;
  };

  // update quantity
  const updateQuantity = async (itemID, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemID][size] = quantity;
    setCartItems(cartData);

    if(token){
      try{
        const response = await updateCartData(itemID, size, quantity, token);
        if (response.success) {
          toast.success(response.message, { position: "top-center" });
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message, {position: "top-center"})
      }
    }
  };

  const getAllProducts_ = async () => {
    try {
      const response = await getAllProduct();
      if (response.success) {
        setProducts(response.products);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getCartProducts(localStorage.getItem("token"));
    }
    getAllProducts_();
  }, []);

  const values = {
    products,
    currency,
    delivery_charges,
    isShowSearch,
    setIsShowSearch,
    search,
    setSearch,
    token,
    setToken,
    addToCart,
    getCartCount,
    cartItems,
    updateQuantity,
    getCartTotal,
    setCartItems,
  };

  return <ShopContext value={values}>{children}</ShopContext>;
};

export default ShopContextProvider;
