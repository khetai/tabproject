import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import { NavLink, useParams } from "react-router-dom";
import { changeToast } from "../../../Store/auth";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Permission from "./Permission";
import Loader from "../../../Components/Loader/Loader";
export default function Permissions() {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [result, setresult] = useState();
  const [db, setDb] = useState();
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Inspector/Permissions/${id}`,
          null
        );

        console.log(res.result);
        if (res.isSuccess) {
          setresult(res.result);
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
  }, [id]);
  return result ? (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>İCAZƏLƏR</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <NavLink
                to={"/inspectors"}
                type="reset"
                className={style.ResetButton}
              >
                <img src={"/icons/share-solid 1.svg"} alt="" />
              </NavLink>
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
                <th>Ad</th>
                <th>Icazə</th>
              </tr>
            </thead>
            <tbody className={style.TableBody}>
              {db &&
                db?.map((x, i) => {
                  return <Permission key={i} nom={i} userId={id} data={x} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
