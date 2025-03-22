import React from "react";
import Banner from "../components/Banner";
import News from "../components/News";
import Footer from "../components/Footer";
import NavBar from '../components/NavBar'

const Home = () => {
  return (
    <>
    <NavBar/>
      <Banner />
      <News />
      <Footer/>
    </>
  );
};

export default Home;