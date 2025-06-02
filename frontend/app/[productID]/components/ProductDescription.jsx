import React from 'react'

const ProductDescription = () => {
  return (
    <div className=" ring-1 ring-slate-900/20">
      <div className="px-4 flex gap-8 border-b-2 border-slate-900/20">
        <button className="text-[13px] text-gray-500 font-medium border-b-2 border-primary py-2 cursor-pointer">
          Description
        </button>
        <button className="text-[13px] text-gray-500 font-medium py-2 cursor-pointer">
          Care Guide
        </button>
        <button className="text-[13px] text-gray-500 font-medium py-2 cursor-pointer">
          Size Guide
        </button>
      </div>
      <div className='p-4 flex flex-col gap-4'>
        <div className="">
          <h5 className="font-medium text-[14px]">Detail</h5>
          <p className="text-[13px] text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
            voluptatibus officiis iusto adipisci iure at voluptate consequuntur
            expedita itaque. Libero sint aspernatur adipisci, voluptatibus culpa,
            explicabo veniam corporis voluptate fuga sunt quaerat optio hic velit,
            labore eos? Ipsum sed fugit dolorem minus ea labore sequi, tempore
            vitae est perferendis eligendi.
          </p>
        </div>
        <div className="">
          <h5 className="font-medium text-[14px]">Benefit</h5>
          <ul className="list-disc px-4">
            <li className="text-[13px] text-gray-500">
              High-quality materials ensure long-lasting durability and comfort.
            </li>
            <li className="text-[13px] text-gray-500">Designed to meet the needs of modern, active lifestyles.</li>
            <li className="text-[13px] text-gray-500">Available in a wide range of sizes and trendy colors.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription