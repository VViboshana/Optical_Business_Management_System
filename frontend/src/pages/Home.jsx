import React from "react";
import Banner from "../components/Banner";
import News from "../components/News";
import Footer from "../components/Footer";
import NavBar2 from '../components/NavBar2'

const Home = () => {
  return (
    <>
      <NavBar2/>
      <Banner />
      <News />
      <Footer/>
    </>
  );
};

export default Home;