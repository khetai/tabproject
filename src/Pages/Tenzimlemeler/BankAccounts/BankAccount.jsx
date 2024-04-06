import React from "react";
import style from "./index.module.css";
export default function BankAccount({
  page,
  pre,
  index,
  handleModalDetail,
  take,
}) {
  return (
    <tr>
      <td> {(page - 1) * take + (index + 1)}</td>
      <td>{pre.bankAccountBankName}</td>
      <td> {pre.bankAccountHh}</td>
      <td> {pre.bankAccountMh}</td>
      <td> {pre.bankAccountNo}</td>
      <td> {pre.bankAccountSwift}</td>
      <td>{pre.bankAccountVoen}</td>
      <td>
        <button
          className={style.ResetPassword}
          onClick={() => handleModalDetail(pre.bankAccountId)}
        >
          <img src={"/icons/edit.svg"} title="Edit" />
        </button>
      </td>
    </tr>
  );
}
