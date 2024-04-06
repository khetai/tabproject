import React from "react";
import style from "./index.module.css";
export default function Enterprise({ toggleService, db }) {
  return (
    <tr className={style.TableTr}>
      <td className={style.TableTd}>{1}</td>
      <td className={style.TableTd}>{db.companyDataName}</td>
      <td className={style.TableTd}>{db.companyDataVoen}</td>
      <td
        className={style.TableTd}
        style={{ cursor: "pointer" }}
        onClick={() => toggleService(true)}
      >
        <span className={style.info}>
        <i class="fa-solid fa-info"></i>
        </span>
      </td>
    </tr>
  );
}
