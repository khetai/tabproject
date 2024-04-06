import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import styled from "styled-components";
import Modal from "../../../../Components/Modal/Modal";
import usePrivate from "./../../../../Services/useAxiosPrivate2";
import { useDispatch, useSelector } from "react-redux";
import { changeNot, changeToast } from "../../../../Store/auth";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../../../../Components/Loader/Loader";
import { RotatingLines } from "react-loader-spinner";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
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
  ServiceUnit: null,
  ServiceEqcode: null,
  ServiceName: null,
  ServiceShortName: null,
  ServicePrice: null,
  ServiceCode: null,
  ServiceBonus: null,
};
const Paginations = ({
  toggleService,
  isServiceOpen,
  setDb,
  db,
  setDbDetail,
  dbDetail,
}) => {
  const [result, setresult] = useState();
  const [page, setPage] = useState(1);
  const [countpage, setCountpage] = useState();
  const [modalDatas, setModalDatas] = useState();
  const [valid, setValid] = useState(errorInitial);
  const [load, setLoad] = useState(false);
  const [take, setTake] = useState(10);
  const [Menuid, setMenuid] = useState();
  const { id } = useParams();
  function handlOpenModal2(open) {
    toggleService(open);
  }
  const { show } = useContextMenu();

  function displayMenu(e, menuId) {
    e.preventDefault();
    show({
      id: menuId,
      event: e,
    });
  }
  const SendForm = async () => {
    setLoad(true);
    setValid(errorInitial);
    dispatch(changeToast({ loading: true, type: false, message: null }));
    console.log(dbDetail);
    if (dbDetail.serviceId === 0) {
      try {
        const res = await sendRequest("POST", `Service`, dbDetail);
        if (res.isSuccess) {
          dispatch(
            changeToast({
              loading: false,
              type: true,
              message: "Uğurla dəyişiklik edildi",
            })
          );
          setDb([res.result, ...db]);
          toggleService(false);
        } else {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
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
    } else {
      try {
        const res = await sendRequest(
          "PUT",
          `Service/${dbDetail.serviceId}`,
          dbDetail
        );
        if (res.isSuccess == true) {
          dispatch(
            changeToast({
              loading: false,
              type: true,
              message: "Uğurla əlavə edildi",
            })
          );
          toggleService(false);
          setDb(prev => {
            return prev.map(item => {
              console.log(item);
              // If the clientId matches, replace the object with res.result
              if (item.serviceId === res.result.serviceId) {
                return res.result;
              }
              // Otherwise, keep the item unchanged
              return item;
            });
          });
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
    setLoad(false);
  };

  function handleEditModal(serviceId) {
    toggleService(true);
    const fetchData = async () => {
      try {
        const res = await sendRequest("GET", `Service/${serviceId}`, null);
        dispatch(changeNot({ message: res.message }));
        if (res.isSuccess) {
          setDbDetail(res.result);
          setModalDatas(res.result);
          console.table(res.result);
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

  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const handleChange = (event, value) => {
    setPage(Number(value));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest("GET", `Service?groupid=${id}`, null);
        if (res.isSuccess) {
          setresult(res.result);
          setDb(res.result);
          console.table(res.result);
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
  }, []);

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
    console.log(dbDetail);
  };

  return result ? (
    <>
      <div className={style.Table}>
        <table>
          <thead className={style.TableHeada}>
            <tr>
              <th>№</th>
              <th>#</th>
              <th>Kod</th>
              <th>Ad</th>
              <th>Qiymət</th>
              <th>ƏDV</th>
              <th>Cəm</th>
            </tr>
          </thead>
          <tbody className={style.TableBody}>
            {db.map((subService, index) => {
              const menuId = `menu-${subService.serviceId}`;
              return (
                <tr
                  className={style.TableTr}
                  onContextMenu={e => displayMenu(e, menuId)}
                  onDoubleClick={() => handleEditModal(subService.serviceId)}
                >
                  <td className={`${style.TableTd} ${style.TableNumber}`}>
                    {index + 1}
                  </td>
                  <td>
                    <i
                      class="fa-solid fa-bars"
                      onClick={e => displayMenu(e, menuId)}
                    ></i>
                  </td>
                  <td className={style.TableTd}>{subService.serviceEqcode}</td>
                  <td className={style.TableTd}>{subService.serviceName}</td>
                  <td className={style.TableTd}>{subService.servicePrice}</td>
                  <td className={style.TableTd}>
                    {(subService.servicePrice * 0.18).toFixed(2)}
                  </td>
                  <td className={style.TableTd}>
                    {(
                      subService.servicePrice * 0.18 +
                      subService.servicePrice
                    ).toFixed(2)}
                  </td>

                  <Menu id={"menu-" + subService.serviceId} animation="scale">
                    <Item onClick={() => handleEditModal(subService.serviceId)}>
                      <span
                        class="Service_info__e+dbC"
                        style={{ marginRight: "5px" }}
                      >
                        <i class="fa-solid fa-info"></i>
                      </span>
                      Bax
                    </Item>
                    <Separator />
                    <Item onClick={() => handleEditModal(subService.serviceId)}>
                      <img
                        src={"/icons/edit.svg"}
                        title="Edit"
                        style={{ marginRight: "5px" }}
                      />
                      Dəyiş
                    </Item>
                    <Separator />
                    {/* <Submenu label="Submenu">
          <Item>Sub Item 2</Item>
        </Submenu> */}
                  </Menu>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isServiceOpen}
        handleClose={() => handlOpenModal2(false)}
        containerVariant={containerVariant}
        width={"60%"}
        // height={"92%"}
        left={"top"}
        leftcount={"50%"}
        side={"right"}
        sidecount={"0%"}
        showd={"none"}
      >
        <ModalContent>
          <div className={style.ModalTitle}>
            <h1 className={style.TitleText}>Yeni xidmət</h1>
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
              <div className={`${style.InputContainer} ${style.LongInput1}`}>
                <label htmlFor="">
                  Xidmətin adı :
                  {valid.ServiceShortName ? (
                    <span style={{ color: "red" }}>
                      {valid.ServiceShortName}
                    </span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  className={style.Input}
                  name="serviceShortName"
                  value={dbDetail.serviceShortName}
                  onChange={e => onChangeInput(e)}
                  style={
                    valid.ServiceShortName ? { border: "1px solid red" } : {}
                  }
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.LongInput2}`}>
                <label htmlFor="">
                  Xidmətin tam adı:
                  {valid.ServiceName ? (
                    <span style={{ color: "red" }}>{valid.ServiceName}</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  className={style.Input}
                  name="serviceName"
                  style={valid.ServiceName ? { border: "1px solid red" } : {}}
                  value={dbDetail.serviceName}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>

              <div className={`${style.InputContainer} ${style.shortInput}`}>
                <label htmlFor="">
                  Qiymət:{" "}
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.ServicePrice !== null ? valid.ServicePrice : ""}
                  </span>
                </label>
                <input
                  style={
                    valid.ServicePrice !== null
                      ? { border: "1px solid red" }
                      : {}
                  }
                  className={style.Input}
                  name="servicePrice"
                  value={dbDetail.servicePrice}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.shortInput}`}>
                <label htmlFor="">
                  E-qaimə kodu:{" "}
                  {valid.ServiceEqcode ? (
                    <span style={{ color: "red" }}>{valid.ServiceEqcode}</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  style={
                    valid.ServiceEqcode !== null
                      ? { border: "1px solid red" }
                      : {}
                  }
                  className={style.Input}
                  name="serviceEqcode"
                  value={dbDetail.serviceEqcode}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.shortInput}`}>
                <label htmlFor="">
                  Xidmətin Kodu :{" "}
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.ServiceCode !== null ? valid.ServiceCode : ""}
                  </span>
                </label>
                <input
                  className={style.Input}
                  name="serviceCode"
                  style={
                    valid.ServiceCode !== null
                      ? { border: "1px solid red" }
                      : {}
                  }
                  value={dbDetail.serviceCode}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.shortInput}`}>
                <label htmlFor="">
                  Xidmətin Bonusu :{" "}
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.ServiceBonus !== null ? valid.ServiceBonus : ""}
                  </span>
                </label>
                <input
                  className={style.Input}
                  name="serviceBonus"
                  style={
                    valid.ServiceBonus !== null
                      ? { border: "1px solid red" }
                      : {}
                  }
                  value={dbDetail.serviceBonus}
                  onChange={e => onChangeInput(e)}
                ></input>
              </div>
              <div className={`${style.InputContainer} ${style.shortInput}`}>
                <label htmlFor="">
                  Ölçü vahidi :{" "}
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {valid.ServiceUnit !== null ? valid.ServiceUnit : ""}
                  </span>
                </label>
                <input
                  style={
                    valid.ServiceUnit !== null
                      ? { border: "1px solid red" }
                      : {}
                  }
                  type="text"
                  name="serviceUnit"
                  value={dbDetail.serviceUnit}
                  className={style.Input}
                  onChange={e => onChangeInput(e)}
                />
              </div>
            </div>
            <button className={style.EditButton} onClick={() => SendForm()}>
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
              ) : dbDetail.serviceId ? (
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
