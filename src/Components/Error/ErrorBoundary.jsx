import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNot } from "../../Store/auth";
import style from "./index.module.css";

function ErrorBoundary() {
  const { error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(error);
    setTimeout(() => {
      dispatch(changeNot({ message: null }));
    }, 8000);
  }, [error]);

  return error && <div className={style.bottomrighterror}>Xəta: {error}</div>;
}

export default ErrorBoundary;
