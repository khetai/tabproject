import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Modal from "../../../Components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import { changeToast } from "../../../Store/auth";
import Loader from "../../../Components/Loader/Loader";
import { RotatingLines } from "react-loader-spinner";
import Select2Take from "../../../Components/Select/Select2Take";
const data = [];
const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 25px 30px;
`;
const containerVariant = {
  initial: { right: "-45%", transition: { type: "spring" } },
  isOpen: { right: "-15%" },
  exit: { right: "-45%" },
};
const errorInitial = {
  GroupName: null,
};
const Paginations = ({
  toggleService,
  isServiceOpen,
  setAddValue,
  addValue,
}) => {
  // const [isOpen, toggle] = useState(false);
  const [db, setDb] = useState([]);
  const [result, setresult] = useState();
  const [page, setPage] = useState(1);
  const [countpage, setCountpage] = useState();
  const [modalDatas, setModalDatas] = useState();
  const [load, setLoad] = useState(false);
  const [valid, setValid] = useState(errorInitial);
  const [take, setTake] = useState(10);
  function handlOpenModal2(open) {
    toggleService(open);
    setValid(errorInitial);
  }

  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const navigate = useNavigate();
  function handleNavgation(id) {
    navigate(`/subServicesCat/${id}`);
  }
  const handleChange = (event, value) => {
    setPage(Number(value));
  };

  const onChangeInput = e => {
    let name = e.target.name;
    let value = e.target.value;
    setValid(prev => ({
      ...prev,
      [name.charAt(0).toUpperCase() + name.slice(1)]: null,
    }));
    setAddValue(prevEdit => ({
      ...prevEdit,
      [name]: value,
    }));
    console.log(addValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Service/GetGroups?take=${take}&page=${page}`,
          null
        );
        if (res.isSuccess) {
          setresult(res.result);
          setDb(res.result);

          setCountpage(res.result.totalPage);
        } else {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        }
        console.log(res.result);
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
    setValid(errorInitial);
    dispatch(changeToast({ loading: true, type: false, message: null }));
    if (addValue.groupId === null) {
      try {
        const res = await sendRequest("POST", `Service/AddGroup`, addValue);
        console.log(res);
        if (res.isSuccess) {
          setDb(prevDb => ({
            ...prevDb,
            data: [res.result, ...prevDb.data],
          }));
          dispatch(
            changeToast({
              loading: false,
              type: true,
              message: "Dəyişiklik uğurla edildi",
            })
          );
          toggleService(false);
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
    } else {
      try {
        const res = await sendRequest(
          "PUT",
          `/Service/UpdateGroup/${addValue.groupId}`,
          addValue
        );
        console.log(res);
        console.log(db.data);
        if (res.isSuccess == true) {
          dispatch(
            changeToast({
              loading: false,
              type: true,
              message: "Uğurla əlavə edildi",
            })
          );
          setDb(prevDb => ({
            ...prevDb,
            data: prevDb.data.map(item =>
              item.groupId === res.result.groupId ? res.result : item
            ),
          }));
          toggleService(false);
        } else {
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: res.message,
            })
          );
        }
        console.log(res);
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
    }
    setAddValue({ groupId: null, groupName: null });
    setLoad(false);
  };

  function handleOpenUpdate(groupId) {
    console.log(addValue);
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Service/GetGroupById/${groupId}`,
          null
        );
        console.log(res);

        if (res.isSuccess) {
          toggleService(true);
          setModalDatas(res.result);
          setAddValue(res.result);
        } else {
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: res.message,
            })
          );
        }
        // console.log(dbDetail);
      } catch (err) {
        console.error(err);
        dispatch(
          changeToast({
            loading: false,
            type: false,
            message: err.message,
          })
        );
      }
    };
    fetchData();
  }

  return result ? (
    <>
      <div className={style.Table}>
        <table>
          <thead className={style.TableHeada}>
            <tr>
              <th>№</th>
              <th>Ad</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody className={style.TableBody}>
            {
              db.data.length>0?
              (
                db?.data?.map((service, index) => {
                  return (
                    <tr className={style.TableTr}>
                      <td className={`${style.TableTd} ${style.TableNumber}`}>
                        {" "}
                        {(page - 1) * 8 + (index + 1)}
                      </td>
                      <td className={style.TableTd}> {service.groupName}</td>
                      <td>
                        <button onClick={() => handleOpenUpdate(service.groupId)}>
                          <img src="/icons/pen-to-square-regular 1.svg" alt="" />
                        </button>
                        <button
                          style={{ cursor: "pointer", marginLeft: "10px" }}
                          onClick={() => handleNavgation(service.groupId)}
                        >
                          <img
                            src="/icons/send-svgrepo-com 1.svg"
                            alt="Servislər"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ):
              (
                <tr>
                  <td>Məlumat yoxdur</td>
                </tr>
              )
          }
          </tbody>
        </table>
      </div>
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
        isOpen={isServiceOpen}
        handleClose={() => {
          handlOpenModal2(false);
          setAddValue({
            groupId: null,
            groupName: null,
          });
          setValid(errorInitial);
        }}
        containerVariant={containerVariant}
        width={"60%"}
        // height={"35%"}
        left={"top"}
        leftcount={"50%"}
        side={"right"}
        sidecount={"0%"}
        showd={"none"}
      >
        <ModalContent>
          <div className={style.ModalTitle}>
            <h1 className={style.TitleText}>
              {addValue.groupId ? "Xidmət qrupu" : "Yeni xidmət qrupu"}
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
              <div className={style.InputContainer}>
                <label htmlFor="">
                  Qrup Adı:{" "}
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.GroupName !== null ? valid.GroupName : ""}
                  </span>
                </label>
                <input
                  className={style.Input}
                  name="groupName"
                  // value={}
                  style={
                    valid.GroupName !== null ? { border: "1px solid red" } : {}
                  }
                  required
                  value={addValue.groupName}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
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
            ) : addValue.groupId ? (
              "Yadda saxla"
            ) : (
              "Əlavə et"
            )}
          </button>
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
