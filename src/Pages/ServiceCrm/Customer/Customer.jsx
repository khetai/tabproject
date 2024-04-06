import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import Paginations from "./Paginations";
import { NavLink } from "react-router-dom";
function Customer() {
  const [filter, setFilter] = useState(false);
  const [status, setStatus] = useState(null);
  const [date, setDate] = useState(null);
  const [code, setCode] = useState(null);
  const [number, setNumber] = useState(null);
  useEffect(() => {
    console.log("start");
  }, []);
  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>XİDMƏTLƏRİN GÖSTƏRİLMƏSİ</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <img
                className={filter ? style.FilterActive : style.Filter}
                onClick={e => setFilter(!filter)}
                src={"/icons/filterdark.svg"}
                alt=""
              />
            </li>
          </ul>
        </div>
        <div className={filter ? style.HeadFilteractive : style.HeadFilter}>
          <ul className={style.FilterItems}>
            <li className={style.FilterItem}>
              <label>Ad</label>
              <input placeholder="Ad..." />
            </li>

            <li className={style.FilterItem}>
              <label>VÖEN</label>
              <input placeholder="VÖEN..." type="text" />
            </li>

            <li className={style.FilterItem}>
              <label>Müştəri kodu</label>
              <input placeholder="Müştəri kodu" />
            </li>
            <li className={style.FilterItem}>
              <button className={style.SearchButton}>Axtar</button>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.Body}>
        <Paginations status={status} date={date} number={number} code={code} />
      </div>
    </div>
  );
}

export default Customer;
