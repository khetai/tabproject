import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import styled from "styled-components";
import Modal from "../../../Components/Modal/Modal";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import { changeToast } from "../../../Store/auth";
import Precinct from "./Precinct";
import Loader from "../../../Components/Loader/Loader";
import { RotatingLines } from "react-loader-spinner";
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
const Paginations = ({
  id,
  dbDetail,
  setDbDetail,
  toggleService,
  isServiceOpen,
  double,
  funcval,
}) => {
  // const [isOpen, toggle] = useState(false);
  const [result, setresult] = useState();
  const [page, setPage] = useState(1);
  const [countpage, setCountpage] = useState(1);
  const [modalDatas, setModalDatas] = useState();
  const [db, setDb] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [load, setLoad] = useState(false);
  const [valid, setvalid] = useState();
  function handlOpenModal2(open) {
    toggleService(open);
  }
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();

  const handleChange = (event, value) => {
    setPage(Number(value));
  };

  useEffect(() => {
    let url;
    if (id != null) {
      url = `Precinct/GetPrecinctsFromDepartment/${id}`;
    } else {
      url = `Precinct/All`;
    }
    const fetchData = async () => {
      try {
        const res = await sendRequest("GET", url, null);
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
  }, [page]);

  //alldepartments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Precinct/GetAllDepartments`,
          null
        );
        console.log(res);
        if (res.isSuccess) {
          // setresult(res.result)
          setDepartments(res.result);
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
  }, []);

  const SendForm = async () => {
    setLoad(true);
    dispatch(changeToast({ loading: true, type: false, message: null }));

    if (dbDetail.precinctId === null) {
      try {
        const res = await sendRequest("POST", `Precinct`, dbDetail);
        console.log(res);
        if (res.isSuccess) {
          dispatch(
            changeToast({
              loading: false,
              type: true,
              message: "Uğurla əlavə edildi",
            })
          );
          toggleService(false);
          setDb([res.result, ...db]);
        } else {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        }
      } catch (err) {
        console.error(err.response);
        if (err.response.status === 400) {
          setvalid(err.response.data.errors.DepartmentName);
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: err.response.data.errors.DepartmentName,
            })
          );
        } else {
          dispatch(
            changeToast({ loading: false, type: false, message: err.message })
          );
        }
      }
      setLoad(false);
    } else {
      try {
        const res = await sendRequest(
          "PUT",
          `Precinct/${dbDetail.precinctId}`,
          dbDetail
        );
        console.log(res);
        if (res.isSuccess == true) {
          toggleService(false);
          if (res.result.precinctDepartmentId == id) {
            //state update
            alert("uygundur");
            setDb(prev => {
              return prev.map(item => {
                // If the clientId matches, replace the object with res.result
                if (item.precinctId === res.result.precinctId) {
                  return res.result;
                }
                // Otherwise, keep the item unchanged
                return item;
              });
            });
          } else {
            //stateden sil
            setDb(prev => {
              return prev.filter(
                item => item.precinctId !== res.result.precinctId
              );
            });
          }
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
          setvalid(err.response.data.errors.DepartmentName);
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: err.response.data.errors.DepartmentName,
            })
          );
        } else {
          dispatch(
            changeToast({ loading: false, type: false, message: err.message })
          );
        }
      }
      setLoad(false);
    }
  };

  function handleModalDetail(preId) {
    console.log("asdasd");
    const fetchData = async () => {
      try {
        const res = await sendRequest("GET", `Precinct/${preId}`, null);
        console.log(res.result);
        if (res.isSuccess) {
          toggleService(true);
          setModalDatas(res.result);
          setDbDetail(res.result);
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
            <th>Ad</th>
            <th>Kod</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody className={style.TableBody}>
          {db.length > 0 ? (
            db?.map((pre, index) => {
              return (
                <Precinct
                  toggleService={handleModalDetail}
                  pre={pre}
                  index={index}
                  page={page}
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
              {dbDetail.precinctId ? "Məntəqə" : "Yeni məntəqə"}
            </h1>
            <span className={style.Button} onClick={() => toggleService(false)}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <div className={style.ModalContainer}>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="">Ad :</label>
                <input
                  className={style.Input}
                  name="precinctName"
                  value={dbDetail.precinctName}
                  onChange={e =>
                    setDbDetail(prev => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                ></input>
              </div>
              {dbDetail.precinctId !== null ? (
                <div className={style.InputContainer}>
                  <label htmlFor="">Şöbə :</label>
                  <select
                    defaultValue={dbDetail.precinctDepartmentId}
                    name="precinctDepartmentId"
                    id=""
                    className={style.Input}
                    onChange={e =>
                      setDbDetail(prev => ({
                        ...prev,
                        [e.target.name]: Number(e.target.value),
                      }))
                    }
                  >
                    {departments?.map(dep => {
                      return (
                        <option value={dep.departmentId}>
                          {dep.departmentName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : null}
            </div>
          </div>
          <button
            className={style.EditButton}
            onClick={() => SendForm(dbDetail.precinctId)}
          >
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
            ) : dbDetail.precinctId ? (
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
