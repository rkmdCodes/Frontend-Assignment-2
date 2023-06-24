// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { handleDelete, handleChecked, selectAll } from "../utils/utility";
// import delIcon from "../assets/delete.png";
// import editIcon from "../assets/edit.png";
// import Footer from "./footer";
// import "../style/style.css";

// const Table = () => {
//   const [dataArray, setDataArray] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState([0, 10]);
//   const [select, setSelect] = useState([]);

//   let styleObject = {};
//   let checkedCheck = false;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
//         );
//         setDataArray([...response.data]);
//       } catch (error) {
//         console.log("Error", error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleSearch = (event) => {
//     const searchTerm = event.target.value.toLowerCase();
//     setSearchTerm(searchTerm);
//   };

//   const filteredData = dataArray.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchTerm) ||
//       item.email.toLowerCase().includes(searchTerm) ||
//       item.role.toLowerCase().includes(searchTerm)
//   );

//   return (
//     <>
//       <input
//         className="searchBox"
//         type="text"
//         onChange={handleSearch}
//         placeholder="search by email, name, or role..."
//       />
//       <table>
//         <thead>
//           <tr>
//             <th>
//               <input
//                 onChange={(event) =>
//                   selectAll(
//                     event,
//                     dataArray,
//                     page[0],
//                     page[1],
//                     select,
//                     setSelect
//                   )
//                 }
//                 type="checkbox"
//               />
//             </th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.slice(page[0], page[1]).map((data, index) => {
//             if (select.includes(data.id)) {
//               styleObject = {
//                 backgroundColor: "rgba(128, 128, 128, 0.5)",
//                 color: "black",
//               };
//               checkedCheck = true;
//             } else {
//               styleObject = {};
//               checkedCheck = false;
//             }

//             return (
//               <tr key={data.id} style={styleObject}>
//                 <td>
//                   <input
//                     defaultChecked={checkedCheck}
//                     onChange={(event) =>
//                       handleChecked(event, data.id, select, setSelect)
//                     }
//                     type="checkbox"
//                   />
//                   {data.id}
//                 </td>
//                 <td>{data.name}</td>
//                 <td>{data.email}</td>
//                 <td>{data.role}</td>
//                 <td>
//                   <img className="logo" src={editIcon} alt="Edit" />
//                   <img
//                     className="logo"
//                     onClick={() =>
//                       handleDelete(data.id, dataArray, setDataArray)
//                     }
//                     src={delIcon}
//                     alt="Delete"
//                   />
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <Footer
//         select={select}
//         dataArray={filteredData}
//         setDataArray={setDataArray}
//         setSelect={setSelect}
//         page={page}
//         setPage={setPage}
//       />
//     </>
//   );
// };
// export default Table;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleDelete, handleChecked, selectAll } from "../utils/utility";
import delIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";
import Footer from "./footer";
import "../style/style.css";

const Table = () => {
  const [dataArray, setDataArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState([0, 10]);
  const [select, setSelect] = useState([]);
  let styleObject = {};
  let checkedCheck = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setDataArray([...response.data]);
      } catch (error) {
        console.log("Error", error.message);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const filteredData = dataArray.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.role.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <input
        className="searchBox"
        type="text"
        onChange={handleSearch}
        placeholder="search by email, name, or role..."
      />
      <table>
        <thead>
          <tr>
            <th>
              <input
                onChange={(event) =>
                  selectAll(
                    event,
                    filteredData,
                    page[0],
                    page[1],
                    select,
                    setSelect
                  )
                }
                type="checkbox"
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(page[0], page[1]).map((data, index) => {
            if (select.includes(data.id)) {
              styleObject = {
                backgroundColor: "rgba(128, 128, 128, 0.5)",
                color: "black",
                'transition': 'all 0.4s ease',
                transform: 'scale(1.004)'
              };
              checkedCheck = true;
            } else {
              styleObject = {'transition': 'all 0.4s ease',};
              checkedCheck = false;
            }

            return (
              <tr key={data.id} style={styleObject}>
                <td>
                  <input
                    defaultChecked={checkedCheck}
                    onChange={(event) =>
                      handleChecked(event, data.id, select, setSelect)
                    }
                    type="checkbox"
                  />
                  {data.id}
                </td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
                <td>
                  <img className="logo" src={editIcon} alt="Edit" />
                  <img
                    className="logo"
                    onClick={() =>
                      handleDelete(data.id, dataArray, setDataArray)
                    }
                    src={delIcon}
                    alt="Delete"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Footer
        select={select}
        dataArray={filteredData}
        setDataArray={setDataArray}
        setSelect={setSelect}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Table;