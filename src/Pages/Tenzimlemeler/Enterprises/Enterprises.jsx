import React, { useState } from "react";
import style from "./index.module.css";
import Paginations from "./paginations";
import styled from "styled-components";
import Modal from "../../../Components/Modal/Modal";

function Enterprises() {
  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Müəsisə kataloqu</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <button
                // onClick={() => {
                //   toggleService(true);
                //   setAddValue(initial);
                // }}
                className={style.HeadAddButton}
              >
                <img src="/icons/plus-circle-svgrepo-com 1.svg" alt="" />
                <span>Yeni</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.Body}>
        <Paginations />
      </div>
    </div>
  );
}
export default Enterprises;
