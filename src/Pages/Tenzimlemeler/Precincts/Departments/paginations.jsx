import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Modal from "../../../../Components/Modal/Modal";
import usePrivate from "../../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import { changeToast } from "../../../../Store/auth";
import Loader from "../../../../Components/Loader/Loader";
import Department from "./department";
import { useNavigate } from "react-router-dom";
import Select2Take from "../../../../Components/Select/Select2Take";
import { RotatingLines } from "react-loader-spinner";
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
const Paginations = ({
  dbDetail,
  setDbDetail,
  toggleService,
  double,
  funcval,
  isServiceOpen,
}) => {
  // const [isOpen, toggle] = useState(false);
  const [result, setresult] = useState();
  const [page, setPage] = useState(1);
  const [countpage, setCountpage] = useState(1);
  const [modalDatas, setModalDatas] = useState();
  const [take, setTake] = useState(10);
  const [db, setDb] = useState([]);
  const [load, setLoad] = useState(false);
  const [valid, setvalid] = useState();
  function handlOpenModal2(open) {
    toggleService(open);
  }
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();

  const handleChange = (event, value) => {
    setPage(Number(value));
    setvalid();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Precinct/GetAllDepartmentsWithPagination?take=${take}&page=${page}`,
          null
        );
        console.log(res);
        if (res.isSuccess) {
          setresult(res.result);
          setDb(res.result.data);
          setCountpage(res.result.totalPage);

          // setDbDetail(res.result)
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
    dispatch(changeToast({ loading: true, type: false, message: null }));

    if (dbDetail.departmentId === null) {
      try {
        const res = await sendRequest("POST", `Precinct/AddDepartment`, {
          departmentName: dbDetail.departmentName,
        });
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
        console.error(err.response.data.errors.DepartmentName);
        if (err.response.status === 400) {
          console.log("errrr");
          setvalid(err.response.data.errors.DepartmentName[0]);
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: err.response.data.errors.DepartmentName[0],
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
          `Precinct/UpdateDepartment/${dbDetail.departmentId}`,
          dbDetail
        );
        if (res.isSuccess == true) {
          console.log(res);
          toggleService(false);
          setDb(prev => {
            return prev.map(item => {
              // If the clientId matches, replace the object with res.result
              if (item.departmentId === res.result.departmentId) {
                return res.result;
              }
              // Otherwise, keep the item unchanged
              return item;
            });
          });
          console.log(dbDetail);
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
          setvalid(err.response.data.errors.DepartmentName[0]);
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: err.response.data.errors.DepartmentName[0],
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
  const navigate = useNavigate();
  function handleNavgation(id) {
    navigate(`/precincts/${id}`);
  }

  function handleModalDetail(preId) {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Precinct/GetDepartmentById/${preId}`,
          null
        );
        console.log(res);
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
            {console.log(db)}
            {
            db.length>0?(

              db?.map((pre, index) => {
                return (
                  <Department
                    toggleService={handleModalDetail}
                    pre={pre}
                    index={index}
                    page={page}
                    double={double}
                  funcval={funcval}
                  handleNavgation={handleNavgation}
                  />
                );
              })
            ):
            (
              <tr>
                <td>
                  Məlumat yoxdur
                </td>
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
              {dbDetail.departmentId ? "Şöbə" : "Yeni Şöbə"}
            </h1>
            <button
              className={style.Button}
              onClick={() => {
                toggleService(false);
                setvalid();
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className={style.ModalContainer}>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="">Ad:</label>
                <input
                  className={style.Input}
                  name="departmentName"
                  value={dbDetail.departmentName}
                  style={valid ? { border: "1px solid red" } : {}}
                  onChange={e => {
                    setDbDetail(prev => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                    setvalid();
                  }}
                ></input>
              </div>
            </div>
          </div>
          {console.log(dbDetail.departmentId)}
          <button
            className={style.EditButton}
            onClick={() => SendForm(dbDetail.departmentId)}
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
            ) : dbDetail.departmentId ? (
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
