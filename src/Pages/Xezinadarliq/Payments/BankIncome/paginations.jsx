import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Modal from "../../../../Components/Modal/Modal";
import Items from "./Items";
import { changeToast } from "../../../../Store/auth";
import usePrivate from "./../../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Loader from "../../../../Components/Loader/Loader";
import Select2 from "../../../../Components/Select/Select2";
import Select2Take from "../../../../Components/Select/Select2Take";
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
  incomingId: null,
  incomingAmount: "",
  incomingType: 0,
  incomingClientId: 0,
  incomingBankAccountId: 0,
  incomingDate: "",
};
const errorInitial = {
  incomingAmount: "",
  incomingType: "",
  incomingClientId: 0,
  incomingBankAccountId: 0,
  incomingDate: "",
};
const Paginations = ({
  name,
  mcode,
  hcode,
  type,
  opmod,
  setopmod,
  banks,
  modalDatas,
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
  const [take, setTake] = useState(25);
  const [valid, setValid] = useState(errorInitial);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Transactions/GetIncomings?page=${page}&take=${take}&fromDate=${name}&toDate=${mcode}&bankAccountId=${hcode}&type=${type}`,
          null
        );
        if (!res.isSuccess) {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        }
        setresult(res.result.data);
        setDb(res.result);
        setCountpage(res.result.totalPage);
      } catch (err) {
        console.error(err);
        dispatch(
          changeToast({ loading: false, type: false, message: err.message })
        );
      }
      setLoad(false);
    };

    fetchData();
  }, [page, type, load, take]);

  const handleChange = (event, value) => {
    setPage(Number(value));
  };

  function HandleDetail(detailId) {
    console.log(detailId);
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Transactions/GetIncomings/${detailId}`,
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
    setValid(prev => ({
      ...prev,
      [name.charAt(0).toUpperCase() + name.slice(1)]: null,
    }));
    if (name == "incomingDate") {
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
    } else if (
      "incomingClientId" === name ||
      name === "incomingBankAccountId" ||
      name === "incomingType"
    ) {
      setEdit(prevEdit => ({
        ...prevEdit,
        [name]: parseInt(value),
      }));
    } else {
      setEdit(prevEdit => ({
        ...prevEdit,
        [name]: value,
      }));
    }
  };

  const SendForm = async () => {
    console.log("start");
    dispatch(changeToast({ loading: true, type: false, message: null }));
    if (edit.incomingId) {
      try {
        const res = await sendRequest(
          "Put",
          `Transactions/EditIncoming/${edit.incomingId}`,
          edit
        );
        console.log(res);
        if (res.isSuccess) {
          setEdit(inittial);
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
              item.id === res.result.id ? res.result : item
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
        const res = await sendRequest("POST", `Transactions/AddIncoming`, edit);
        console.log(res);
        if (res.isSuccess) {
          setEdit(inittial);
          dispatch(
            changeToast({
              loading: false,
              type: true,
              message: "Uğurla əlavə edildi",
            })
          );
          setopmod(false);
          setDb(prevDb => ({
            ...prevDb,
            data: [res.result, ...prevDb.data],
          }));
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
    }
  };

  function HandleDelete(deleteId) {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "DELETE",
          `Transactions/DeleteIncoming/${deleteId}`,
          null
        );
        console.log(res);
        if (res.isSuccess) {
          // setresult(res.result)
          setDb(prevDb => ({
            ...prevDb,
            data: db.data.filter(item => item.id != deleteId),
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
  return result ? (
    <>
      <table>
        <thead className={style.TableHeada}>
          <tr>
            <th>№</th>
            <th>Tarix</th>
            <th>Müştəri</th>
            <th>Müştəri kodu</th>
            <th>Məbləğ</th>
            <th>Bank adı</th>
            <th>Hesab nömrəsi</th>
            <th>Tipi</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody className={style.TableBody}>
          {db?.data.length > 0 ? (
            db?.data?.map((x, i) => {
              return (
                <Items
                  key={i}
                  page={page}
                  take={take}
                  nom={i}
                  data={x}
                  HandleDetail={HandleDetail}
                  HandleDelete={HandleDelete}
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
            <h1 className={style.TitleText}>
              {" "}
              {edit.id
                ? `Mədaxil : ${edit.userFirstName} ${edit.userLastName}`
                : "Yeni mədaxil"}{" "}
            </h1>
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

          <div className={style.ModalContainer}>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="incomingAmount">
                  Məbləğ:
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.incomingAmount !== null
                      ? valid.incomingAmount[0]
                      : ""}
                  </span>{" "}
                </label>
                <input
                  className={style.Input}
                  name="incomingAmount"
                  id="incomingAmount"
                  type="number"
                  value={edit.incomingAmount}
                  onChange={e => onChangeInput(e.target)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="incomingDate">
                  Tarix:
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.incomingDate !== null ? valid.incomingDate[0] : ""}
                  </span>{" "}
                </label>
                <input
                  className={style.Input}
                  name="incomingDate"
                  id="incomingDate"
                  type="text"
                  value={edit.incomingDate}
                  placeholder="dd.MM.yyyy"
                  onChange={e => onChangeInput(e.target)}
                />
              </div>
            </div>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="">Müştəri:</label>
                <Select2
                  options={modalDatas?.map(x => ({
                    value: x.clientId,
                    label: x.clientFullName,
                    name: "incomingClientId",
                  }))}
                  onChange={e => onChangeInput(e)}
                  value={edit.incomingClientId}
                  clear={false}
                />
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">Bank hesabı:</label>
                <Selectnew
                  name="incomingBankAccountId"
                  value={edit.incomingBankAccountId}
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
              </div>
            </div>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="">Tipi:</label>
                <Select2
                  options={[
                    {
                      value: 0,
                      label: "Seçin",
                      name: "incomingType",
                    },
                    {
                      value: 1,
                      label: "Avans",
                      name: "incomingType",
                    },
                    {
                      value: 2,
                      label: "Odəniş",
                      name: "incomingType",
                    },
                  ]}
                  onChange={e => onChangeInput(e)}
                  value={edit.incomingType}
                  clear={false}
                />
              </div>
            </div>
            <button className={style.EditButton} onClick={SendForm}>
              {edit.incomingId ? "Yadda saxla" : "Əlavə Et"}
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
