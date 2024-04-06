import React, { useState } from "react";
import style from "./index.module.css";
import Paginations from "./paginations";
import styled from "styled-components";
import Modal from "../../../../Components/Modal/Modal";

function Departments({ funcval, double }) {
  const [isServiceOpen, toggleService] = useState(false);

  const initial = {
    departmentId: null,
    departmentName: null,
  };
  const [dbDetail, setDbDetail] = useState(initial);
  function handleAddModal() {
    setDbDetail(initial);
    toggleService(true);
  }
  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Şöbə kataloqu</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <button
                className={style.HeadAddButton}
                onClick={() => handleAddModal()}
              >
                <img src="/icons/plus-circle-svgrepo-com 1.svg" alt="" />
                <span>Yeni</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.Body}>
        <Paginations
          dbDetail={dbDetail}
          setDbDetail={setDbDetail}
          toggleService={toggleService}
          isServiceOpen={isServiceOpen}
          double={double}
          funcval={funcval}
        />
      </div>
    </div>
  );
}
export default Departments;
