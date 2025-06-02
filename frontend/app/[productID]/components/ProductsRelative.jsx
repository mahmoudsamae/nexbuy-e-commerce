"use client"
import ProductItem from '@/app/_components/ProductItem';
import Title from '@/app/_components/Title';
import { ShopContext } from '@/app/_context/ShopContext'
import React, { useContext, useEffect, useState } from 'react'

const ProductsRelative = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relative, setRelative] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      let filtered = products;
      filtered = filtered.filter(item => item.category === category);
      filtered = filtered.filter(item => item.subCategory === subCategory);
      setRelative(filtered.slice(0, 5))
      
    }
  }, [products]);
  return (
    <section>
      <div className="">
        <Title title1={"Relative"} title2={"Products"} />
        <div className="mt-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {relative?.map((product) => (
            <ProductItem key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsRelative