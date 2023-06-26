import React, { useContext, useState ,useEffect } from "react";
import { DataContext } from "../contex/DataProvider";
import { deleteSelected } from "../utils/utility";
import First from "../assets/first.png";
import Last from "../assets/last.png";
import Next from "../assets/next.png";
import Prev from "../assets/prev.png";
import "../style/style.css";

function paginationButtonControl(event, page, setPage , setClickedButton) {
  setClickedButton(event.target.value);
  setPage([event.target.value * 10 - 10, event.target.value * 10]);
}

function handleNextPageClick(page, dataArray, setPage) {
  if (page[0] + 10 < dataArray.length) {
    setPage([page[0] + 10, page[1] + 10]);
  }
}

function handlePrevPageClick(page, dataArray, setPage) {
  if (page[0] - 10 >= 0 && page[0] - 10 <= dataArray.length) {
    setPage([page[0] - 10, page[1] - 10]);
  }
}

function handleFirstPageJumpClick(page, setPage) {
  setPage([0, 10]);
}

function handleLastPageJumpClick(dataArray, page, setPage) {
  setPage([
    parseInt(dataArray.length / 10) * 10,
    parseInt(dataArray.length / 10) * 10 + 10,
  ]);
}

let dynammicStyle = {};

const Footer = () => {
  const [clickedButton , setClickedButton] = useState(1);
  const { select } = useContext(DataContext);
  const { setSelect } = useContext(DataContext);
  const { selectAllChecked } = useContext(DataContext);
  const { setSelectAllChecked } = useContext(DataContext);
  const { dataArray } = useContext(DataContext);
  const { setDataArray } = useContext(DataContext);
  const { buttonCount } = useContext(DataContext);
  const { page } = useContext(DataContext);
  const { setPage } = useContext(DataContext);



  var buttons = [];
  for (let i = 1; i <= Math.ceil(buttonCount / 10); i++) {
    buttons.push(i);
  }

  console.log("footer is rendering")

  return (
    <>
      <div className="footer-container">
        <div>
          <button
            onClick={() =>
              deleteSelected(
                select,
                dataArray,
                setDataArray,
                selectAllChecked,
                setSelectAllChecked,
                setSelect,
                page,
                setPage
              )
            }
            className="button"
          >
            Delete Selected
          </button>
        </div>
        <div className="footer-pagination-buttons">
          <div>
            <img
              onClick={() => handleFirstPageJumpClick(page, setPage)}
              className="logo pagination-control-icon"
              src={First}
            />
          </div>
          <div className="inside-contaier">
            <div>
              <img
                onClick={() => handlePrevPageClick(page, dataArray, setPage)}
                className="logo pagination-control-icon"
                src={Prev}
              />
            </div>
            {
              <div className="inside-buttons-container">
                {buttons.map((butt,index) => {
                
                  if(index === clickedButton-1)
                  {
                   
                    dynammicStyle = {
                      'backgroundColor':'white ',
                      'border':'1px solid black',
                      'color':'black'
                    }
                  }
                  else 
                     dynammicStyle = {
                      'backgroundColor': 'rgb(165, 246, 246)',
                      'border':'1px solid black',
                      'color':'black'
                     }
                  return (<button
                    key={butt}
                    value={butt}
                    style={dynammicStyle}
                    onClick={(event) =>
                      paginationButtonControl(event, page, setPage , setClickedButton)
                    }
                    className="pagination-control-icon"
                  >
                    {butt}
                  </button>)
                  })}
              </div>
            }
            <div>
              <img
                onClick={() => handleNextPageClick(page, dataArray, setPage)}
                className="logo pagination-control-icon"
                src={Next}
              />
            </div>
          </div>

          <div>
            <img
              onClick={() => handleLastPageJumpClick(dataArray, page, setPage)}
              className="logo pagination-control-icon"
              src={Last}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
