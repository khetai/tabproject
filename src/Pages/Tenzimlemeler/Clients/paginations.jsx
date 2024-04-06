import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import styled from "styled-components";
import Modal from "../../../Components/Modal/Modal";
import Client from "./Client";
import Loader from "../../../Components/Loader/Loader";
import { changeToast } from "../../../Store/auth";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch, useSelector } from "react-redux";
import Select2Take from "../../../Components/Select/Select2Take";
const data = [];
const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
`;
const containerVariant = {
  initial: { right: "-45%", transition: { type: "spring" } },
  isOpen: { right: "-25%" },
  exit: { right: "-45%" },
};
const Paginations = ({ name, voen, load, setLoad }) => {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  // const [isOpen, toggle] = useState(false);
  const [result, setresult] = useState();
  const [modalDatas, setModalDatas] = useState();
  const [page, setPage] = useState(1);
  const [countpage, setCountpage] = useState();
  const [isServiceOpen, toggleService] = useState(false);
  const initial = {
    clientId: null,
    clientClientTypeId: null,
    clientVoenorPassportNo: null,
    clientFullName: null,
    clientEmail: null,
    clientPhone: null,
    clientFieldOfActivity: null,
    clientCity: null,
    clientLegalAddress: null,
    clientActualAddress: null,
    clientIndex: null,
    clientWebsite: null,
    clientLeaderFullName: null,
    clientLeaderDuty: null,
    clientBankName: null,
    clientBankVoen: null,
    clientBankSwift: null,
    clientBankMh: null,
    clientBankHh: null,
    clientBankAccountNo: null,
  };

  const [clientEdit, setClientEdit] = useState(initial);
  const [mobValue, setmobmodal] = useState(initial);
  const [take, setTake] = useState(25);
  const onChangeInput = e => {
    let name = e.target.name;
    let value = e.target.value;
    setClientEdit(prevEdit => ({
      ...prevEdit,
      [name]: value,
    }));
    console.log(clientEdit);
  };

  const handlOpenModal2 = async id => {
    console.log(id);
    try {
      const res = await sendRequest("GET", `Client/${id}`, null);
      console.log(res.result);
      if (res.isSuccess) {
        setClientEdit(res.result);
        setModalDatas(res.result);
        toggleService(!isServiceOpen);
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

  const handleChange = (event, value) => {
    setPage(Number(value));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Client?take=${take}&page=${page}&name=${name}&voenOrPassport=${voen}`,
          null
        );
        if (res.isSuccess) {
          setresult(res.result.data);
          setLoad(false);
          console.log(res.result.data);
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
  }, [page, name, voen, take, load]);

  const SendForm = async clientId => {
    dispatch(changeToast({ loading: true, type: false, message: null }));
    try {
      const res = await sendRequest("PUT", `Client/${clientId}`, clientEdit);
      if (res.isSuccess) {
        setresult(prev => {
          return prev.map(item => {
            // If the clientId matches, replace the object with res.result
            if (item.clientId === res.result.clientId) {
              return res.result;
            }
            // Otherwise, keep the item unchanged
            return item;
          });
        });
        dispatch(
          changeToast({
            loading: false,
            type: true,
            message: "Uğurla dəyişiklik edildi",
          })
        );
        toggleService(false);
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
            <th>Müştəri Kodu</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody className={style.TableBody}>
          {result.length > 0 ? (
            result?.map((x, i) => {
              return (
                <Client
                  key={i}
                  toggleService={handlOpenModal2}
                  data={x}
                  index={i}
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
        isOpen={isServiceOpen}
        handleClose={() => handlOpenModal2(false)}
        containerVariant={containerVariant}
        width={"70%"}
        // height={"95%"}
        left={"top"}
        leftcount={"50%"}
        side={"right"}
        sidecount={"0%"}
        showd={"none"}
      >
        <ModalContent>
          <div className={style.ModalTitle}>
            <h1 className={style.TitleText}>Elektron gömrük müştərisi</h1>
            <button
              className={style.Button}
              onClick={() => toggleService(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className={style.ModalContainer}>
            <div className={style.Inputs}>
              <div className={`${style.InputContainer} ${style.LongInput}`}>
                <label htmlFor="">Müştərinin adı:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientFullName}
                  onChange={e => onChangeInput(e)}
                  name="clientFullName"
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">VÖEN:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientVoenorPassportNo}
                  onChange={e => onChangeInput(e)}
                  name="clientVoenorPassportNo"
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">Fəaliyyət növü:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientFieldOfActivity}
                  onChange={e => onChangeInput(e)}
                  name="clientFieldOfActivity"
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">Şəhər:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientCity}
                  onChange={e => onChangeInput(e)}
                  name="clientCity"
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">İndeks:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientIndex}
                  name="clientIndex"
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">Telefon:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientPhone}
                  onChange={e => onChangeInput(e)}
                  name="clientPhone"
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">Sayt:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientWebsite}
                  name="clientWebsite"
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">E-poçt:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientEmail}
                  onChange={e => onChangeInput(e)}
                  name="clientEmail"
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">Rəhbərin vəzifəsi:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientLeaderDuty}
                  name="clientLeaderDuty"
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">Rəhbərin A.S.A:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientLeaderFullName}
                  name="clientLeaderFullName"
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.ShortInput}`}>
                <label htmlFor="">Bank:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientBankName}
                  onChange={e => onChangeInput(e)}
                  name="clientBankName"
                ></input>
              </div>
              <div
                className={`${style.InputContainer} ${style.ManyShortInput}`}
              >
                <label htmlFor="">Hesab nömrəsi:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientBankAccountNo}
                  onChange={e => onChangeInput(e)}
                  name="clientBankAccountNo"
                ></input>
              </div>
              <div
                className={`${style.InputContainer} ${style.ManyShortInput}`}
              >
                <label htmlFor="">VÖEN (bank):</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientBankVoen}
                  name="clientBankVoen"
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div
                className={`${style.InputContainer} ${style.ManyShortInput}`}
              >
                <label htmlFor="">Kod:</label>
                <input className={style.Input}></input>
              </div>
              <div
                className={`${style.InputContainer} ${style.ManyShortInput}`}
              >
                <label htmlFor="">M/h:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientBankMh}
                  name="clientBankMh"
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div
                className={`${style.InputContainer} ${style.ManyShortInput}`}
              >
                <label htmlFor="">H/h:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientBankHh}
                  onChange={e => onChangeInput(e)}
                  name="clientBankHh"
                ></input>
              </div>
              <div
                className={`${style.InputContainer} ${style.ManyShortInput}`}
              >
                <label htmlFor="">SWIFT:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientBankSwift}
                  name="clientBankSwift"
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div
                className={`${style.InputContainer} ${style.ClientInputContainer} ${style.LongInput}`}
              >
                <label htmlFor="">Hüquqi ünvan:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientLegalAddress}
                  name="clientLegalAddress"
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div
                className={`${style.InputContainer} ${style.ClientInputContainer} ${style.LongInput}`}
              >
                <label htmlFor="">Faktiki ünvan:</label>
                <input
                  className={style.Input}
                  value={clientEdit.clientActualAddress}
                  onChange={e => onChangeInput(e)}
                  name="clientActualAddress"
                ></input>
              </div>
            </div>
            <button
              className={style.EditButton}
              onClick={() => SendForm(clientEdit.clientId)}
            >
              Dəyiş
            </button>
          </div>
        </ModalContent>
      </Modal>
    </>
  ) : (
    <Loader />
  );
};

export default Paginations;
