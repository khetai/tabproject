import React from "react";
import style from "./index.module.css";
export default function Precinct({
  page,
  pre,
  index,
  toggleService,
  double,
  funcval,
}) {
  return (
    <tr
      key={index}
      onDoubleClick={e => {
        funcval(pre.precinctId, pre.precinctName);
        double({
          value: pre.precinctId,
          name: "sobe",
        });
      }}
    >
      <td className={style.TableTd}> {(page - 1) * 8 + (index + 1)}</td>
      <td className={style.TableTd}>{pre.precinctName}</td>
      <td className={style.TableTd}>{pre.precinctId}</td>
      <td
        className={style.TableTd}
        style={{ cursor: "pointer" }}
        onClick={() => toggleService(pre.precinctId)}
      >
        <span className={style.Resetprecint}>
          <img src="/icons/edit.svg" alt="" />
        </span>
      </td>
    </tr>
  );
}
