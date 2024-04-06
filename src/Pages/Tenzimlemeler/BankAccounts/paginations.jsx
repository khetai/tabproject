import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import styled from "styled-components";
import Modal from "../../../Components/Modal/Modal";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import { changeToast } from "../../../Store/auth";
import BankAccount from "./BankAccount";
import Loader from "../../../Components/Loader/Loader";
import Select2Take from "../../../Components/Select/Select2Take";
import { RotatingLines } from "react-loader-spinner";
const data = [];
const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 30px;
`;
const containerVariant = {
  initial: { right: "-45%", transition: { type: "spring" } },
  isOpen: { right: "-10%" },
  exit: { right: "-45%" },
};
const errorInitial = {
  BankAccountBankName: null,
  BankAccountHh: null,
  BankAccountMh: null,
  BankAccountNo: null,
  BankAccountSwift: null,
  BankAccountVoen: null,
};
const Paginations = ({
  dbDetail,
  setDbDetail,
  toggleService,
  isServiceOpen,
}) => {
  // const [isOpen, toggle] = useState(false);
  const [result, setresult] = useState();
  const [page, setPage] = useState(1);
  const [preValue, setPreValue] = useState(null);
  const [modalDatas, setModalDatas] = useState();
  const [db, setDb] = useState([]);
  const [countpage, setCountpage] = useState(1);
  const [take, setTake] = useState(25);
  const [load, setLoad] = useState(false);
  const [valid, setValid] = useState(errorInitial);
  function handlOpenModal2(open) {
    toggleService(open);
  }
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();

  const handleChange = (event, value) => {
    setPage(Number(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `BankAccount?take=${take}&page=${page}`,
          null
        );
        console.log(res.result);
        if (res.isSuccess) {
          setresult(res.result);
          setDb(res.result);
          setCountpage(res.result.totalPage);
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
  }, [page, take]);

  const SendForm = async () => {
    setLoad(true);
    if (dbDetail.bankAccountId === null) {
      try {
        const res = await sendRequest("POST", `BankAccount`, dbDetail);
        console.log(res.result);
        if (res.isSuccess) {
          setDb(prevDb => ({
            ...prevDb,
            data: [res.result, ...prevDb.data],
          }));
          toggleService(false);
          dispatch(
            changeToast({
              loading: false,
              type: true,
              message: "Uğurla əlavə edildi",
            })
          );
        } else {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        }
      } catch (err) {
        console.error(err.response.data.errors);
        if (err.response.status === 400) {
          console.log(err.response.data.errors);
          setValid(prev => ({
            ...prev,
            ...err.response.data.errors,
          }));
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: "Validation error",
            })
          );
        } else {
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: err.message,
            })
          );
        }
      }
      setLoad(false);
    } else {
      try {
        const res = await sendRequest(
          "PUT",
          `BankAccount/${dbDetail.bankAccountId}`,
          dbDetail
        );
        if (res.isSuccess == true) {
          console.log(res);
          setDb(prevDb => ({
            ...prevDb,
            data: prevDb.data.map(item =>
              item.bankAccountId === res.result.bankAccountId
                ? res.result
                : item
            ),
          }));

          toggleService(false);
          dispatch(
            changeToast({
              loading: false,
              type: true,
              message: "Uğurla dəyişiklik edildi",
            })
          );
        } else {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        }
      } catch (err) {
        console.error(err);
        if (err.response.status === 400) {
          console.log(err.response.data.errors);
          setValid(prev => ({
            ...prev,
            ...err.response.data.errors,
          }));
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: "Validation error",
            })
          );
        } else {
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: err.message,
            })
          );
        }
      }
      setLoad(false);
    }
  };

  function handleModalDetail(preId) {
    setValid(errorInitial);
    const fetchData = async () => {
      try {
        const res = await sendRequest("GET", `BankAccount/${preId}`, null);
        if (res.isSuccess) {
          toggleService(true);
          setDbDetail(res.result);
          setModalDatas(res.result);
          setPreValue(res.result.precinctName);
          console.table(res.result);
        } else {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        }
        // console.log(dbDetail);
      } catch (err) {
        console.error(err);
        dispatch(
          changeToast({ loading: false, type: false, message: err.message })
        );
      }
    };
    fetchData();
  }

  const onChangeInput = e => {
    let name = e.target.name;
    let value = e.target.value;
    setValid(prev => ({
      ...prev,
      [name.charAt(0).toUpperCase() + name.slice(1)]: null,
    }));
    setDbDetail(prevEdit => ({
      ...prevEdit,
      [name]: value,
    }));
    // console.log(dbDetail);
  };

  return result ? (
    <>
      <table>
        <thead className={style.TableHeada}>
          <tr>
            <th>№</th>
            <th>Bank Adı</th>
            <th>H/h</th>
            <th>M/h</th>
            <th>Account No</th>
            <th>Swift</th>
            <th>VÖEN</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody className={style.TableBody}>
          {console.log(db.data)}
          {db?.data.length > 0 ? (
            db?.data?.map((pre, index) => {
              return (
                <BankAccount
                  toggleService={toggleService}
                  pre={pre}
                  page={page}
                  index={index}
                  take={take}
                  handleModalDetail={handleModalDetail}
                />
              );
            })
          ) : (
            <tr>
              <td>Məlumat yoxdur</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={style.paginate}>
        <div className={style.PaginationSelect}>
          <Select2Take
            onChange={e => {
              setTake(e.value);
              setPage(1);
            }}
            value={take}
          />
        </div>
        <Stack spacing={2}>
          <Pagination
            count={countpage}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
      <Modal
        isOpen={isServiceOpen}
        handleClose={() => handlOpenModal2(false)}
        containerVariant={containerVariant}
        width={"60%"}
        height={"auto"}
        left={"top"}
        leftcount={"50%"}
        side={"right"}
        sidecount={"0%"}
        showd={"none"}
      >
        <ModalContent>
          <div className={style.ModalTitle}>
            <h1 className={style.TitleText}>
              {dbDetail.bankAccountId ? "Bank hesabı" : "Yeni bank hesabı"}
            </h1>
            <button
              className={style.Button}
              onClick={() => {
                toggleService(false);
                setValid(errorInitial);
              }}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className={style.ModalContainer}>
            <div className={style.Inputs}>
              <div className={`${style.InputContainer} ${style.LongInput}`}>
                <label htmlFor="">
                  Bank adı:{" "}
                  {valid.BankAccountBankName ? (
                    <span style={{ color: "red" }}>
                      {valid.BankAccountBankName}
                    </span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  style={
                    valid.BankAccountBankName ? { border: "1px solid red" } : {}
                  }
                  className={style.Input}
                  name="bankAccountBankName"
                  value={dbDetail.bankAccountBankName}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.LongInput}`}>
                <label htmlFor="">
                  Bank Nömrəsi:{" "}
                  {valid.BankAccountNo ? (
                    <span style={{ color: "red" }}>{valid.BankAccountNo}</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  style={valid.BankAccountNo ? { border: "1px solid red" } : {}}
                  className={style.Input}
                  name="bankAccountNo"
                  value={dbDetail.bankAccountNo}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
            </div>
            <div className={style.Inputs}>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">
                  Bank VÖEN:{" "}
                  {valid.BankAccountVoen ? (
                    <span style={{ color: "red" }}>
                      {valid.BankAccountVoen}
                    </span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  style={
                    valid.BankAccountVoen ? { border: "1px solid red" } : {}
                  }
                  className={style.Input}
                  name="bankAccountVoen"
                  value={dbDetail.bankAccountVoen}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">
                  SWIFT:{" "}
                  {valid.BankAccountSwift ? (
                    <span style={{ color: "red" }}>
                      {valid.BankAccountSwift}
                    </span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  style={
                    valid.BankAccountSwift ? { border: "1px solid red" } : {}
                  }
                  className={style.Input}
                  name="bankAccountSwift"
                  value={dbDetail.bankAccountSwift}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">
                  H/h:{" "}
                  {valid.BankAccountHh ? (
                    <span style={{ color: "red" }}>{valid.BankAccountHh}</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  style={valid.BankAccountHh ? { border: "1px solid red" } : {}}
                  className={style.Input}
                  name="bankAccountHh"
                  value={dbDetail.bankAccountHh}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">
                  M/h:{" "}
                  {valid.BankAccountMh ? (
                    <span style={{ color: "red" }}>{valid.BankAccountMh}</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  style={valid.BankAccountMh ? { border: "1px solid red" } : {}}
                  className={style.Input}
                  name="bankAccountMh"
                  value={dbDetail.bankAccountMh}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
            </div>
            <button
              className={style.EditButton}
              onClick={() => SendForm(dbDetail.id)}
            >
              {" "}
              {load ? (
                <RotatingLines
                  visible={true}
                  height="20"
                  width="20"
                  strokeColor="white"
                  // color="white"
                  // strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : dbDetail.bankAccountId ? (
                "Yadda saxla"
              ) : (
                "Əlavə et"
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  ) : (
    <>
      <Loader />
    </>
  );
};

export default Paginations;
