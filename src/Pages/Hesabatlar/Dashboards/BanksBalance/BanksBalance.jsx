import React, { useState } from "react";
import style from "./index.module.css";
import BankCharts from "./BankCharts";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
function BanksBalance() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filter, setFilter] = useState(false);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState({
    startdate: "",
    finishdate: "",
  });
  const Handlesearch = e => {
    e.preventDefault();
    console.log(load);
    // setLoad(true);
    if (search.startdate && search.finishdate) {
      console.log("bura isleyir");
      // Parse the dates
      const startDate = new Date(search.startdate);
      const finishDate = new Date(search.finishdate);

      // Calculate the difference in milliseconds
      const differenceInMs = finishDate - startDate;

      // Convert milliseconds to days
      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

      // Check if the difference is more than 30 days
      console.log(differenceInDays);
      if (differenceInDays > 30) {
        console.log("30");
        Swal.fire({
          title: "Xəbərdarlıq...",
          text: "Tarix aralığı bir aydan çox ola bilməz!",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sıfırla",
        }).then(result => {
          if (result.isConfirmed) {
            setSearch({ ...search, finishdate: "" });
            setLoad(false);
          }
        });
      } else {
        setLoad(true);
        setFromDate(search.startdate);
        setToDate(search.finishdate);
      }
    } else {
      setLoad(false);
    }
  };
  const handleChange = e => {
    let { name, value } = e.target;
    console.log(name, value);
    if (name.endsWith("date")) {
      console.log("true");
      value = value.replace(/\D/g, "");
      if (value.length <= 2) {
      } else if (value.length <= 4) {
        value = `${value.slice(0, 2)}.${value.slice(2)}`;
      } else {
        value = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(
          4,
          8
        )}`;
      }
    }
    console.log(value);
    setSearch({ ...search, [name]: value });
  };

  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Bank qalıqları</h3>
          </div>
          <form className={style.formMedaxil} onSubmit={e => Handlesearch(e)}>
            <ul className={style.FilterItems}>
              <li className={style.FilterItem}>
                {/* <label>Başlanğıc tarix:</label> */}
                <input
                  name="startdate"
                  type="text"
                  value={search.startdate}
                  onChange={handleChange}
                  placeholder="MM.dd.yyyy"
                />
              </li>
              <li className={style.FilterItem}>
                {/* <label>Son tarix:</label> */}
                <input
                  name="finishdate"
                  type="text"
                  value={search.finishdate}
                  onChange={handleChange}
                  placeholder="MM.dd.yyyy"
                />
              </li>

              <li className={style.FilterItemButtons}>
                <button
                  className={style.SearchButton}
                  onClick={e => setLoad(true)}
                >
                  {load ? (
                    <RotatingLines
                      visible={true}
                      height="15"
                      width="15"
                      strokeColor="white"
                      // color="white"
                      // strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Axtar"
                  )}
                </button>
                <button
                  type="reset"
                  className={style.ResetButton}
                  onClick={() => {
                    setSearch({ startdate: "", finishdate: "" });
                    setLoad(false);
                    setFromDate("");
                    setToDate("");
                  }}
                >
                  <img src={"/icons/share-solid 1.svg"} alt="" />
                </button>
              </li>
              <li>
                <a href="/#/reports" className="ToBack">
                  <img src="/icons/back-svgrepo-com 2.svg" alt="" />
                </a>
              </li>
            </ul>
          </form>
          {/* <ul>
          </ul> */}
        </div>
        <div className={filter ? style.HeadFilteractive : style.HeadFilter}>
          <form
            style={{ width: "100%", padding: "0", margin: "0" }}
            onSubmit={e => Handlesearch(e)}
          >
            <ul className={style.FilterItems}>
              <li className={style.FilterItem}>
                <label>Başlanğıc tarix:</label>
                <input
                  name="startdate"
                  type="text"
                  value={search.startdate}
                  onChange={handleChange}
                  placeholder="dd.MM.yyyy"
                />
              </li>
              <li className={style.FilterItem}>
                <label>Son tarix:</label>
                <input
                  name="finishdate"
                  type="text"
                  value={search.finishdate}
                  onChange={handleChange}
                  placeholder="dd.MM.yyyy"
                />
              </li>

              <li className={style.FilterItemButtons}>
                <button className={style.SearchButton}>Axtar</button>
                <button
                  type="reset"
                  className={style.ResetButton}
                  onClick={() => {
                    setFromDate("");
                    setToDate("");
                    setSearch({ startdate: "", finishdate: "" });
                  }}
                >
                  <img src={"/icons/share-solid 1.svg"} alt="" />
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className={style.Body}>
        <BankCharts
          fromDate={fromDate}
          toDate={toDate}
          setLoad={setLoad}
          load={load}
        />
      </div>
    </div>
  );
}

export default BanksBalance;
