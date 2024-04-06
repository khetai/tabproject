import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Modal from "../../../../Components/Modal/Modal";
import OutComing from "./OutComing";
import { changeToast } from "../../../../Store/auth";
import usePrivate from "./../../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Loader from "../../../../Components/Loader/Loader";
import Select2Take from "../../../../Components/Select/Select2Take";
import Select2 from "../../../../Components/Select/Select2";
import Selectnew from "../../../../Components/Select/Selectnew";
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
  isOpen: { right: "-3%" },
  exit: { right: "-45%" },
};
const inittial = {
  outcomingId: null,
  outcomingDate: null,
  outcomingAmount: null,
  outcomingClientFullName: "",
  outcomingReason: "",
  outcomingBankAccountId: null,
};
const errorInitial = {
  UserEmail: null,
  UserFirstName: null,
  UserLastName: null,
  UserName: null,
};
const Paginations = ({
  opmod,
  setopmod,
  name,
  bankAccounts,
  startDate,
  finishDate,
  hcode,
  setLoad,
  load,
}) => {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [db, setDb] = useState();
  const [result, setresult] = useState();
  const [page, setPage] = useState(1);
  const [countpage, setCountpage] = useState();
  const [edit, setEdit] = useState(inittial);
  const [modalDatas, setModalDatas] = useState(null);
  const [valid, setValid] = useState(errorInitial);
  const [take, setTake] = useState(25);

  const handleChange = (event, value) => {
    setPage(Number(value));
  };

  function HandleDetail(detailId) {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Transactions/GetOutcomings/${detailId}`,
          null
        );
        console.log(res);
        if (res.isSuccess) {
          // setresult(res.result)
          setEdit(res.result);
          //  console.log(edit)
          // setDb(db.data.filter(item=>item.outComingId!==outComingId));
          setopmod(true);
          console.log(edit);
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
  }

  const onChangeInput = e => {
    console.log(e);
    let name = e.name;
    let value = e.value;
    if (name == "outcomingDate") {
      console.log("true");
      value = value.replace(/\D/g, "");
      if (value.length <= 2) {
      } else if (value.length <= 4) {
        value = `${value.slice(0, 2)}.${value.slice(2)}`;
      } else {
        value = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(
          4,
          8
        )}`;
      }
      setEdit(prevEdit => ({
        ...prevEdit,
        [name]: value,
      }));
    } else {
      setEdit(prevEdit => ({
        ...prevEdit,
        [name]: value,
      }));
    }
    console.log(edit);
  };

  const SendForm = async () => {
    console.log("start");
    dispatch(changeToast({ loading: true, type: false, message: null }));
    if (edit.outcomingId !== null) {
      try {
        const res = await sendRequest(
          "Put",
          `Transactions/EditOutcoming/${edit.outcomingId}`,
          edit
        );
        console.log(res);
        if (res.isSuccess) {
          dispatch(
            changeToast({
              loading: false,
              type: true,
              message: "Uğurla dəyişiklik edildi",
            })
          );
          setDb(prevDb => ({
            ...prevDb,
            data: prevDb.data.map(item =>
              item.outcomingId === res.result.outcomingId ? res.result : item
            ),
          }));
          setopmod(false);
        } else {
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: res.message,
            })
          );
        }
      } catch (err) {
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
    } else {
      try {
        const res = await sendRequest(
          "POST",
          `Transactions/AddOutcoming`,
          edit
        );
        console.log(res);
        if (res.isSuccess) {
          dispatch(
            changeToast({
              loading: false,
              type: true,
              message: "Uğurla əlavə edildi",
            })
          );
          // toggleService(false);
          setDb(prevDb => ({
            ...prevDb,
            data: [res.result, ...db.data],
          }));
          setopmod(false);
          console.log(db);
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
    }
  };

  function deleteOutComing(outComingId) {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "DELETE",
          `Transactions/DeleteOutcoming/${outComingId}`,
          null
        );
        console.log(res);
        if (res.isSuccess) {
          // setresult(res.result)
          console.log(db.data.filter(item => item.outcomingId != outComingId));
          setDb(prevDb => ({
            ...prevDb,
            data: db.data.filter(item => item.outcomingId != outComingId),
          }));
          console.log(db);
          // setDb(db.data.filter(item=>item.outComingId!==outComingId));
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
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Transactions/GetOutcomings?take=${take}&page=${page}&fromDate=${startDate}&toDate=${finishDate}&bankAccountId=${hcode}&fullName=${name}`,
          null
        );
        console.log(res);
        if (res.isSuccess) {
          setDb(res.result);
          setresult(res.result.data);
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
      setLoad(false);
    };

    fetchData();
  }, [page, name, startDate, hcode, finishDate, load, take]);
  return result ? (
    <>
      <table className={style.table}>
        <thead className={style.TableHeada}>
          <tr>
            <th>№</th>
            <th>Tarix</th>
            <th>Məbləğ</th>
            <th>Bank adı</th>
            <th>Hesab nömrəsi</th>
            <th>Kimə</th>
            <th>Səbəb</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody className={style.TableBody}>
          {console.log(db)}
          {db?.data.length > 0 ? (
            db?.data?.map((x, i) => {
              return (
                <OutComing
                  key={i}
                  page={page}
                  nom={i}
                  data={x}
                  deleteOutComing={deleteOutComing}
                  HandleDetail={HandleDetail}
                  take={take}
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
          <Select2Take onChange={e => setTake(e.value)} value={take} />
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
        isOpen={opmod}
        handleClose={() => {
          setopmod(false);
          setValid(errorInitial);
        }}
        containerVariant={containerVariant}
        width={"53%"}
        height={"auto"}
        left={"top"}
        leftcount={"50%"}
        side={"right"}
        sidecount={"0%"}
        showd={"none"}
      >
        <ModalContent>
          <div className={style.ModalTitle}>
            <h1 className={style.TitleText}>Məxaric</h1>
            <button
              className={style.Button}
              onClick={() => {
                setEdit(inittial);
                setopmod(false);
                setValid(errorInitial);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          {console.log(edit)}
          <div className={style.ModalContainer}>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="userName">Bank Hesabı:</label>
                <Selectnew
                  name="outcomingBankAccountId"
                  value={edit.outcomingBankAccountId}
                  // setsearch={setSearch}
                  handleChange={onChangeInput}
                  url="BankAccount/GetAccounts"
                  itemname="bankAccountBank"
                  itemId="bankAccount"
                  type={4}
                  width={"50%"}
                  height={"70%"}
                  searchName={"name"}
                  double={true}
                />
                {/* <select
                  defaultValue={edit.outcomingBankAccountId}
                  name="outcomingBankAccountId"
                  onChange={e => onChangeInput(e.target)}
                  id=""
                  className={style.Input}
                >
                  <option value={0}>seç</option>
                  {bankAccounts.map(bank => {
                    return <option value={bank.id}>{bank.name}</option>;
                  })}
                </select> */}
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">Ad, Soyad:</label>
                <input
                  className={style.Input}
                  name="outcomingClientFullName"
                  value={edit.outcomingClientFullName}
                  onChange={e => onChangeInput(e.target)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">Qeyd:</label>
                <input
                  className={style.Input}
                  name="outcomingReason"
                  value={edit.outcomingReason}
                  onChange={e => onChangeInput(e.target)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">Tarix:</label>
                <input
                  className={style.Input}
                  type="text"
                  name="outcomingDate"
                  value={edit.outcomingDate}
                  placeholder="dd.MM.yyyy"
                  onChange={e => onChangeInput(e.target)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">Məbləğ:</label>
                <input
                  className={style.Input}
                  name="outcomingAmount"
                  value={edit.outcomingAmount}
                  onChange={e => onChangeInput(e.target)}
                ></input>
              </div>
            </div>
            <button className={style.EditButton} onClick={SendForm}>
              {edit.outcomingId !== null ? "Yadda saxla" : "Əlavə et"}
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
