import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import { changeToast } from "../../../../Store/auth";
import usePrivate from "../../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function Items({
  nom,
  data,
  page,
  HandleDetail,
  HandleDelete,
  take,
}) {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [checked, setChecked] = useState({
    index: data.userId,
    active: data.userActive,
  });

  return (
    <tr className={style.TableTr} onDoubleClick={() => HandleDetail(data.id)}>
      <td>{(page - 1) * take + (nom + 1)}</td>
      <td>{data.incomingDate}</td>
      <td>{data.clientName}</td>
      <td>{data.clientCode}</td>
      <td>{data.amount}</td>
      <td>{data.bankName}</td>
      <td>{data.bankno}</td>
      <td>{data.typeid === 2 ? "Odenis" : "Avans"}</td>
      <td>
        <button
          style={{ border: "none", background: "none" }}
          onClick={() => {
            Swal.fire({
              title: "Əminsiniz?",
              text: "Əgər Məlumatları silsəniz geri qaytara bilmazsiniz",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then(result => {
              if (result.isConfirmed) {
                HandleDelete(data.id);
              }
            });
          }}
        >
          <img src={"/icons/deleteee.svg"} alt="" />
        </button>
        <button
          style={{ border: "none", background: "none" }}
          onClick={() => HandleDetail(data.id)}
        >
          <img src={"/icons/edit.svg"} alt="" />
        </button>
      </td>
    </tr>
  );
}
