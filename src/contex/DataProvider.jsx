import { createContext, useState } from "react"

export const DataContext = createContext(null);

const DataProvider = ({children})=>{

    const [dataArray, setDataArray] = useState([]);
    const [buttonCount, setButtonCount] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState([0, 10]);
    const [select, setSelect] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [editMode, setEditMode] = useState({});
  

    return (
        <DataContext.Provider value = {{
            dataArray,
            setDataArray,
            searchTerm,
            setSearchTerm,
            page,
            setPage,
            select,
            setSelect,
            selectAllChecked,
            setSelectAllChecked,
            editMode,
            setEditMode,
            buttonCount,
            setButtonCount 
        }}>
        {children}
        </DataContext.Provider>
    )

}

export default DataProvider;