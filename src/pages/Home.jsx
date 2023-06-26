import React from "react";
import Search from "../component/searchBox";
import Table from "../component/dataTable";
import Header from "../component/header";
import Footer from "../component/footer";
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
