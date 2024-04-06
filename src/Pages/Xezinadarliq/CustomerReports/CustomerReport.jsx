import React from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";
export default function CustomerReport({ page, data, nom, take }) {
  const navigate = useNavigate();

  return (
    <tr className={style.TableTr} key={nom} onDoubleClick={() => navigate(`/Customer/balance/${data.clientId}`)}>
      <td className={style.TableTd}>{(page - 1) * take + (nom + 1)}</td>
      <td className={style.TableTd}>{data.clientCode}</td>
      <td className={style.TableTd}>{data.clientVoen}</td>
      <td className={style.TableTd}>{data.clientName}</td>
      <td className={style.TableTd}>{data.clientBalance.toFixed(2)} ₼</td>
      <td
        className={style.TableTd}
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/Customer/balance/${data.clientId}`)}
      >
        <span className={style.info}>
          <i class="fa-solid fa-info"></i>
        </span>
      </td>
    </tr>
  );
}
