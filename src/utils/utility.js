export function handleDelete(id, dataArray, setDataArray) {
  setDataArray([...dataArray.filter((element, index) => element.id !== id)]);
}

export function handleChecked(event, id, select, setSelect) {
  const arr = [...select];
  if (event.target.checked) {
    setSelect([...select, id]);
  } else {
    setSelect([...select.filter((item) => item !== id)]);
  }
}

export function deleteSelected(
  select,
  dataArray,
  setDataArray,
  setSelect,
  page,
  setPage
) {
  if (confirm("Selected Rows will be deleted")) {
    setDataArray([...dataArray.filter((value) => !select.includes(value.id))]);
    setSelect([]);
  }
}

export function selectAll(event, dataArray, start, end, select, setSelect) {
  if (event.target.checked) {
    var arr = [];
    for (var i = start; i < end && i < dataArray.length; i++) {
      arr.push(String(dataArray[i].id));
    }
    setSelect([...arr]);
  } else {
    setSelect([]);
  }
}
