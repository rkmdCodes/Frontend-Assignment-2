import { useState , useContext  } from "react";
import { DataContext } from "../contex/DataProvider";
import "../style/style.css";

const Search = () => {

  const {setSearchTerm} = useContext(DataContext);
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  return (
    <div >
    <input
    className="searchBox"
    type="text"
    onChange={handleSearch}
    placeholder="search by email, name, or role..."
   />
    </div>
  );
};

export default Search;