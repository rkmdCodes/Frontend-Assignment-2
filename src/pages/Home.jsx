import React from 'react';
import Search from '../component/SearchBox';
import Table from '../component/DataTable';
import Header from '../component/Header';
import Footer from '../component/Footer';

const Home = () => {
  return (
    <>
     <Header/>
     <Search/>
     <Table/>
     <Footer/>
    </>
  )
}


export default Home;
