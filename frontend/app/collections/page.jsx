"use client";
import React, { useContext, useEffect, useState } from "react";
import ShowSearch from "./components/ShowSearch";
import { ShopContext } from "../_context/ShopContext";
import ProductItem from "../_components/ProductItem";

const page = () => {
  const { products, search, isShowSearch } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sort, setSort] = useState("relevant");
  const [filterdProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8

  const filterFilter = (value, setState) => {
    const cleanValue = value.trim();
    setState((prev) =>
      prev.includes(cleanValue)
        ? prev.filter((item) => item !== cleanValue)
        : [...prev, cleanValue]
    );
  };

  const applyFilter = () => {
    let filtered = [...products];
    if (search && isShowSearch) {
      filtered = filtered.filter((product) =>
        product?.name?.toLowerCase().includes(search?.toLowerCase())
      );
    }

    if (category.length) {
      filtered = filtered.filter((product) =>
        category.includes(product?.category)
      );
    }
    if (subCategory.length) {
      filtered = filtered.filter((product) =>
        subCategory.includes(product?.subCategory)
      );
    }

    return filtered;
  };

  const applySort = (productList) => {
    switch (sort) {
      case "low":
        return productList.sort((a, b) => a.price - b.price);
      case "high":
        return productList.sort((a, b) => b.price - a.price);
      default:
        return productList;
    }
  };

  useEffect(() => {
    let filtered = applyFilter();
    let sorted = applySort(filtered);
    setFilteredProducts(sorted);
    setCurrentPage(1);
  }, [category, subCategory, products, sort, search, isShowSearch]);
  
  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterdProducts.slice(startIndex, endIndex);
  }
  
  const totalPage = Math.ceil(filterdProducts.length / itemsPerPage)
  return (
    <section>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full flex flex-col gap-1.5 min-w-50 sm:w-50 m-2 rounded-2xl bg-blue-50 px-5">
          <ShowSearch />
          <div className="flex gap-3 justify-between sm:flex-col pb-2">
            <div className="p-2 rounded-2xl bg-white">
              <h5 className="font-medium">Category</h5>
              <div className="flex flex-col">
                {["Men", "Women", "Kids"].map((cat) => (
                  <label
                    key={cat}
                    className="flex gap-2 font-medium text-gray-500 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={cat}
                      className="w-3"
                      onChange={(e) =>
                        filterFilter(e.target.value, setCategory)
                      }
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
            <div className="p-2 rounded-2xl bg-white">
              <h5 className="font-medium">Types</h5>
              <div className="flex flex-col">
                {["Topwaer", "Bottomwaer", "Winterwaer"].map((subCat) => (
                  <label
                    key={subCat}
                    className="flex gap-2 font-medium text-gray-500 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={subCat}
                      className="w-3"
                      onChange={(e) =>
                        filterFilter(e.target.value, setSubCategory)
                      }
                    />
                    {subCat}
                  </label>
                ))}
              </div>
            </div>
            <div className="p-2 rounded-2xl bg-white">
              <h5 className="font-medium">Sort By</h5>
              <div className="flex flex-col gap-2">
                <select
                  onChange={(e) => setSort(e.target.value)}
                  className="border border-slate-900/10 rounded-2xl outline-none py-1 px-2"
                >
                  <option value="relevant">Relevant</option>
                  <option value="low">Low</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 md:p-2 m-2 bg-blue-50 rounded-2xl ">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {getPaginatedProducts().length > 0 ? (
              getPaginatedProducts().map((product) => (
                <ProductItem key={product._id} product={product} />
              ))
            ) : (
              <div className="w-[70vw] text-center font-bold py-40">
                No Product Found For Selected Filters.
              </div>
            )}
          </div>
          {/* pagination */}
          {getPaginatedProducts().length > 0 && (
            <div className="flexCenter flex-wrap gap-4 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`${
                  currentPage === 1 && "opacity-50 cursor-not-allowed"
                } bg-primary py-1 px-3 rounded-4xl text-white cursor-pointer`}
              >
                Prev
              </button>
              {Array.from({ length: totalPage }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`${
                    currentPage === index + 1 && "bg-black text-white"
                  } px-3 py-1 cursor-pointer rounded-full`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPage}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`${
                  currentPage === totalPage && "opacity-50 cursor-not-allowed"
                } bg-primary py-1 px-3 rounded-4xl text-white cursor-pointer`}
              >
                Prev
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
