import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSuccess } from "../../Store/auth";
import style from "./index.module.css";

function Success() {
  const { success } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(success);
    setTimeout(() => {
      dispatch(changeSuccess({ message: null }));
    }, 3000);
  }, [success]);

  return (
    success && <div className={style.bottomrightSuccess}>Uğurlu: {success}</div>
  );
}

export default Success;
