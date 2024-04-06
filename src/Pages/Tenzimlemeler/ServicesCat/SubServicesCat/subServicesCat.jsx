import React, { useState } from "react";
import Paginations from "./paginations";
import style from "./index.module.css";
import { useParams } from "react-router-dom";

export default function SubServicesCat() {
  const [isServiceOpen, toggleService] = useState(false);
  const [db, setDb] = useState([]);
  const { id } = useParams();
  const initial = {
    serviceId: 0,
    serviceName: null,
    serviceShortName: null,
    serviceCode: null,
    servicePrice: null,
    serviceEqcode: null,
    serviceUnit: null,
    serviceGroupId: Number(id),
    serviceDefaultValue: null,
    serviceBonus:0
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
            <h3>Xidmət kataloqu</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <button onClick={() => handleAddModal()}>
                {" "}
                <img
                  className={style.FilterActive}
                  src="/icons/circle-plus-solid 1.svg"
                  alt=""
                />
              </button>
            </li>
            {/* <li>
              <img
                className={style.FilterActive}
                src={"/icons/filterdark.svg"}
                alt=""
              />
            </li> */}
            <li>
              <button>
                <a href="#/servicesCat">
                  <img
                    className={style.FilterActive}
                    src="/icons/back-svgrepo-com 2.svg"
                    alt=""
                  />
                </a>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.Body}>
        <Paginations
          toggleService={toggleService}
          isServiceOpen={isServiceOpen}
          setDb={setDb}
          db={db}
          dbDetail={dbDetail}
          setDbDetail={setDbDetail}
        />
      </div>
    </div>
  );
}
