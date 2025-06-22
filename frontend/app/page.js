import Banner from "./_components/Banner";
import Blog from "./_components/Blog";
import Featuers from "./_components/Featuers";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import NewArrivals from "./_components/NewArrivals";
import PopularProducts from "./_components/PopularProducts";

export default function Home() {
  return (
    <div>
      <Hero />
      <Featuers />
      <NewArrivals />
      <Banner />
      <PopularProducts />
      <Blog />
    </div>
  );
}
