import React, { useState, useEffect } from "react";
import Pie from "./pie";
import BarChart from "./BarChart";
import styled from "./index.module.css";
import { changeToast } from "../../../Store/auth";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import ColumnChart from "./ColumnChart";
export default function ReportCharst({
  fromDate = "",
  toDate = "",
  id = 0,
  setLoad,
  load,
}) {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [db, setDb] = useState();
  const [result, setResult] = useState(null);
  useEffect(() => {
    setResult(null);
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Dashboard/SaleReportPie?fromDate=${fromDate}&toDate=${toDate}&id=${id}`,
          null
        );
        if (res.isSuccess) {
          setLoad(false);
          setDb(res.result.pie);
          setResult(
            res.result.history.map(x => {
              return {
                saleDate: x.saleDate,
                amount: x.amount,
              };
            })
          );
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
  }, [fromDate, toDate, load, id]);

  const GetById = async x => {
    console.log("start");
    try {
      const res = await sendRequest(
        "GET",
        id != 0
          ? `Dashboard/SaleReportHistoryForPre?precintId=${x.id}&fromDate=${fromDate}&toDate=${toDate}`
          : `Dashboard/SaleReportHistory?departmentId=${x.id}&fromDate=${fromDate}&toDate=${toDate}`,
        null
      );
      if (res.isSuccess) {
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

  return db && result ? (
    <div className={styled.Charts}>
      <Pie data={db} setPrecinct={GetById} />
      <ColumnChart
        data={result.map(item => {
          return {
            x: item.saleDate,
            y: item.amount,
          };
        })}
        res={result}
        color={"#6ec599"}
        height="100%"
        toolbar={true}
        labelx={true}
        labely={true}
      />
      {/* <BarChart data={result} /> */}
    </div>
  ) : (
    <Loader />
  );
}
