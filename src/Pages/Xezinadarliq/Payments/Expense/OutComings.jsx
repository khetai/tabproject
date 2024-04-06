import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import Paginations from "./Paginations";
import { changeToast } from "../../../../Store/auth";
import usePrivate from "../../../../Services/useAxiosPrivate2";
import { useDispatch, useSelector } from "react-redux";
import Select2 from "../../../../Components/Select/Select2";
import { RotatingLines } from "react-loader-spinner";
import Selectnew from "../../../../Components/Select/Selectnew";
function OutComings() {
  const [db, setDb] = useState([]);
  const [filter, setFilter] = useState(false);
  const [name, setName] = useState("");
  const [hcode, sethcode] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [result, setresult] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState({
    startdate: "",
    finishdate: "",
    hcode: "",
    name: "",
  });
  const { sendRequest } = usePrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest("GET", `BankAccount/GetAccounts`, null);
        console.log(res);
        if (res.isSuccess) {
          // setresult(res.result)
          setBankAccounts(res.result);
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
  }, []);

  const handleChange = e => {
    if (e) {
      let { name, value } = e;
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
    } else {
      setSearch({ ...search, ["hcode"]: "" });
    }
  };

  const Handlesearch = e => {
    e.preventDefault();
    setLoad(true);
    setName(search.name);
    setStartDate(search.startdate);
    setFinishDate(search.finishdate);
    sethcode(search.hcode);
  };

  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Bank hesabından məxaric</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <img
                className="Filter"
                onClick={e => setFilter(!filter)}
                src={"/icons/filterdark.svg"}
                alt=""
              />
            </li>
            <li>
              <button
                className={style.HeadAddButton}
                onClick={e => {
                  setOpen(true);
                }}
              >
                <img src="/icons/pluscircle.svg" alt="" />
                <span>Yeni</span>
              </button>
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
                <label>Başlanğıc tarixi:</label>
                <input
                  name="startdate"
                  type="text"
                  value={search.startdate}
                  onChange={e => handleChange(e.target)}
                  placeholder="dd.MM.yyyy"
                />
              </li>
              <li className={style.FilterItem}>
                <label>Son tarix:</label>
                <input
                  name="finishdate"
                  type="text"
                  value={search.finishdate}
                  onChange={e => handleChange(e.target)}
                  placeholder="dd.MM.yyyy"
                />
              </li>
              <li className={style.FilterItem}>
                <label>Ad, soyad:</label>
                <input
                  name="name"
                  placeholder="Ad soyad..."
                  onChange={e => handleChange(e.target)}
                />
              </li>
              <li className={style.FilterItem2}>
                <label>Bank hesabı:</label>
                <Selectnew
                  name="hcode"
                  value={search.hcode}
                  setsearch={setSearch}
                  handleChange={handleChange}
                  url="BankAccount/GetAccounts"
                  itemname="bankAccountBank"
                  itemId="bankAccount"
                  type={4}
                  width={"50%"}
                  height={"70%"}
                  searchName={"name"}
                  double={true}
                />
              </li>
              <li className={style.FilterItemButtons}>
                <button className={style.SearchButton}>
                  {" "}
                  {load ? (
                    <RotatingLines
                      visible={true}
                      height="15"
                      width="15"
                      strokeColor="Black"
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
                    setName("");
                    sethcode("");
                    setStartDate("");
                    setFinishDate("");
                    setSearch({
                      startdate: "",
                      finishdate: "",
                      hcode: 0,
                      name: "",
                    });
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
        <Paginations
          name={name}
          opmod={open}
          setopmod={setOpen}
          bankAccounts={bankAccounts}
          startDate={startDate}
          finishDate={finishDate}
          hcode={hcode}
          setLoad={setLoad}
          load={load}
        />
      </div>
    </div>
  );
}

export default OutComings;
