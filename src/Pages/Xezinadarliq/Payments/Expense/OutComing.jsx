import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import usePrivate from "../../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
export default function OutComing({
  nom,
  data,
  toggleService,
  take,
  page,
  deleteOutComing,
  HandleDetail,
}) {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  return (
    <tr className={style.TableTr}>
      <td>{(page - 1) * take + (nom + 1)}</td>
      <td>{data.outcomingDate}</td>
      <td>{data.outcomingAmount}</td>
      <td>{data.bankAccountBankName}</td>
      <td>{data.bankAccountNo}</td>
      <td>{data.outcomingClientFullName}</td>
      <td>{data.outcomingReason}</td>
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
                deleteOutComing(data.outcomingId);
              }
            });
          }}
        >
          <img src={"/icons/deleteee.svg"} alt="" />
        </button>

        <button
          style={{ border: "none", background: "none" }}
          onClick={() => HandleDetail(data.outcomingId)}
        >
          <img src={"/icons/edit.svg"} alt="" />
        </button>
      </td>
    </tr>
  );
}
