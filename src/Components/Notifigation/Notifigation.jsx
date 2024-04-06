import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import Modal from "../Modal/Modal";
import styled from "styled-components";
import usePrivate from "./../../Services/useAxiosPrivate2";
import { useDispatch, useSelector } from "react-redux";
import { changeNot, changeToast } from "../../Store/auth";
import Loader from "../Loader/Loader";
import Select2 from "../Select/Select2";
import { RotatingLines } from "react-loader-spinner";
const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  h1 {
    color: #5c3aff;
  }
`;
const containerVariant = {
  initial: { top: "-100%", transition: { type: "spring" } },
  isOpen: { top: "50%" },
  exit: { top: "-100%" },
};
const initial = {
  notificationId: null,
  notificationText: "",
  notificationReaderId: null,
  notificationTitle: "",
  notificationSendDate: "",
  notificationSenderId: "",
};
const errorInitial = {
  NotificationText: null,
  NotificationTitle: null,
};
const Notifigation = () => {
  const [db, setDb] = useState();
  const [isOpen, toggle] = useState(false);
  const [mobValue, setmobmodal] = useState();
  const [formdata, setFormdata] = useState(initial);
  const [valid, setValid] = useState(errorInitial);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  function handlOpenModal(open) {
    toggle(open);
  }
  const handleChange = e => {
    // e.preventDefault();
    setValid(errorInitial);
    if (e) {
      const { name, value } = e;
      console.log(e);
      setFormdata(prevEdit => ({
        ...prevEdit,
        [name]: value,
      }));
    } else {
      setFormdata(prevData => ({
        ...prevData,
        notificationReaderId: null,
      }));
    }
  };
  const SendForm = async e => {
    setLoad(true);
    e.preventDefault();
    console.log(formdata.notificationReaderId);
    dispatch(changeToast({ loading: true, type: false, message: null }));
    if (formdata.notificationId) {
      try {
        const res = await sendRequest(
          "PUT",
          `Notification/${formdata.notificationId}`,
          formdata
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
          setDb(prevDb => {
            const updatedNotes = prevDb.notes.map(note => {
              if (note.notificationId === res.result.notificationId) {
                return {
                  ...note,
                  notificationReaderId: res.result.notificationReaderId,
                  notificationTitle: res.result.notificationTitle,
                  notificationText: res.result.notificationText,
                };
              } else {
                return note;
              }
            });
            return { ...prevDb, notes: updatedNotes };
          });
          toggle(!isOpen);
        } else {
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: res.message,
            })
          );
        }
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error.response.data.errors);
          setValid(prev => ({
            ...prev,
            ...error.response.data.errors,
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
              message: error.message,
            })
          );
        }
      }
    } else {
      try {
        const res = await sendRequest("POST", `Notification`, formdata);
        console.log(res);
        if (res.isSuccess) {
          dispatch(
            changeToast({
              loading: false,
              type: true,
              message: "Uğurla əlavə edildi",
            })
          );
          setDb(prevDb => {
            return { ...prevDb, notes: [...prevDb.notes, res.result] };
          });

          toggle(!isOpen);
        } else {
          dispatch(
            changeToast({
              loading: false,
              type: false,
              message: res.message,
            })
          );
        }
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error.response.data.errors);
          setValid(prev => ({
            ...prev,
            ...error.response.data.errors,
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
              message: error.message,
            })
          );
        }
      }
    }
    setLoad(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest("GET", `Notification`, null);
        dispatch(changeNot({ message: res.message }));
        if (res.isSuccess) {
          setDb(res.result);
        }
        // setresult(res.data);
        // setCountpage(res.totalPage);
      } catch (err) {
        console.error(err);
        dispatch(changeNot({ message: err.message }));
      }
    };

    fetchData();
  }, []);
  const DeleteNote = async x => {
    setLoad(true);
    dispatch(
      changeToast({
        loading: true,
        type: false,
        message: null,
      })
    );
    const res = await sendRequest("DELETE", `Notification/${x}`, null);
    if (res.isSuccess) {
      dispatch(
        changeToast({
          loading: false,
          type: true,
          message: "Uğurla silindi",
        })
      );
    } else {
      dispatch(
        changeToast({
          loading: false,
          type: false,
          message: res.message,
        })
      );
    }
    let a = db.notes.filter(w => w.notificationId !== x);
    setDb({ ...db, notes: a });
    setLoad(false);
  };

  return (
    <div className={style.Main}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>Bildirişlər</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <button
                className={style.HeadAddButton}
                onClick={() => {
                  // handlOpenModal(true);
                  toggle(true);
                  setFormdata(initial);
                  setmobmodal();
                }}
              >
                <img src="/icons/pluscircle.svg" alt="" />
                <span>Yeni</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <ul className={style.Notification}>
        {db ? (
          db?.notes?.map((e, i) => {
            return (
              <li key={i}>
                <div className={style.Bell}>
                  <div className={`${style.BellDiv} ${style.deactive}`}>
                    <i class="fa-regular fa-bell"></i>
                  </div>
                </div>
                <div className={style.Message}>
                  <div className={style.MessageText}>
                    <p>{e.notificationTitle}</p>
                  </div>
                  <div className={style.MessageTime}>
                    <img src={"/icons/clock 1.svg"} alt="" />
                    <span>{e.notificationSendDate}</span>
                  </div>
                  <div className={style.NoteBtns}>
                    <button
                      className={style.DeleteBtn}
                      onClick={a => DeleteNote(e.notificationId)}
                    >
                      <img src={"/icons/deleteee.svg"} alt="" />
                    </button>
                    <button
                      className={style.DeleteBtn}
                      onClick={x => {
                        handlOpenModal(true);
                        setFormdata(e);
                      }}
                    >
                      <img
                        className={style.editbtnnot}
                        src={"/icons/edit.svg"}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <Loader />
        )}
      </ul>

      <Modal
        isOpen={isOpen}
        handleClose={() => {
          handlOpenModal(false);
          setValid(errorInitial);
        }}
        containerVariant={containerVariant}
        width={"40%"}
        // height={"50%"}
        left={"left"}
        leftcount={"50%"}
        side={"top"}
        sidecount={"50%"}
      >
        <ModalContent>
          <div className={style.NotiModal} style={{ width: "85%" }}>
            <ul className={style.FormItems}>
              <li
                className={`${style.FilterItem} ${style.shortItem}`}
                style={{
                  listStyle: "none",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Qəbul edən</label>
                <Select2
                  options={[
                    ...(db?.users?.map(x => ({
                      value: x.userId,
                      label: x.userFirstName + " " + x.userLastName,
                      name: "notificationReaderId",
                    })) || []),
                  ]}
                  onChange={e => handleChange(e)}
                  value={formdata?.notificationReaderId}
                  place="Bütün istifadəçilər..."
                />
              </li>
              <li className={`${style.FormItem} ${style.shortItem}`}>
                <label>Başlıq</label>
                <input
                  // ref={inputRef}
                  type="text"
                  defaultValue={formdata.notificationTitle}
                  style={
                    valid.NotificationTitle !== null
                      ? { border: "1px solid red" }
                      : {}
                  }
                  placeholder="Başlıq"
                  name="notificationTitle"
                  onChange={x => handleChange(x.target)}
                />
              </li>
              <li className={style.FormItem}>
                <div>
                  <label>Mətn</label>
                  <textarea
                    style={
                      valid.NotificationText !== null
                        ? { border: "1px solid red" }
                        : {}
                    }
                    type="text"
                    value={formdata?.notificationText}
                    placeholder="Mətn"
                    rows="4"
                    name="notificationText"
                    onChange={e => handleChange(e.target)}
                  />
                </div>
              </li>
              <li className={style.Formbutton}>
                <button
                  id={style.statusheaderadd}
                  className={style.HeadAddButton}
                  onClick={SendForm}
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
                  ) : (
                    <img src="/icons/pluscircle.svg" alt="" />
                  )}
                  <span>{formdata.notificationId ? "Dəyiş" : "Əlavə et"} </span>
                </button>
              </li>
            </ul>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Notifigation;
