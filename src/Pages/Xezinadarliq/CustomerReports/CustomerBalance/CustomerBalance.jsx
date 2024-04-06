import React, { useEffect, useState } from "react";
import { changeToast } from "../../../../Store/auth";
import usePrivate from "../../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./index.module.css";
import Loader from "../../../../Components/Loader/Loader";

function CustomerBalance() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [db, setDb] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Client/GetTransactions?userId=${id}&startDate=${""}&endDate=${""}`,
          null
        );
        console.log(res);
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

    fetchData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Müştəri balansı</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <a href="/#/Customer/Report">
                <img
                  className={style.FilterActive}
                  src="/icons/back-svgrepo-com 2.svg"
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.Body}>
        <div className={style.Table}>
          <table>
            <thead className={style.TableHeada}>
              <tr>
                <th>№</th>
                <th>Tarix</th>
                <th>Növü</th>
                <th>İlkin qalıq</th>
                <th>Artım</th>
                <th>Azalma</th>
                <th>Son qalıq</th>
              </tr>
            </thead>
            <tbody className={style.TableBody}>
              {db &&
                db?.map((x, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{x.transactionDate}</td>
                      <td>{x.transactionType}</td>
                      <td>{x.ilkinQaliq ? x.ilkinQaliq : "-"}</td>
                      <td>{x.artim ? x.artim : "-"}</td>
                      <td>{x.azalma ? x.azalma : "-"}</td>

                      <td>{x.sonqaliq ? x.sonqaliq : "-"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerBalance;
