import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import { changeToast } from "../../../../Store/auth";
import usePrivate from "./../../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Loader from "../../../../Components/Loader/Loader";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import Splinechart from "./Splinechart";
function IncomeOutcome() {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [db, setDb] = useState();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState({
    startdate: "",
    finishdate: "",
  });

  const fetchData = async () => {
    try {
      const res = await sendRequest(
        "GET",
        `Dashboard/GetInOutCome?fromDate=${fromDate}&toDate=${toDate}`,
        null
      );
      console.log(res);
      if (res.isSuccess) {
        setLoad(false);
        setDb(res.result);
        setDb(res.result);
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
  useEffect(() => {
    fetchData();
  }, [fromDate, toDate, load]);

  const handleChange = e => {
    let { name, value } = e.target;

    if (name.endsWith("date")) {
      value = value.replace(/\D/g, "");

      if (value.length <= 2) {
        // Do nothing for day input
      } else if (value.length <= 4) {
        // Format for MM.yyyy
        value = `${value.slice(0, 2)}.${value.slice(2)}`;
      } else {
        // Format for dd.MM.yyyy
        value = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(
          4,
          8
        )}`;
      }
    }

    // Update state
    setSearch({ ...search, [name]: value });

    // Check if both startdate and finishdate are present
  };

  const Handlesearch = e => {
    e.preventDefault();
    setLoad(true);
    if (search.startdate || search.finishdate) {
      // Parse the dates
      const startDate = new Date(search.startdate);
      const finishDate = new Date(search.finishdate);

      // Calculate the difference in milliseconds
      const differenceInMs = finishDate - startDate;

      // Convert milliseconds to days
      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

      // Check if the difference is more than 30 days
      if (differenceInDays > 30) {
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
        console.log("olmadi");
      } else {
        console.log("oldu");
        setLoad(true);
        setFromDate(search.startdate);
        setToDate(search.finishdate);
      }
    } else {
      setLoad(false);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Pulun vəsaitlərinin hərəkəti</h3>
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
                  placeholder="dd.MM.yyyy"
                />
              </li>
              <li className={style.FilterItem}>
                {/* <label>Son tarix:</label> */}
                <input
                  name="finishdate"
                  type="text"
                  value={search.finishdate}
                  onChange={handleChange}
                  placeholder="dd.MM.yyyy"
                />
              </li>

              <li className={style.FilterItemButtons}>
                <button className={style.SearchButton}>
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
                    fetchData();
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
        </div>
      </div>
      <div className={style.Body}>
        {db ? <Splinechart data={db} /> : <Loader />}
      </div>
    </div>
  );
}

export default IncomeOutcome;
