import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeToast } from "../../../Store/auth";
import ColumnChart from "./ColumnChart";
import Loader from "../../../Components/Loader/Loader";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import style from "./index.module.css";
function Medaxil() {
  const { sendRequest } = usePrivate();
  const dispatch = useDispatch();
  const [db, setdb] = useState(null);
  const [type, setType] = useState("chart");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filter, setFilter] = useState(false);
  const [load, setLoad] = useState(false);
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
            // setLoad(false);
          }
        });
      } else {
        setLoad(true);
        setFromDate(search.startdate);
        setToDate(search.finishdate);
      }
    } else {
      setLoad(true);
    }
  };
  console.log(load);
  const [defaultData, setDefaultData] = useState(null);
  const [search, setSearch] = useState({
    startdate: "",
    finishdate: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Dashboard/Incomings?fromDate=${fromDate}&toDate=${toDate}`,
          null
        );
        console.log(res);
        if (!res.isSuccess) {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        } else {
          setdb(res.result);
          setLoad(false);
        }
        // setresult(res.result.data);
        // setDb(res.result);
      } catch (err) {
        console.error(err);
        dispatch(
          changeToast({ loading: false, type: false, message: err.message })
        );
      }
    };

    fetchData();
  }, [fromDate, toDate, load]);

  console.log(db);

  useEffect(() => {
    const generateRandomData = () => {
      const randomData = [];

      for (let i = 0; i < db?.length; i++) {
        const randomDate = `${db[i]?.date}`; // Random day in January
        const randomSum = db[i]?.amount;
        const randomRows = [];

        db[i].client?.map(p => {
          randomRows.push({
            Customer: `${p.name}`,
            Contract: `${p.voen}`,
            Amount: p.amount,
          });
        });

        randomData.push({ Date: randomDate, Sum: randomSum, Rows: randomRows });
      }

      return randomData;
    };

    // Set default data with random items
    if (db) {
      setDefaultData([...generateRandomData()]);
    }
    console.log(defaultData);
  }, [db]);
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
    <div className={style.cashdetail}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Pul mədaxili</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <button>
                <img
                  className="Filter"
                  onClick={e => setFilter(!filter)}
                  src={"/icons/filterdark.svg"}
                  alt=""
                />
              </button>
            </li>
            <li>
              <div
                className={style.cashhead}
                style={{ height: "15%", width: "100%" }}
              >
                <ul className={style.showtype}>
                  <li
                    className={type !== "table" ? style.active : style.hide}
                    onClick={() => setType("table")}
                  >
                    <span>{"Cədvəlgörünüşü"}</span>
                    <i className="fa-solid fa-bars"></i>
                  </li>
                  <li
                    className={type !== "chart" ? style.active : style.hide}
                    onClick={() => setType("chart")}
                  >
                    <span>{"Qrafikgörünüşü"}</span>
                    <i className="fa-solid fa-chart-line"></i>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="/#/reports" className="ToBack">
                <img src="/icons/back-svgrepo-com 2.svg" alt="" />
              </a>
            </li>
          </ul>
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
            </ul>
          </form>
        </div>
      </div>
      {defaultData != null ? (
        defaultData.length > 0 ? (
          <div className={style.area} style={{ height: "100%", width: "100%" }}>
            {type === "chart" ? (
              <ColumnChart
                data={defaultData.map(item => {
                  const totalAmount = item.Rows.reduce(
                    (acc, row) => acc + row.Amount,
                    0
                  );
                  return { x: item.Date, y: totalAmount };
                })}
                color={"#6ec599"}
                height="100%"
                toolbar={true}
                labelx={true}
                labely={true}
              />
            ) : (
              <table className={style.table}>
                <tbody>
                  {[...defaultData].reverse().map((d, i) => {
                    return (
                      <React.Fragment key={i}>
                        <tr className={style.daterow}>
                          <td colSpan={3}>
                            {d.Date} - {d.Sum}AZN
                          </td>
                        </tr>
                        {d.Rows.map((row, j) => {
                          return (
                            <tr key={j}>
                              <td>{row.Customer}</td>
                              <td>{row.Contract}</td>
                              <td className={style.textal}>{row.Amount}</td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div style={{ padding: "45px 13px" }}>
            <h2 className={style.sectionhead} style={{ marginLeft: "20px" }}>
              {"Məlumatyoxdur"}
            </h2>
          </div>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Medaxil;
