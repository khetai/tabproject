import React, { useState } from "react";
import Paginations from "./paginations";
import style from "./index.module.css";
export default function ServicesCat() {
  const [isServiceOpen, toggleService] = useState(false);
  const initial = {
    groupId: null,
    groupName: null,
  };
  const [addValue, setAddValue] = useState(initial);
  function addModalOpen() {
    toggleService(true)
    setAddValue(initial)
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
              <button
                onClick={() => {
                  toggleService(true);
                  setAddValue(initial);
                }}
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
        <Paginations
          toggleService={toggleService}
          isServiceOpen={isServiceOpen}
          setAddValue={setAddValue}
          addValue={addValue}
        />
      </div>
    </div>
  );
}
