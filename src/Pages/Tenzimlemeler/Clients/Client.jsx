import React from "react";
import style from "./index.module.css";
export default function Client({ toggleService, data, index }) {
  return (
    <tr className={style.TableTr}>
      <td className={style.TableTd}>{index + 1}</td>
      <td className={style.TableTd}>{data.clientFullName}</td>
      <td className={style.TableTd}>{data.clientVoenorPassportNo}</td>
      <td className={style.TableTd}>{data.clientCode}</td>
      <td
        className={style.TableTd}
        onClick={() => toggleService(data.clientId)}
        style={{ cursor: "pointer" }}
      >
       <span className={style.info}>
       <i class="fa-solid fa-info"></i>
       </span>
      </td>
    </tr>
  );
}
