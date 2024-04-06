import React from "react";
import style from "./index.module.css";
export default function Department({
  page,
  pre,
  index,
  toggleService,
  handleNavgation,
  double,
  funcval,
}) {
  return (
    <tr
      className={style.TableTr}
      key={index}
      onDoubleClick={() =>
        funcval
          ? (funcval(pre.departmentId, pre.departmentName),
            double({
              value: pre.departmentId,
              name: "departmentId",
            }))
          : toggleService(pre.departmentId)
      }
    >
      <td> {(page - 1) * 8 + (index + 1)}</td>
      <td>{pre.departmentName}</td>
      <td className={style.actionTd}>
        <button onClick={() => toggleService(pre.departmentId)}>
          {" "}
          <img src="/icons/pen-to-square-regular 1.svg" alt="" />
        </button>
        <button
          onClick={() => handleNavgation(pre.departmentId)}
          style={{ cursor: "pointer" }}
        >
          Məntəqələr
        </button>
      </td>
    </tr>
  );
}
