import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import Paginations from "./Paginations";
import { NavLink } from "react-router-dom";

function IncomeCase() {
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
            <h3>KASSAYA MƏDAXİL</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <img
                className="Filter"
                onClick={e => setFilter(!filter)}
                src={"/icons/filterdark.svg"}
                alt=""
              />
            </li>
            <li>
              <NavLink to="/NewService">
                <button className={style.HeadAddButton}>
                  <img src="/icons/pluscircle.svg" alt="" />
                  <span>Yeni</span>
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={filter ? style.HeadFilteractive : style.HeadFilter}>
          <ul className={style.FilterItems}>
            <li className={style.FilterItem}>
              <label>Tarix</label>
              <input placeholder="Tarix..." />
            </li>
            <li className={style.FilterItem}>
              <label>Nömrə</label>
              <input placeholder="Nömrə..." type="number" />
            </li>
            <li className={style.FilterItem}>
              <label>VÖEN</label>
              <input placeholder="VÖEN..." type="text" />
            </li>
            <li className={style.FilterItem}>
              <label>Müştəri</label>
              <select onChange={e => setStatus(e.target.value)}>
                <option>Müştəri</option>
                <option value={1}>Natamam ödənilib</option>
                <option value={2}>Ödənilib</option>
                <option value={3}>Ləğv edilib</option>
                <option value={4}>Hazırlanıb</option>
              </select>
            </li>
            <li className={style.FilterItem}>
              <label>ƏDV məbləği</label>
              <input placeholder="Müştəri tipi..." />
            </li>
            <li className={style.FilterItem}>
              <label>Müştəri kodu</label>
              <input placeholder="Müştəri kodu" />
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

export default IncomeCase;
