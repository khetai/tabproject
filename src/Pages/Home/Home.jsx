import React from "react";
import style from "./index.module.css";
import Notifigation from "../../Components/Notifigation/Notifigation";
const Home = () => {
  return (
    <div className={style.container}>
      <div className={style.Body}>
        <Notifigation />
      </div>
    </div>
  );
};

export default Home;
