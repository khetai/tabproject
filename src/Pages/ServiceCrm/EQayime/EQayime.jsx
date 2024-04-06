import React, { useState } from "react";
import style from "./index.module.css";
import Paginations from "./Paginations";
import styled from "styled-components";

import Modal from "../../../Components/Modal/Modal";
import { changeToast } from "../../../Store/auth";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px;
`;
const containerVariant = {
  initial: { right: "-45%", transition: { type: "spring" } },
  isOpen: { right: "-3%" },
  exit: { right: "-45%" },
};
const EQayime = () => {
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [filter, setFilter] = useState(false);
  const [startDate, setStartdate] = useState("");
  const [endDate, setFinishdate] = useState("");
  const [voen, setVoen] = useState("");
  const [eCode, setEcode] = useState("");
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState();
  const token = JSON.parse(localStorage.getItem("authState")).token;
  const [ids, setIds] = useState([]);
  const [search, setSearch] = useState({
    startdate: "",
    finishdate: "",
  });
  const handleOpen = async e => {
    e.preventDefault();
    setLoad2(true);
    console.log(ids);
    const fetchData = async () => {
      try {
        const res = await sendRequest("POST", `Sales/DownloadEqaime`, ids);
        console.log(res);
        if (!res.isSuccess) {
          setLoad2(false);
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        } else {
          setResult(res.result);
          setOpen(true);
          setLoad2(false);
        }
      } catch (err) {
        console.error(err);
        setLoad2(false);
        dispatch(
          changeToast({ loading: false, type: false, message: err.message })
        );
      }
    };

    fetchData();
  };

  const Handlesearch = e => {
    e.preventDefault();
    setLoad(true);
    console.log("ADSasds");
    setVoen(e.target.voen.value);
    setEcode(e.target.eCode.value);
    setStartdate(search.startdate);
    setFinishdate(search.finishdate);
  };
  const handleDownloadClick = async x => {
    try {
      //Files\Zips\sales_202403060hgjrphf.sic.zip
      window.open(`https://localhost:7179/${x}`);
    } catch (error) {
      console.log("error");
      console.error("Error downloading file:", error);
    }
    setLoad(false);
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
            <h3>Elektron qaimələr üzrə reyestr</h3>
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
                className={style.HeadExcellButton}
                style={{
                  // background:
                  //   "linear-gradient(77.62deg, #0d2e4f 2.96%, #0f5280 63.71%)",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={e => {
                  handleOpen(e);
                }}
              >
                <span style={{ display: "flex", alignContent: "center" }}>
                  {load2 ? (
                    <RotatingLines
                      visible={true}
                      height="20"
                      width="20"
                      strokeColor="black"
                      // color="white"
                      // strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Qaimə yüklə"
                  )}
                </span>
              </button>
            </li>
          </ul>
        </div>
        <div className={filter ? style.HeadFilteractive : style.HeadFilter}>
          <form
            className={style.FilterForm}
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
              <li className={style.FilterItem}>
                <label>VÖEN:</label>
                <input placeholder="VÖEN" name="voen" />
              </li>
              <li className={style.FilterItem}>
                <label>Bəyannamə nömrəsi:</label>
                <input
                  placeholder="Bəyannamə nömrəsi"
                  type="number"
                  name="eCode"
                />
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
                    setEcode("");
                    setVoen("");
                    setFinishdate("");
                    setStartdate("");
                    setSearch({ startdate: "", finishdate: "" });
                    setLoad(false);
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
          voen={voen}
          startDate={startDate}
          finishDate={endDate}
          eCode={eCode}
          setLoad={setLoad}
          load={load}
          ids={ids}
          setIds={setIds}
        />
      </div>
      <Modal
        isOpen={open}
        handleClose={() => setOpen(false)}
        containerVariant={containerVariant}
        width={"53%"}
        height={"58%"}
        left={"top"}
        leftcount={"50%"}
        side={"right"}
        sidecount={"0%"}
        showd={"none"}
      >
        <ModalContent>
          <div className={style.ModalTitle}>
            <h1 className={style.TitleText}>E-qayimələri yüklə</h1>
            <button
              className={style.Buttonx}
              onClick={() => {
                setOpen(false);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <ul className={style.downMain}>
            {result &&
              result.map((x, i) => {
                return (
                  <li>
                    <div>{x}</div>
                    <div>
                      <div>
                        <button
                          className={style.downByone}
                          onClick={e => {
                            handleDownloadClick(x);
                            setLoad(true);
                          }}
                        >
                          {load ? (
                            <RotatingLines
                              visible={true}
                              height="20"
                              width="20"
                              strokeColor="white"
                              // color="white"
                              // strokeWidth="5"
                              animationDuration="0.75"
                              ariaLabel="rotating-lines-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                            />
                          ) : (
                            "Yüklə"
                          )}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            <li>
              <div></div>
              <div></div>
            </li>
          </ul>
          <div className={style.ModalContainer}>
            <button
              className={style.EditButton}
              onClick={e => {
                result.map(s => {
                  return handleDownloadClick(s);
                });
                setLoad(true);
              }}
            >
              {load ? (
                <RotatingLines
                  visible={true}
                  height="20"
                  width="20"
                  strokeColor="white"
                  // color="white"
                  // strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Hamısını yüklə"
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EQayime;
