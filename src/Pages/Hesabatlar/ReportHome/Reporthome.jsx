import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import { changeToast } from "../../../Store/auth";
import usePrivate from "./../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import BarChart from "./BarChart";
import ColumnChart from "./ColumnChart";
import AreaChart from "./AreaChart";
import Splinechart from "./Splinechart";
import LineChart from "./LineChart";
import { NavLink } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
function Reporthome() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filter, setFilter] = useState(false);
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [db, setDb] = useState();
  const [result, setResult] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest("GET", `Dashboard/GetReports`, null);
        console.log(res);
        if (res.isSuccess) {
          setDb(res.result);
          setResult(res.result);
        } else {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        }
      } catch (err) {
        console.error(err);
        dispatch(
          changeToast({ loading: false, type: false, message: err.message })
        );
      }
    };

    fetchData();
  }, [fromDate, toDate]);
  const Handlesearch = e => {
    e.preventDefault();
    setFromDate(e.target.fromDate.value);
    setToDate(e.target.toDate.value);
  };
  return (
    <div className={style.container}>
      {db ? (
        <div className={style.Body}>
          <NavLink to={"/ReportsMap"} className={style.Charts}>
            <h3>Ümumi hesabat</h3>
            <img src="/gif/map (2).png" alt="" />
            {/* {db && (
              <BarChart
                data={db.sale}
                width="auto"
                height="100%"
                lebel={false}
                color={"#6ec599"}
              />
            )} */}
          </NavLink>
          <NavLink to={"/reporties"} className={style.Charts}>
            <h3>Göstərilən xidmətlərin hesabatı</h3>
            {db && (
              <AreaChart
                datas={db?.sale.map(item => {
                  return { x: item.name, y: item.amount };
                })}
                color={"#6ec599"}
                toolbar={false}
                resheight={120}
                labely={true}
              />
              // <BarChart data={db.sale} width="auto" height="100%" lebel={false} />
            )}
          </NavLink>
          <NavLink to={"/Bank/Balans"} className={style.Charts}>
            <h3>Bank qalıqları</h3>
            {console.log(db)}
            {db && (
              <ColumnChart
                data={db?.bankHistory.map(item => {
                  return { x: item.name, y: item.amount };
                })}
                color={"#6ec599"}
                height="100%"
                toolbar={true}
                labelx={false}
                labely={true}
              />
              // <BarChart data={db.sale} width="100%" height="100%" lebel={false} />
            )}
          </NavLink>
          <NavLink to={"/income"} className={style.Charts}>
            <h3>Pul mədaxili</h3>
            {db && (
              <LineChart
                data={db?.income.map(item => {
                  return item.amount;
                })}
                color={"#6ec599"}
                toolbar={false}
                resheight={100}
                labely={true}
                height={"205px"}
              />
            )}
          </NavLink>
          <NavLink to={"/outcome"} className={style.Charts}>
            <h3>Pul məxarici</h3>
            {db && (
              <LineChart
                data={db?.outcome.map(item => {
                  return item.amount;
                })}
                toolbar={false}
                resheight={50}
                labely={true}
                height={"205px"}
                color={"#ed1952"}
              />
            )}
          </NavLink>
          <NavLink to={"/Medaxil&&Mexaric"} className={style.Charts}>
            <h3>Pulun vəsaitlərinin hərəkəti</h3>
            {db && (
              <Splinechart data={db} width="100%" height="100%" lebel={false} />
            )}
          </NavLink>
          <NavLink
            to={"#"}
            className={`${style.Charts_disable} ${style.Chart_disable_before}`}
          >
            <h3>Debititor(Tezliklə)</h3>
            {db && (
              <LineChart
                data={db?.income.map(item => {
                  return item.amount;
                })}
                color={"#6ec599"}
                toolbar={false}
                resheight={100}
                labely={true}
                height={"205px"}
              />
            )}
          </NavLink>
          <NavLink
            to={"#"}
            className={`${style.Charts_disable} ${style.Chart_disable_before}`}
          >
            <h3>Xərclər(Tezliklə)</h3>
            {db && (
              <LineChart
                data={db?.income.map(item => {
                  return item.amount;
                })}
                color={"#ed1952"}
                toolbar={false}
                resheight={100}
                labely={true}
                height={"205px"}
              />
            )}
          </NavLink>{" "}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
export default Reporthome;
