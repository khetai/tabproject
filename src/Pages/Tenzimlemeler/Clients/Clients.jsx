import React, { useState, useEffect } from "react";
import Paginations from "./paginations";
import style from "./index.module.css";
import { RotatingLines } from "react-loader-spinner";
export default function Clients() {
  const [filter, setFilter] = useState(false);
  const [name, setName] = useState("");
  const [voen, setvoen] = useState("");
  const [load, setLoad] = useState(false);

  const Handlesearch = e => {
    e.preventDefault();
    setLoad(true);
    setName(e.target.name.value);
    setvoen(e.target.voen.value);
  };
  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Müştərilər</h3>
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
          </ul>
        </div>
        <div className={filter ? style.HeadFilteractive : style.HeadFilter}>
          <form
            style={{ width: "100%", padding: "0", margin: "0" }}
            onSubmit={e => Handlesearch(e)}
          >
            <ul className={style.FilterItems}>
              <li className={style.FilterItem}>
                <label>Ad, soyad</label>
                <input name="name" placeholder="Ad, Soyad..." />
              </li>
              <li className={style.FilterItem}>
                <label>VÖEN/Passport</label>
                <input name="voen" placeholder="VÖEN/Passport..." />
              </li>

              <li className={style.FilterItemButtons}>
                <button className={style.SearchButton}>
                  {load ? (
                    <RotatingLines
                      visible={true}
                      height="15"
                      width="15"
                      strokeColor="Black"
                      // color="white"
                      // strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Axtar"
                  )}
                </button>
                <button
                  type="reset"
                  className={style.ResetButton}
                  onClick={() => {
                    setName("");
                    setvoen("");
                  }}
                >
                  <img src={"/icons/share-solid 1.svg"} alt="" />
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className={style.Body}>
        <Paginations name={name} voen={voen} load={load} setLoad={setLoad} />
      </div>
    </div>
  );
}
