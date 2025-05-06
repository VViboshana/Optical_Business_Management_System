import React from "react";
import Banner from "./Banner";
import TopSellers from "./TopSellers";
import Recommend from "./Recommend";
import News from "./News";
import NavBar from "../../../Products/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    <NavBar/>
      <Banner />
      <TopSellers />
      <Recommend />
      <News />
    </div>
  );
};

export default Home;
