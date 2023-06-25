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
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [editMode, setEditMode] = useState({});

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

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      const currentPageData = dataArray.slice(page[0], page[1]);
      const currentPageIds = currentPageData.map((item) => item.id);
      setSelect([...select, ...currentPageIds]);
    } else {
      const currentPageData = dataArray.slice(page[0], page[1]);
      const currentPageIds = currentPageData.map((item) => item.id);
      setSelect(select.filter((item) => !currentPageIds.includes(item)));
    }
  };

  const handleCheckboxChange = (event, id) => {
    const checked = event.target.checked;

    if (checked) {
      setSelect([...select, id]);
    } else {
      setSelect(select.filter((item) => item !== id));
    }
  };

  const handleEdit = (id) => {
    setEditMode((prevEditMode) => ({ ...prevEditMode, [id]: true }));
  };

  const handleSave = (id, name, email, role) => {
    const updatedDataArray = dataArray.map((item) => {
      if (item.id === id) {
        return { ...item, name, email, role };
      }
      return item;
    });

    setDataArray(updatedDataArray);
    setEditMode((prevEditMode) => ({ ...prevEditMode, [id]: false }));
  };

  const handleCancel = (id) => {
    setEditMode((prevEditMode) => ({ ...prevEditMode, [id]: false }));
  };

  const filteredData = dataArray.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.role.toLowerCase().includes(searchTerm)
  );

  const currentPageData = filteredData.slice(page[0], page[1]);

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
                type="checkbox"
                checked={selectAllChecked}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((data) => {
            const inEditMode = editMode[data.id];
            const isChecked = select.includes(data.id);
            if (select.includes(data.id)) {
              styleObject = {
                backgroundColor: "rgba(128, 128, 128, 0.5)",
                color: "black",
                'transition': 'all 0.4s ease',
                transform: 'scale(1.004)'
              };
             
            } else {
              styleObject = {'transition': 'all 0.4s ease',};
            
            }
            return (
              <tr key={data.id} style={styleObject}>
                <td>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(event) =>
                      handleCheckboxChange(event, data.id)
                    }
                  />
                </td>
                <td>
                  {inEditMode ? (
                    <input
                      type="text"
                      value={data.name}
                      onChange={(event) =>
                        handleSave(data.id, event.target.value, data.email, data.role)
                      }
                    />
                  ) : (
                    data.name
                  )}
                </td>
                <td>
                  {inEditMode ? (
                    <input
                      type="text"
                      value={data.email}
                      onChange={(event) =>
                        handleSave(data.id, data.name, event.target.value, data.role)
                      }
                    />
                  ) : (
                    data.email
                  )}
                </td>
                <td>
                  {inEditMode ? (
                    <input
                      type="text"
                      value={data.role}
                      onChange={(event) =>
                        handleSave(data.id, data.name, data.email, event.target.value)
                      }
                    />
                  ) : (
                    data.role
                  )}
                </td>
                <td>
                  {inEditMode ? (
                    <>
                      <img
                        className="logo"
                        src={delIcon}
                        alt="Save"
                        onClick={() => handleSave(data.id, data.name, data.email, data.role)}
                      />
                      <img
                        className="logo"
                        src={delIcon}
                        alt="Cancel"
                        onClick={() => handleCancel(data.id)}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        className="logo"
                        src={editIcon}
                        alt="Edit"
                        onClick={() => handleEdit(data.id)}
                      />
                      <img
                        className="logo"
                        src={delIcon}
                        alt="Delete"
                        onClick={() =>
                          handleDelete(data.id, dataArray, setDataArray)
                        }
                      />
                    </>
                  )}
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