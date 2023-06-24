import React from "react";
import { deleteSelected } from "../utils/utility";
import First from "../assets/first.png";
import Last from "../assets/last.png";
import Next from "../assets/next.png";
import Prev from "../assets/prev.png";
import "../style/style.css";

function paginationButtonControl(event, page, setPage) {
  setPage([event.target.value * 10 - 10, event.target.value * 10]);
}

function handleNextPageClick(page, dataArray, setPage) {
  if (page[0] + 10 < dataArray.length) {
    setPage([page[0] + 10, page[1] + 10]);
  }
}

function handlePrevPageClick(page, dataArray, setPage) {
  if (page[0] - 10 >=0 && page[0]-10 <= dataArray.length) {
    setPage([page[0] - 10, page[1] - 10]);
  }
}

function handleFirstPageJumpClick(page, setPage){
   setPage([0,10]);
}

function handleLastPageJumpClick(dataArray,page, setPage){
  setPage([parseInt(dataArray.length/10)*10,parseInt(dataArray.length/10)*10+10]);
  
}

const Footer = ({
  select,
  dataArray,
  setDataArray,
  setSelect,
  page,
  setPage,
}) => {
  

  var buttons = [];
  for (let i = 1; i <= Math.ceil(dataArray.length / 10); i++) {
    buttons.push(i);
  }

 


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
            <img onClick={()=>handleFirstPageJumpClick(page,setPage)} className="logo pagination-control-icon" src={First} />
          </div>
          <div className="inside-contaier">
            <div>
              <img onClick={() => handlePrevPageClick(page, dataArray, setPage)} className="logo pagination-control-icon" src={Prev} />
            </div>
            {
              <div className="inside-buttons-container">
                {buttons.map((butt) => (
                  <button
                    key={butt}
                    value={butt}
                    onClick={(event) =>
                      paginationButtonControl(event, page, setPage)
                    }
                    className="pagination-control-icon"
                  >
                    {butt}
                  </button>
                ))}
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
            <img onClick={()=>handleLastPageJumpClick(dataArray,page,setPage)} className="logo pagination-control-icon" src={Last} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
