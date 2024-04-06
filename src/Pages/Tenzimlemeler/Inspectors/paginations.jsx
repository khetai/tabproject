import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Modal from "../../../Components/Modal/Modal";
import Inspector from "./Inspector";
import { changeToast } from "../../../Store/auth";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import { RotatingLines } from "react-loader-spinner";
import Select2 from "../../../Components/Select/Select2";
import Select2Take from "../../../Components/Select/Select2Take";
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
  id: null,
  userFirstName: "",
  userLastName: "",
  userName: "",
  userEmail: "",
  userPhone: "",
  userPrecinctId: 0,
  userActive: true,
  userStatusId: 3,
};
const errorInitial = {
  UserEmail: null,
  UserFirstName: null,
  UserLastName: null,
  UserName: null,
  UserPrecinctId: null,
};
const Paginations = ({
  name,
  sobe,
  opmod,
  setopmod,
  precinct,
  double,
  funcval,
  load,
  setLoad,
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
  const handlOpenModal = async id => {
    if (id) {
      try {
        const res = await sendRequest("GET", `Inspector/${id}`, null);
        if (!res.isSuccess) {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        }
        setModalDatas(res.result);
        setEdit({
          ...inittial,
          id: id,
          userFirstName: res.result.userFirstName,
          userLastName: res.result.userLastName,
          userName: res.result.userName,
          userEmail: res.result.userEmail,
          userPhone: res.result.userPhone,
          userPrecinctId: res.result.userPrecinctId,
          userActive: res.result.userActive,
          userStatusId: res.result.userStatusId,
        });
        setopmod(true);
      } catch (err) {
        console.error(err);
        dispatch(
          changeToast({ loading: false, type: false, message: err.message })
        );
      }
    }
  };
  const handleChange = (event, value) => {
    setPage(Number(value));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Inspector?take=${take}&page=${page}&nameAndSurname=${name}&precinctId=${sobe}`,
          null
        );
        if (!res.isSuccess) {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        }
        console.log(res);
        setLoad(false);
        setresult(res.result.data);
        setDb(res.result);
        setCountpage(res.result.totalPage);
      } catch (err) {
        console.error(err);
        dispatch(
          changeToast({ loading: false, type: false, message: err.message })
        );
      }
    };

    fetchData();
  }, [page, name, sobe, take, load]);

  const onChangeInput = e => {
    console.log(e);
    if (e !== null) {
      let name = e.name;
      let value = e.value;
      setValid(prev => ({
        ...prev,
        [name.charAt(0).toUpperCase() + name.slice(1)]: null,
      }));
      if ("userPrecinctId" === name || name === "userStatusId") {
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
    } else {
      setEdit(prevEdit => ({
        ...prevEdit,
        ["userPrecinctId"]: null,
      }));
    }
  };

  const SendForm = async () => {
    console.log("start");
    setLoad(true);
    dispatch(changeToast({ loading: true, type: false, message: null }));
    if (edit.id) {
      try {
        const res = await sendRequest("Put", `Inspector/${edit.id}`, edit);
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
              item.userId === res.result.userId ? res.result : item
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
        console.log(err.response);
        if (err.response.status === 400) {
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
        const res = await sendRequest("POST", `Inspector`, edit);
        console.log(res);
        if (res.isSuccess) {
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
    setLoad(false);
  };
  return result ? (
    <>
        <table>
          <thead className={style.TableHeada}>
            <tr>
              <th>№</th>
              <th>#</th>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Vəzifə</th>
              <th>Şöbə</th>
              <th>Aktiv/Blok</th>
            </tr>
          </thead>
          <tbody className={style.TableBody}>
            {db?.data.length > 0 ? (
              db?.data?.map((x, i) => {
                return (
                  <Inspector
                    key={i}
                    page={page}
                    nom={i}
                    data={x}
                    toggleService={handlOpenModal}
                    double={double}
                    funcval={funcval}
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
                ? `İstifadəçi : ${edit.userFirstName} ${edit.userLastName}`
                : "Yeni istifadəçi"}{" "}
            </h1>
            <span
              className={style.Button}
              onClick={() => {
                setEdit(inittial);
                setopmod(false);
                setValid(errorInitial);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>

          <div className={style.ModalContainer}>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="userName">
                  İstifadəçi adı:
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.UserName !== null ? valid.UserName[0] : ""}
                  </span>{" "}
                </label>
                <input
                  className={style.Input}
                  name="userName"
                  id="userName"
                  style={
                    valid.UserName !== null ? { border: "1px solid red" } : {}
                  }
                  value={edit.userName}
                  onChange={e => onChangeInput(e.target)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">
                  Ad :
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.UserFirstName !== null ? valid.UserFirstName[0] : ""}
                  </span>
                </label>
                <input
                  className={style.Input}
                  style={
                    valid.UserFirstName !== null
                      ? { border: "1px solid red" }
                      : {}
                  }
                  name="userFirstName"
                  value={edit.userFirstName}
                  onChange={e => onChangeInput(e.target)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">
                  Soyad :
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.UserLastName !== null ? valid.UserLastName[0] : ""}
                  </span>
                </label>
                <input
                  className={style.Input}
                  name="userLastName"
                  style={
                    valid.UserLastName !== null
                      ? { border: "1px solid red" }
                      : {}
                  }
                  value={edit.userLastName}
                  onChange={e => onChangeInput(e.target)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">Vəzifə :</label>
                <select>
                  <option selected>İnspector</option>
                </select>
              </div>
            </div>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="">
                  Şöbə :{" "}
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.UserPrecinctId !== null ? valid.UserPrecinctId : ""}
                  </span>
                </label>
                <Select2
                  options={precinct?.map(x => ({
                    value: x.precinctId,
                    label: x.precinctName,
                    name: "userPrecinctId",
                  }))}
                  onChange={e => onChangeInput(e)}
                  value={edit.userPrecinctId}
                />
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="userEmail">
                  E-poçt :{" "}
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.UserEmail !== null ? valid.UserEmail[0] : ""}
                  </span>
                </label>
                <input
                  className={style.Input}
                  name="userEmail"
                  id="userEmail"
                  style={
                    valid.UserEmail !== null ? { border: "1px solid red" } : {}
                  }
                  value={edit.userEmail}
                  onChange={e => onChangeInput(e.target)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">Əlaqə Nömrəsi :</label>
                <input
                  className={style.Input}
                  name="userPhone"
                  value={edit.userPhone}
                  onChange={e => onChangeInput(e.target)}
                ></input>
              </div>
            </div>
            <button className={style.EditButton} onClick={SendForm}>
              {load ? (
                <RotatingLines
                  visible={true}
                  height="25"
                  width="25"
                  strokeColor="white"
                  // color="white"
                  // strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : edit.id ? (
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
