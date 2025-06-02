import React from 'react'
import Title from './Title'
import { blogs } from '@/public/assets/data';
import Image from 'next/image';

const Blog = () => {
  return (
    <section>
      <div className="flex flex-col gap-5 p-5 mx-auto">
        <Title
          title1={"Our Ecpert"}
          title2={"Blog"}
          description={
            "Check out the top-rated products our readers love — featured in our latest reviews and guides."
          }
        />
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {blogs?.map((blog) => (
            <div
              key={blog.title}
              className="relative overflow-hidden rounded-2xl h-[200px]"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                // priority
              />
              <div className="absolute top-0 left-0 bg-black/45 w-full h-full" />
              <div className="absolute flex flex-col gap-2 bottom-4 left-4">
                <h1 className="text-[18px] font-bold text-white pr-4">
                  {blog.title}
                </h1>
                <h1 className="text-[16px] font-medium text-white mb-4">
                  {blog.category}
                </h1>
                <button className="bg-white/30 text-white py-2 px-3 rounded-full mr-4">
                  Continu Reading
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog