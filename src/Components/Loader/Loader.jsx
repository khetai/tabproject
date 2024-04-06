import React from "react";
import { Bars } from "react-loader-spinner";
import style from "./index.module.css";
const Loader = () => {
  return (
    <div className={style.loadmain}>
      <div className={style.LoadBody}>
        <div className={style.loadLogo}></div>
        <div className={style.loader}>
          <Bars
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
