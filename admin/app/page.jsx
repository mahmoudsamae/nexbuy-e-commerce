"use client";
import { useContext, useState } from "react";
import { UserContext } from "./_context/userContext";
import Login from "./_components/Login";
import { useForm } from "react-hook-form";
import Image from "next/image";
import axios from "axios";
import { backend_url } from "./layout";
import { toast } from "react-toastify";

export default function Add() {
  const { token } = useContext(UserContext);
  const [sizes, setSizes] = useState([]);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [popular, setPopular] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true)
    const subData = data;
    try {
      const formData = new FormData();
      formData.append("name", subData.name);
      formData.append("description", subData.description);
      formData.append("category", subData.category);
      formData.append("price", subData.price);
      formData.append("subCategory", subData.subCategory);
      formData.append("popular", popular);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backend_url + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if(response.data.success){
        toast.success(response.data.message);
        reset({
          name: "",
          description: "",
          category: "Men",
          subCategory: "Topware",
          price: "",
        });
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setSizes([]);
        setPopular(false)
        setIsLoading(false)
      }else{
        toast.error(response.data.message)
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      setIsLoading(false);
    }
  };
  return (
    <div>
      {token === "" ? (
        <Login />
      ) : (
        <div className="w-full flex justify-center flex-col items-center gap-2 px-3">
          <h1 className="text-center font-bold text-[20px] sm:text-[26px] mt-2">
            Add Product
          </h1>
          <div className=" w-full sm:w-[80%] md:w-[70%] lg:w-[40%] shadow-2xl shadow-primary rounded-2xl bg-white py-3 px-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-1"
            >
              {/* Product Name  */}
              <label htmlFor="name">
                <p className="text-gray-400 font-medium text-[13px] mb-1">
                  Product Name
                </p>
                <input
                  {...register("name", { required: true })}
                  id="name"
                  placeholder="type here..."
                  className="bg-blue-50 w-full rounded-2xl px-3 py-2 border-none outline-none text-[13px]"
                />
                {errors.name && (
                  <p className="text-[13px] text-red-500">field is required.</p>
                )}
              </label>
              {/* Product Description  */}
              <label htmlFor="description">
                <p className="text-gray-400 font-medium text-[13px] mb-1">
                  Product Description
                </p>
                <textarea
                  {...register("description", { required: true })}
                  id="description"
                  placeholder="type here..."
                  rows={4}
                  className="bg-blue-50 w-full py-3 rounded-2xl px-3 resize-none  border-none outline-none text-[13px]"
                />
                {errors.description && (
                  <p className="text-[13px] text-red-500">field is required.</p>
                )}
              </label>

              {/* Product Category & subCategory & price  */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 justify-between">
                {/* Product Category */}
                <label htmlFor="category">
                  <p className="text-gray-400 font-medium text-[13px] mb-1">
                    Category
                  </p>
                  <select
                    {...register("category")}
                    className="bg-blue-50 py-2 rounded-2xl px-3 resize-none  border-none outline-none text-[13px]"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </label>
                {/* Product subCategory */}
                <label htmlFor="subCategory">
                  <p className="text-gray-400 font-medium text-[13px] mb-1">
                    Sub Category
                  </p>
                  <select
                    {...register("subCategory")}
                    className="bg-blue-50 py-2 rounded-2xl px-3 resize-none  border-none outline-none text-[13px]"
                  >
                    <option value="Topware">Topware</option>
                    <option value="Bottomware">Bottomware</option>
                    <option value="Winterware">Winterware</option>
                  </select>
                </label>
                {/* Product Price */}
                <label htmlFor="price">
                  <p className="text-gray-400 font-medium text-[13px] mb-1">
                    Price
                  </p>
                  <input
                    {...register("price", { required: true })}
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="10.00"
                    className="bg-blue-50 w-full rounded-2xl px-3 py-2 border-none outline-none text-[13px]"
                  />
                  {errors.price && (
                    <p className="text-[13px] text-red-500">
                      field is required.
                    </p>
                  )}
                </label>
              </div>
              {/* Product Sizes */}
              <div className="">
                <p className="text-gray-400 font-medium text-[13px] mb-1">
                  Category
                </p>
                <div className="">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes("XS")
                            ? prev.filter((item) => item !== "XS")
                            : [...prev, "XS"]
                        )
                      }
                      className={`${
                        sizes.includes("XS")
                          ? "bg-primary text-white"
                          : "bg-blue-50"
                      } w-8 h-8 flex justify-center cursor-pointer items-center text-[13px] rounded-full `}
                    >
                      <span>XS</span>
                    </div>
                    <div
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes("S")
                            ? prev.filter((item) => item !== "S")
                            : [...prev, "S"]
                        )
                      }
                      className={`${
                        sizes.includes("S")
                          ? "bg-primary text-white"
                          : "bg-blue-50"
                      } w-8 h-8 flex justify-center cursor-pointer items-center text-[13px] rounded-full `}
                    >
                      <span>S</span>
                    </div>
                    <div
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes("M")
                            ? prev.filter((item) => item !== "M")
                            : [...prev, "M"]
                        )
                      }
                      className={`${
                        sizes.includes("M")
                          ? "bg-primary text-white"
                          : "bg-blue-50"
                      } w-8 h-8 flex justify-center cursor-pointer items-center text-[13px] rounded-full`}
                    >
                      <span>M</span>
                    </div>
                    <div
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes("L")
                            ? prev.filter((item) => item !== "L")
                            : [...prev, "L"]
                        )
                      }
                      className={`${
                        sizes.includes("L")
                          ? "bg-primary text-white"
                          : "bg-blue-50"
                      } w-8 h-8 flex justify-center cursor-pointer items-center text-[13px] rounded-full`}
                    >
                      <span>L</span>
                    </div>
                    <div
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes("XL")
                            ? prev.filter((item) => item !== "XL")
                            : [...prev, "XL"]
                        )
                      }
                      className={`${
                        sizes.includes("XL")
                          ? "bg-primary text-white"
                          : "bg-blue-50"
                      } w-8 h-8 flex justify-center cursor-pointer items-center text-[13px] rounded-full`}
                    >
                      <span>XL</span>
                    </div>
                    <div
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes("XXL")
                            ? prev.filter((item) => item !== "XXL")
                            : [...prev, "XXL"]
                        )
                      }
                      className={`${
                        sizes.includes("XXL")
                          ? "bg-primary text-white"
                          : "bg-blue-50"
                      } w-8 h-8 flex justify-center cursor-pointer items-center text-[13px] rounded-full`}
                    >
                      <span>XXL</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div className="">
                <p className="text-gray-400 font-medium text-[13px] mb-1">
                  Images
                </p>
                <div className="flex items-center gap-3">
                  <label htmlFor="image1">
                    <Image
                      src={
                        image1
                          ? URL.createObjectURL(image1)
                          : "/assets/upload_icon.png"
                      }
                      width={40}
                      height={40}
                      alt="image1"
                      className="rounded-md cursor-pointer"
                    />
                    <input
                      onChange={(e) => setImage1(e.target.files[0])}
                      type="file"
                      name="image1"
                      id="image1"
                      hidden
                    />
                  </label>
                  <label htmlFor="image2">
                    <Image
                      src={
                        image2
                          ? URL.createObjectURL(image2)
                          : "/assets/upload_icon.png"
                      }
                      width={40}
                      height={40}
                      alt="image2"
                      className="rounded-md cursor-pointer"
                    />
                    <input
                      onChange={(e) => setImage2(e.target.files[0])}
                      type="file"
                      name="image2"
                      id="image2"
                      hidden
                    />
                  </label>
                  <label htmlFor="image3">
                    <Image
                      src={
                        image3
                          ? URL.createObjectURL(image3)
                          : "/assets/upload_icon.png"
                      }
                      width={40}
                      height={40}
                      alt="image3"
                      className="rounded-md cursor-pointer"
                    />
                    <input
                      onChange={(e) => setImage3(e.target.files[0])}
                      type="file"
                      name="image3"
                      id="image3"
                      hidden
                    />
                  </label>
                  <label htmlFor="image4">
                    <Image
                      src={
                        image4
                          ? URL.createObjectURL(image4)
                          : "/assets/upload_icon.png"
                      }
                      width={40}
                      height={40}
                      alt="image4"
                      className="rounded-md cursor-pointer"
                    />
                    <input
                      onChange={(e) => setImage4(e.target.files[0])}
                      type="file"
                      name="image4"
                      id="image4"
                      hidden
                    />
                  </label>
                </div>
              </div>

              {/* Product Popular */}
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => setPopular((prev) => !prev)}
                  type="checkbox"
                  checked={popular}
                  id="popular"
                  className="cursor-pointer"
                />
                <label htmlFor="popular" className="text-[13px] font-medium text-gray-500">Add To Popular</label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-fit px-3 py-1 font-medium text-white rounded-4xl  ${
                  isLoading ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-primary"
                }`}
              >
                {isLoading ? "Adding..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
