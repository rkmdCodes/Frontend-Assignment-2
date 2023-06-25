import React, { useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "../contex/DataProvider";
import {
  handleDelete,
  handleSelectAll,
  handleCheckboxChange,
  handleEdit,
  handleCancel,
  handleSave,
} from "../utils/utility";
import delIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";
import saveIcon from "../assets/save.png";
import Footer from "./footer";
import "../style/style.css";

const Table = () => {
  const { dataArray } = useContext(DataContext);
  const { setDataArray } = useContext(DataContext);
  const { searchTerm } = useContext(DataContext);
  const { page } = useContext(DataContext);
  const { setPage } = useContext(DataContext);
  const { select } = useContext(DataContext);
  const { setSelect } = useContext(DataContext);
  const { selectAllChecked } = useContext(DataContext);
  const { setSelectAllChecked } = useContext(DataContext);
  const { editMode } = useContext(DataContext);
  const { setEditMode } = useContext(DataContext);

  let styleObject = {};

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

  const filteredData = dataArray.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.role.toLowerCase().includes(searchTerm)
  );

  const currentPageData = filteredData.slice(page[0], page[1]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={(event) =>
                  handleSelectAll(
                    event,
                    dataArray,
                    page,
                    select,
                    setSelect,
                    setSelectAllChecked
                  )
                }
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
                backgroundColor: "rgba(128, 128, 128, 128)",
                color: "white",
                transition: "background-color 0.6s ease, transform 0.4s ease",
              };
            } else {
              styleObject = {
                transition: "background-color 0.6s ease",
                color: "black",
              };
            }
            return (
              <tr key={data.id} style={styleObject}>
                <td>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(event) =>
                      handleCheckboxChange(event, data.id, select, setSelect)
                    }
                  />
                </td>
                <td>
                  {inEditMode ? (
                    <input
                      type="text"
                      value={data.name}
                      onChange={(event) =>
                        handleSave(
                          data.id,
                          "name",
                          event.target.value,
                          dataArray,
                          setDataArray
                        )
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
                        handleSave(
                          data.id,
                          "email",
                          event.target.value,
                          dataArray,
                          setDataArray
                        )
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
                        handleSave(
                          data.id,
                          "role",
                          event.target.value,
                          dataArray,
                          setDataArray
                        )
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
                        src={saveIcon}
                        alt="Save"
                        onClick={() => handleCancel(data.id, setEditMode)}
                      />
                      <img
                        className="logo"
                        src={delIcon}
                        alt="Cancel"
                        onClick={() =>
                          handleSave(
                            data.id,
                            data.name,
                            data.email,
                            data.role,
                            dataArray,
                            setDataArray
                          )
                        }
                      />
                    </>
                  ) : (
                    <>
                      <img
                        className="logo"
                        src={editIcon}
                        alt="Edit"
                        onClick={() => handleEdit(data.id, setEditMode)}
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
