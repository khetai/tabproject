import React, { useState, useEffect } from "react";
import Pie from "./pie";
import BarChart from "./BarChart";
import styled from "./index.module.css";
import { changeToast } from "../../Store/auth";
import usePrivate from "./../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Loader from "../../Components/Loader/Loader";
export default function ReportCharst({ fromDate = "", toDate = "" }) {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [db, setDb] = useState();
  const [result, setResult] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Dashboard/SaleReportPie?fromDate=${fromDate}&toDate=${toDate}`,
          null
        );
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
  //Dashboard/SaleReportHistory?precinctId=1&fromDate=123&toDate=123
  const GetById = async x => {
    try {
      const res = await sendRequest(
        "GET",
        `Dashboard/SaleReportHistory?precinctId=${x.id}&fromDate=${fromDate}&toDate=${toDate}`,
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

  return db ? (
    <div className={styled.Charts}>
      <Pie data={db} setPrecinct={GetById} />
      <BarChart data={result} />
    </div>
  ) : (
    <Loader />
  );
}
