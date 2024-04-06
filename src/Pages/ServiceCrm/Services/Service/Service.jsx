import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import Paginations from "./Paginations";
import { NavLink } from "react-router-dom";
import { changeToast } from "../../../../Store/auth";
import usePrivate from "./../../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Select2 from "../../../../Components/Select/Select2";
import { RotatingLines } from "react-loader-spinner";
import Selectnew from "../../../../Components/Select/Selectnew";
function Service() {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [db, setDb] = useState();
  const [filter, setFilter] = useState(false);
  const [status, setStatus] = useState(0);
  const [name, setName] = useState("");
  const [voenPasp, setVoenpasp] = useState("");
  const [dqn, setDdn] = useState("");
  const [userId, setuserId] = useState(0);
  const [dateStart, setdateStart] = useState("");
  const [dateFinish, setdateFinish] = useState("");
  const [beyanname, setBeyanname] = useState("");
  const [menteqe, setMenteqe] = useState(0);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState({
    startdate: "",
    finishdate: "",
    status: 0,
    userId: 0,
    menteqe: 0,
    name: "",
    voen: "",
    dqn: "",
    beyanname: "",
  });
  const Handlesearch = e => {
    e.preventDefault();
    console.log(e);
    console.log(search);
    setLoad(true);
    setName(search.name);
    setVoenpasp(search.voen);
    setDdn(search.dqn);
    setStatus(search.status);
    setdateFinish(search.finishdate);
    setdateStart(search.startdate);
    setuserId(search.userId);
    setBeyanname(search.beyanname);
    setMenteqe(search.menteqe);
  };
  const fetchData = async () => {
    try {
      const res = await sendRequest("GET", `Sales/Inspectors`, null);
      if (res.isSuccess) {
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
    // fetchData();
  }, []);

  const handleChange = e => {
    console.log(e);
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
      console.log(search);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Xidmət reyestri</h3>
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
          </ul>
        </div>
        <div className={filter ? style.HeadFilteractive : style.HeadFilter}>
          <form
            style={{ width: "100%", padding: "0", margin: "0" }}
            onSubmit={e => Handlesearch(e)}
          >
            <ul className={style.FilterItems}>
              <li className={style.FilterItemServiceClient}>
                <label>Müştəri adı</label>
                <input
                  placeholder="Müştəri adı"
                  type="text"
                  name="name"
                  onChange={e => handleChange(e.target)}
                />
              </li>
              <li className={style.FilterItemServiceInput}>
                <label>VÖEN/Pasport</label>
                <input
                  placeholder="VÖEN/Pasport"
                  type="text"
                  name="voen"
                  onChange={e => handleChange(e.target)}
                />
              </li>

              <li className={style.FilterItemServiceInput}>
                <label>DQN</label>
                <input
                  placeholder="DQN..."
                  type="text"
                  name="dqn"
                  onChange={e => handleChange(e.target)}
                />
              </li>
                <li className={style.FilterItemServiceInput}>
                <label>Bəyannamə</label>
                <input
                  placeholder="Bəyannamə..."
                  type="text"
                  name="beyanname"
                  onChange={e => handleChange(e.target)}
                />
              </li>
              <li className={style.FilterItem2ServiceLi}>
                <label>Inspector</label>
                <Selectnew
                  name="userId"
                  value={search.userId}
                  handleChange={handleChange}
                  url="Sales/Inspectors"
                  itemname="inspectorFull"
                  itemId="user"
                  type={1}
                  width={"50%"}
                  height={"70%"}
                  searchName={"name"}
                  double={true}
                />
              </li>
              <li className={style.FilterItem2ServiceLi}>
                <label>Məntəqə</label>
                <Selectnew
                  name="menteqe"
                  value={search.menteqe}
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
                  options={db?.menteqe?.map(x => ({
                    value: x.precinctId,
                    label: x.precinctName,
                    name: "menteqe",
                  }))}
                  onChange={e => handleChange(e)}
                  value={search.menteqe}
                /> */}
              </li>
                              <li className={style.FilterItem2ServiceLi}>
                <label>Status</label>
                <Select2
                  options={[
                    {
                      value: 2,
                      label: "Ödənilib",
                      name: "status",
                    },
                    {
                      value: 1,
                      label: "Ödənilməyib",
                      name: "status",
                    },
                    {
                      value: 3,
                      label: "Qismən Ödənilib",
                      name: "status",
                    },
                    {
                      value: 4,
                      label: "Ləğv edilib",
                      name: "status",
                    },
                  ]}
                  onChange={e => handleChange(e)}
                  value={search.status}
                />
              </li>
              <li className={style.FilterItemServiceInput}>
                <label>Başlanğıc tarix:</label>
                <input
                  name="startdate"
                  type="text"
                  value={search.startdate}
                  onChange={e => handleChange(e.target)}
                  placeholder="dd.MM.yyyy"
                />
              </li>
              <li className={style.FilterItemServiceInput}>
                <label>Son tarix:</label>
                <input
                  name="finishdate"
                  type="text"
                  value={search.finishdate}
                  onChange={e => handleChange(e.target)}
                  placeholder="dd.MM.yyyy"
                />
              </li>
 
            </ul>
            <div className={style.FilterItemButtonsdiv}>
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
                  setStatus(0);
                  setVoenpasp("");
                  setName("");
                  setDdn("");
                  setuserId(0);
                  setdateFinish("");
                  setdateStart("");
                  setMenteqe(0);
                  setBeyanname("");
                  setSearch({
                    startdate: "",
                    finishdate: "",
                    userId: 0,
                    status: 0,
                    menteqe: 0,
                    name: "",
                    voen: "",
                    dqn: "",
                    beyanname: "",
                  });
                  setLoad(false);
                  console.log(search);
                }}
              >
                <img src={"/icons/share-solid 1.svg"} alt="" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={style.Body}>
        <Paginations
          status={status}
          dqn={dqn}
          name={name}
          voen={voenPasp}
          userId={userId}
          dateStart={dateStart}
          dateFinish={dateFinish}
          menteqe={menteqe}
          setLoad={setLoad}
          load={load}
          beyanname={beyanname}
        />
      </div>
    </div>
  );
}

export default Service;
