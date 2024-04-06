import React, { useState, useEffect } from "react";
import Pie from "./pie";
import styled from "./index.module.css";
import { changeToast } from "../../../../Store/auth";
import usePrivate from "./../../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Loader from "../../../../Components/Loader/Loader";
import ColumnChart from "./ColumnChart";

function BankCharts({ fromDate = "", toDate = "", setLoad, load }) {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [db, setDb] = useState();
  const [result, setResult] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Dashboard/BankBalance?fromDate=${fromDate}&toDate=${toDate}`,
          null
        );
        console.log(res);
        if (res.isSuccess) {
          setDb(res.result.pie);
          setResult(res.result.stats);
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
      setLoad(false);
    };

    fetchData();
  }, [fromDate, toDate, load]);
  //Dashboard/SaleReportHistory?precinctId=1&fromDate=123&toDate=123
  const GetById = async x => {
    try {
      const res = await sendRequest(
        "GET",
        `Dashboard/${x.id}?fromDate=${fromDate}&toDate=${toDate}`,
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
      <ColumnChart
        data={result?.map(item => {
          return { x: item.date, y: item.amount };
        })}
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

export default BankCharts;
