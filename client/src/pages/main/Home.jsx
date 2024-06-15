import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import MainArea from "../../components/MainArea";

const Home = () => {
  return (
    <section className="pl-[330px] pt-[60px]">
      <Header />
      <Sidebar />
      <MainArea />
    </section>
  );
};

export default Home;
