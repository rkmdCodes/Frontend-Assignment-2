import React from "react";
import Search from "../component/SearchBox";
import Table from "../component/DataTable";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "../style/style.css";

const Home = () => {
  return (
    <>
      <Header />
      <Search />
      <div className="table-footer-container"  >
        <Table />
        <Footer />
      </div>
    </>
  );
};

export default Home;
