import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";
import style from "./index.module.css";
import Success from "../Error/Success";
import Toast from "../Error/Toast";
const Layout = () => {
  const [minimize, setMinimize] = useState();
  useEffect(() => {
    const storedMinimize = localStorage.getItem("minimized");
    if (storedMinimize !== null) {
      setMinimize(JSON.parse(storedMinimize));
    }
  }, [minimize]);
  return (
    <div style={{ display: "flex", background: "#F6F6F6" }}>
      <Nav setMinimize={setMinimize} minimize={minimize} />
      <main>
        {/* <header
          className={!minimize ? style.minimizeHeader : style.notminimize}
        >
          <Header />
        </header> */}

        <Success />
        <div className={style.container}>
          <Outlet /> {/* Render the Outlet component directly */}
        </div>
      </main>
      <Toast />
    </div>
  );
};

export default Layout;
