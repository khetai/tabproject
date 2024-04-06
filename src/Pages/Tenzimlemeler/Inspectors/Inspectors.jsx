import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import Paginations from "./paginations";
import { changeToast } from "../../../Store/auth";
import usePrivate from "./../../../Services/useAxiosPrivate2";
import { useDispatch, useSelector } from "react-redux";
import Select2 from "../../../Components/Select/Select2";
import { RotatingLines } from "react-loader-spinner";

import Selectnew from "../../../Components/Select/Selectnew";
export default function Inspector({ funcval, double }) {
  const [db, setDb] = useState();
  const [filter, setFilter] = useState(false);
  const [name, setName] = useState("");
  const [sobe, setSobe] = useState(0);
  const [open, setOpen] = useState(false);
  const [search, setsearch] = useState({
    value: 0,
    name: null,
  });
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest("GET", `Precinct/All`, null);
        console.log(res);
        if (res.isSuccess) {
          setDb(res.result);
          setLoad(false);
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

  const Handlesearch = e => {
    e.preventDefault();
    setLoad(true);
    setName(e.target.name.value);
    setSobe(search.value);
  };
  const handleChange = e => {
    console.log(e);
    if (e) {
      let { name, value } = e;
      setsearch(e);
    } else {
      setsearch();
    }
  };
  console.log(search);
  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>İstifadəçilər</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              {/* <i
                className={`fa-solid fa-filter ${
                  filter ? style.FilterActive : style.Filter
                }`}
                onClick={e => setFilter(!filter)}
              ></i> */}

              <img
                className="Filter"
                onClick={e => setFilter(!filter)}
                src={"/icons/filterdark.svg"}
                alt=""
              />
            </li>
            <li>
              <span
                className={style.HeadAddButton}
                onClick={e => {
                  setOpen(true);
                }}
              >
                <img src="/icons/plus-circle-svgrepo-com 1.svg" alt="" />
                <span>Yeni</span>
              </span>
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
                <label>Ad, soyad</label>
                <input name="name" placeholder="Ad, soyad..." />
              </li>
              <li className={style.FilterItem2}>
                <label>Məntəqə</label>
                <Selectnew
                  name="sobe"
                  value={search.value}
                  setsearch={setsearch}
                  handleChange={handleChange}
                  url="Precinct/GetSelect"
                  itemname="precinct"
                  itemId="precinct"
                  type={3}
                  width={"50%"}
                  height={"70%"}
                  searchName={"name"}
                  double={true}
                />
                {/* <Select2
                  options={db?.map(x => ({
                    value: x.precinctId,
                    label: x.precinctName,
                    name: "sobe",
                  }))}
                  onChange={e => handleChange(e)}
                  value={search}
                /> */}
              </li>
              <li className={style.FilterItemButtons}>
                <button className={style.SearchButton}>
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
                    // setsearch();
                    setName("");
                    setSobe(0);
                    setsearch({
                      value: 0,
                      name: null,
                    });
                    console.log("sdasa");
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
          sobe={sobe}
          precinct={db}
          opmod={open}
          double={double}
          funcval={funcval}
          setopmod={setOpen}
          setLoad={setLoad}
          load={load}
        />
      </div>
    </div>
  );
}
