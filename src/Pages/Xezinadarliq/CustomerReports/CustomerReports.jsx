import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import Paginations from "./paginations";
import { RotatingLines } from "react-loader-spinner";
import Select2 from "../../../Components/Select/Select2";
import "./testCustom.css";

import { initOnLoad } from "apexcharts";
function CustomerReports() {
  const [load, setLoad] = useState(false);
  const [clientCode, setName] = useState();
  const [voen, setVoen] = useState();
  const [hasLoan, sethasLoan] = useState();
  const [search, setSearch] = useState({
    clientCode: null,
    voenOrPassport: null,
    hasLoan: "",
  });
  const handleChange = e => {
    if (e) {
      console.log(e.name);
      console.log(e.value);
      setSearch({ ...search, [e.name]: e.value });
    } else {
      setSearch({ ...search, ["hasLoan"]: "" });
    }

    // Check if both startdate and finishdate are present
  };
  const Handlesearch = e => {
    e.preventDefault();
    console.log(search);
    setName(search.clientCode);
    setVoen(search.voenOrPassport);
    sethasLoan(search.value);
    setLoad(true);
  };
  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Müştəri balansı</h3>
          </div>
          <form className={style.formMedaxil} onSubmit={e => Handlesearch(e)}>
            <ul className={style.FilterItems}>
              <li className={style.FilterItem}>
                {/* <label>Başlanğıc tarix:</label> */}
                <input
                  name="clientCode"
                  type="text"
                  value={search.startdate}
                  onChange={e => handleChange(e.target)}
                  placeholder="Müştəri kodu"
                />
              </li>
              <li className={style.FilterItem}>
                {/* <label>Son tarix:</label> */}
                <input
                  name="voenOrPassport"
                  type="text"
                  value={search.finishdate}
                  onChange={e => handleChange(e.target)}
                  placeholder="VÖEN/Passport"
                />
              </li>
              <li className={style.FilterItem}>
                <Select2
                  options={[
                    {
                      value: "",
                      label: "Hamısı",
                      name: "hasLoan",
                    },
                    {
                      value: true,
                      label: "Borclu",
                      name: "hasLoan",
                    },
                    {
                      value: false,
                      label: "Borcsuz",
                      name: "hasLoan",
                    },
                  ]}
                  preventDefault={{
                    value: "",
                    label: "Hamısı",
                    name: "hasLoan",
                  }}
                  onChange={e => handleChange(e)}
                  value={search.hasLoan || ""}
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
                    setName();
                    setVoen();
                    sethasLoan("");
                    setSearch({
                      clientCode: null,
                      voenOrPassport: null,
                      hasLoan: "",
                    });
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
          load={load}
          setLoad={setLoad}
          name={clientCode}
          voen={voen}
          hasLoan={hasLoan}
          search={search}
        />
      </div>
    </div>
  );
}

export default CustomerReports;
