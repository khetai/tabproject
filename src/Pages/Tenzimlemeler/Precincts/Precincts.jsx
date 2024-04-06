import React, { useState } from "react";
import style from "./index.module.css";
import Paginations from "./paginations";
import { useParams } from "react-router-dom";

function Precincts({ double, funcval }) {
  const [isServiceOpen, toggleService] = useState(false);
  const { id } = useParams();
  const initial = {
    precinctId: null,
    precinctDepartmentId: Number(id),
    precinctName: null,
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
            <h3>Məntəqə kataloqu</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <span
                className={style.HeadAddButton}
                onClick={() => handleAddModal()}
              >
                {" "}
                <img src="/icons/plus-circle-svgrepo-com 1.svg" alt="" />
                <span>Yeni</span>
              </span>
            </li>
            {id != null ? (
              <li>
                <a href="/#/departments">
                  <img
                    className={style.FilterActive}
                    src="/icons/back-svgrepo-com 2.svg"
                    alt=""
                  />
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
      <div className={style.Body}>
        <Paginations
          id={id}
          dbDetail={dbDetail}
          double={double}
          funcval={funcval}
          setDbDetail={setDbDetail}
          toggleService={toggleService}
          isServiceOpen={isServiceOpen}
        />
      </div>
    </div>
  );
}
export default Precincts;
