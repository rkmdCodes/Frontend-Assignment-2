import {  useContext  } from "react";
import { DataContext } from "../contex/DataProvider";
import "../style/style.css";

const Search = () => {

  const {setSearchTerm} = useContext(DataContext);
  const {dataArray} = useContext(DataContext);
  const {setDataArray} = useContext(DataContext);
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setDataArray([...dataArray])
  };

  return (
    <div >
    <input
    className="searchBox"
    type="text"
    onChange={handleSearch}
    placeholder="search by Email, Name, or Role..."
   />
    </div>
  );
};

export default Search;