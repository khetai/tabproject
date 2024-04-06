import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/auth";
const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    console.log("exit");
    // dispatch(changeStatus({ status: null }));
  };
  const { userFullName } = useSelector(state => state.auth);

  return (
    <>
      {/* <div className={style.head_search}>
        <input placeholder={`Axtarış...`} />
        <img src="/icons/Vectorloop.svg" alt="" />
      
      </div>
      <div className={style.head_userinfo}>
        <ul>
          <li>
            <img
              className={style.userinfoicon}
              src={"/icons/user 1.svg"}
              alt=""
            />
          </li>
          <li>
            <span className={style.userName}>{userFullName}</span>
          </li>
          <li>
            <button onClick={handleLogout}>
              <img  src="/icons/logout (2).svg" alt="" />
              <span>Çıxış</span>
            </button>
          </li>
        </ul>
      </div> */}
    </>
  );
};

export default Header;
