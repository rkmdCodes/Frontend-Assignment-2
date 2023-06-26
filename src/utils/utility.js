export function handleDelete(id, dataArray, setDataArray) {
  setDataArray([...dataArray.filter((element, index) => element.id !== id)]);
}

export const handleSearch = (event, dataArray, setDataArray) => {
  const searchTerm = event.target.value.toLowerCase();
  setSearchTerm(searchTerm);
};

export function deleteSelected(
  select,
  dataArray,
  setDataArray,
  selectAllChecked,
  setSelectAllChecked,
  setSelect
) {
  if (select.length > 0 && confirm("Selected Rows will be deleted")) {
    setDataArray([...dataArray.filter((value) => !select.includes(value.id))]);
    if(selectAllChecked)
       setSelectAllChecked(!selectAllChecked);
    setSelect([]);
  } else alert("Nothing is seleted....Please select something to delete!");
}

export const handleSelectAll = (
  event,
  dataArray,
  page,
  select,
  setSelect,
  setSelectAllChecked
) => {
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

export const handleCheckboxChange = (event, id, select, setSelect) => {
  const checked = event.target.checked;

  if (checked) {
    setSelect([...select, id]);
  } else {
    setSelect(select.filter((item) => item !== id));
  }
};

export const handleEdit = (id, setEditMode) => {
  setEditMode((prevEditMode) => ({ ...prevEditMode, [id]: true }));
};

export const handleCancel = (id, setEditMode) => {
  setEditMode((prevEditMode) => ({ ...prevEditMode, [id]: false }));
};

export const handleSave = (id, field, value, dataArray, setDataArray) => {
  const updatedDataArray = dataArray.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        [field]: value,
      };
    }
    return item;
  });

  setDataArray(updatedDataArray);
};
