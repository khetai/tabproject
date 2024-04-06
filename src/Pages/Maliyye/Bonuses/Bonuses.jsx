import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import { changeToast } from "../../../Store/auth";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
function Bonuses() {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [db, setDb] = useState();
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState({
    startdate: "",
    finishdate: "",
  });

  const fetchData = async () => {
    setLoad(true);
    try {
      const res = await sendRequest(
        "GET",
        `Dashboard/Bonus?from=${search.startdate}&to=${search.finishdate}`,
        null
      );
      console.log(res);
      if (!res.isSuccess) {
        dispatch(
          changeToast({ loading: false, type: false, message: res.message })
        );
      } else {
        setDb(res.result);
      }
    } catch (err) {
      console.error(err);
      dispatch(
        changeToast({ loading: false, type: false, message: err.message })
      );
    }
    setLoad(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const getSum = (users, propertyName) => {
    return users
      ? users.reduce((acc, user) => acc + (user[propertyName] || 0), 0)
      : 0;
  };

  const getTotalSum = (departments, propertyName) => {
    let ss = departments
      ? departments.reduce(
          (acc, department) => acc + getSum(department.users, propertyName),
          0
        )
      : 0;
    // setSaycem(sayCem + ss);
    return ss;
  };
  const getAllServicesAmountTotal = (bonuses, services) => {
    let amountc = 0;

    (services ?? []).forEach(c => {
      amountc += getTotalSum(bonuses, `s${c.serviceId}`) * c.serviceBonus;
    });

    return amountc.toFixed(2);
  };
  const getAllServicesTotal = (bonuses, services) => {
    let sayc = 0;
    (services ?? []).forEach(c => {
      sayc += getTotalSum(bonuses, `s${c?.serviceId}`);
    });

    return sayc;
  };
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
    if (search.startdate && search.finishdate) {
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
        setDb();
        setLoad(false);
        fetchData();
      }
    } else {
      setDb();
      setLoad(false);
      fetchData();
    }
  };
  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Bonusların hesablanması</h3>
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
                    setSearch({ startdate: "", finishdate: "" });
                    setLoad(false);
                    fetchData();
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
        {db ? (
          <table className={style.Table}>
            <thead className={style.TableHeada}>
              <tr className={style.bntr}>
                <th rowSpan={3}>№</th>
                <th rowSpan={3}>Şöbə</th>
                <th rowSpan={3}>Ad, soyad, ata adı</th>
                <th colSpan={db?.services.length * 2}>Xidmətlər</th>
                <th rowSpan={2} colSpan={2}>
                  CƏM
                </th>
              </tr>
              <tr className={style.bntr}>
                {db &&
                  db?.services.map((x, i) => {
                    return (
                      <th colSpan={2} key={i}>
                        {x.serviceShortName}({x.serviceBonus} AZN)
                      </th>
                    );
                  })}
              </tr>
              <tr className={style.bntr}>
                {db &&
                  db?.services.map((x, i) => {
                    return (
                      <>
                        <th>say</th>
                        <th>mebleg</th>
                      </>
                    );
                  })}
                <th>say</th>
                <th>mebleg</th>
              </tr>
            </thead>
            <tbody className={style.TableBody}>
              {db &&
                db?.bonuses.map((x, i) => {
                  let nom = 0;
                  if (i > 0) {
                    for (let j = 0; j < i; j++) {
                      nom += db.bonuses[j].users.length;
                    }
                  }
                  return x.users.map((t, r) => {
                    let cem = 0;
                    let say = 0;
                    i > 0 ? (nom += r + 1) : (nom = r + 1);

                    return (
                      <tr key={i} className={style.bntr}>
                        <td>{nom}</td>
                        {r === 0 ? (
                          <td rowSpan={x.users.length}>{x.departmentName}</td>
                        ) : null}
                        <td className={style.bonusName}>{t.fullName}</td>
                        {db.services.map((k, w) => {
                          cem +=
                            t["s" + k.serviceId] *
                            db.services.find(x => x.serviceId === k.serviceId)
                              ?.serviceBonus;
                          say += t["s" + k.serviceId];
                          return (
                            <>
                              <td
                                class={"s" + k.serviceId}
                                count={t["s" + k.serviceId]}
                              >
                                {t["s" + k.serviceId] != 0
                                  ? t["s" + k.serviceId]
                                  : ""}
                              </td>
                              <td
                                class={"v" + t["s" + k.serviceId]}
                                val={
                                  t["s" + k.serviceId] *
                                  db.services.find(
                                    x => x.serviceId === k.serviceId
                                  )?.serviceBonus
                                }
                              >
                                {(
                                  t["s" + k.serviceId] *
                                  db.services.find(
                                    x => x.serviceId === k.serviceId
                                  )?.serviceBonus
                                ).toFixed(2) != 0 ? (
                                  (
                                    t["s" + k.serviceId] *
                                    db.services.find(
                                      x => x.serviceId === k.serviceId
                                    )?.serviceBonus
                                  ).toFixed(2)
                                ) : (
                                  <span style={{ color: "#808080" }}>0.00</span>
                                )}
                              </td>
                            </>
                          );
                        })}
                        <td>
                          {say != 0 ? (
                            say
                          ) : (
                            <span style={{ color: "#808080" }}>0.00</span>
                          )}
                        </td>
                        <td>
                          {cem.toFixed(2) != 0 ? (
                            cem.toFixed(2)
                          ) : (
                            <span style={{ color: "#808080" }}>0.00</span>
                          )}
                        </td>
                      </tr>
                    );
                  });
                })}

              <tr className={`${style.bntr} ${style.SumCount}`}>
                <td colSpan={3}>CƏM MƏBLƏĞ</td>
                {db?.services.map((c, i) => {
                  return (
                    <>
                      <td>
                        {getTotalSum(db?.bonuses, `s${c.serviceId}`) != 0 ? (
                          getTotalSum(db?.bonuses, `s${c.serviceId}`)
                        ) : (
                          <span style={{ color: "#808080" }}>0.00</span>
                        )}
                      </td>
                      <td>
                        {(
                          getTotalSum(db?.bonuses, `s${c.serviceId}`) *
                          c.serviceBonus
                        ).toFixed(2) != 0 ? (
                          (
                            getTotalSum(db?.bonuses, `s${c.serviceId}`) *
                            c.serviceBonus
                          ).toFixed(2)
                        ) : (
                          <span style={{ color: "#808080" }}>0.00</span>
                        )}
                      </td>
                    </>
                  );
                })}
                <td>{getAllServicesTotal(db?.bonuses, db?.services)}</td>
                <td>{getAllServicesAmountTotal(db?.bonuses, db?.services)}</td>
              </tr>
              {/* <tr className={style.bntr}>
                <td colSpan={3}>CƏM BƏYANNAMƏ</td>
                <td colSpan={db?.services.length * 2}></td>
              </tr> */}
            </tbody>
          </table>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Bonuses;
