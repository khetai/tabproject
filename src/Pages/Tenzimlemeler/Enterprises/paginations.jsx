import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import styled from "styled-components";
import Modal from "../../../Components/Modal/Modal";
import Enterprise from "./Enterprise";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import { changeToast } from "../../../Store/auth";
import Loader from "../../../Components/Loader/Loader";
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
const Paginations = (status, date, number, code) => {
  // const [isOpen, toggle] = useState(false);
  const [result, setresult] = useState();
  const [page, setPage] = useState(1);
  const [isServiceOpen, toggleService] = useState(false);
  const [db, setDb] = useState([]);
  function handlOpenModal2(open) {
    toggleService(open);
  }

  const initial = {
    companyDataId: null,
    companyDataAddress: null,
    companyDataAsanImzaKodu: null,
    companyDataAsanImzaSifresi: null,
    companyDataEmail: null,
    companyDataLeaderDuty: null,
    companyDataLeaderFullName: null,
    companyDataName: null,
    companyDataPhone: null,
    companyDataVoen: null,
  };
  const [dbDetail, setDbDetail] = useState(initial);

  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();

  // function handlOpenModal(open) {
  //   // toggle(open);
  //   console.log(mobValue);
  // }
  const handleChange = (event, value) => {
    setPage(Number(value));
  };

  const onChangeInput = e => {
    let name = e.target.name;
    let value = e.target.value;
    setDbDetail(prevEdit => ({
      ...prevEdit,
      [name]: value,
    }));
    console.log(dbDetail);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest("GET", `Admin/GetCompanyData`, null);
        console.log(res.result);
        if (res.isSuccess) {
          setresult(res.result);
          setDb(res.result);
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
  }, [page]);

  const SendForm = async () => {
    dispatch(changeToast({ loading: true, type: false, message: null }));
    // console.log(id);
    try {
      const res = await sendRequest("PUT", `Admin/EditCompanyData`, dbDetail);
      if (res.isSuccess == true) {
        setDb(dbDetail);
        dispatch(
          changeToast({
            loading: false,
            type: true,
            message: "Uğurla dəyişiklik edildi",
          })
        );
        toggleService(!isServiceOpen);
      } else {
        dispatch(
          changeToast({ loading: false, type: false, message: res.message })
        );
      }
      console.log(res);
    } catch (err) {
      console.error(err);
      dispatch(
        changeToast({ loading: false, type: false, message: err.message })
      );
    }
  };

  return result ? (
    <>
      <table>
        <thead className={style.TableHeada}>
          <tr>
            <th>№</th>
            <th>Ad</th>
            <th>VÖEN</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody className={style.TableBody}>
          {<Enterprise toggleService={toggleService} db={db} />}
        </tbody>
      </table>
      <Modal
        isOpen={isServiceOpen}
        handleClose={() => handlOpenModal2(false)}
        containerVariant={containerVariant}
        width={"58%"}
        height={"auto"}
        left={"top"}
        leftcount={"50%"}
        side={"right"}
        sidecount={"0%"}
        showd={"none"}
      >
        <ModalContent>
          <div className={style.ModalTitle}>
            <h1 className={style.TitleText}>Elektron gömrük istifadəçisi</h1>
            <button
              className={style.Button}
              onClick={() => toggleService(false)}
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className={style.ModalContainer}>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="">Ad:</label>
                <input
                  className={style.Input}
                  name="companyDataName"
                  value={dbDetail.companyDataName}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">VÖEN:</label>
                <input
                  className={style.Input}
                  name="companyDataVoen"
                  value={dbDetail.companyDataVoen}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
            </div>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="">Rəhbərin S.A.A:</label>
                <input
                  className={style.Input}
                  name="companyDataLeaderFullName"
                  value={dbDetail.companyDataLeaderFullName}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">Rəhbərin vəzifəsi:</label>
                <input
                  className={style.Input}
                  name="companyDataLeaderDuty"
                  value={dbDetail.companyDataLeaderDuty}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
            </div>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="">Ünvan:</label>
                <input
                  className={style.Input}
                  name="companyDataAddress"
                  value={dbDetail.companyDataAddress}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">Əlaqə nömrəsi:</label>
                <input
                  className={style.Input}
                  name="companyDataPhone"
                  value={dbDetail.companyDataPhone}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
            </div>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="">E-poçt:</label>
                <input
                  className={style.Input}
                  name="companyDataEmail"
                  value={dbDetail.companyDataEmail}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={style.InputContainer}>
                <label htmlFor="">Asan imza kodu:</label>
                <input
                  className={style.Input}
                  name="companyDataAsanImzaKodu"
                  value={dbDetail.companyDataAsanImzaKodu}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
            </div>
            <div className={style.Inputs}>
              <div className={style.InputContainer}>
                <label htmlFor="">Asan imza şifrəsi :</label>
                <input
                  className={style.Input}
                  name="companyDataAsanImzaSifresi"
                  value={dbDetail.companyDataAsanImzaSifresi}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
            </div>
            <button
              className={style.EditButton}
              onClick={() => SendForm(dbDetail.companyDataId)}
            >
              Yadda saxla
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
