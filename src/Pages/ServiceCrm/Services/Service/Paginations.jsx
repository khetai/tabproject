import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Modal from "../../../../Components/Modal/Modal";
import { changeToast } from "../../../../Store/auth";
import usePrivate from "./../../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Loader from "../../../../Components/Loader/Loader";

import Select2Take from "../../../../Components/Select/Select2Take";
const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
const Paginations = ({
  status,
  name,
  voen,
  dqn,
  userId,
  dateStart,
  dateFinish,
  menteqe,
  setLoad,
  load,
  beyanname,
}) => {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [isOpen, toggle] = useState(false);
  const [result, setresult] = useState(null);
  const [service, setService] = useState();
  const [page, setPage] = useState(1);
  const [countpage, setCountpage] = useState(1);
  const [take, setTake] = useState(25);
  const handlOpenModal = async (open, id) => {
    console.log(id);
    console.log(open);
    try {
      if (open) {
        const res = await sendRequest("GET", `Sales/${id}`, null);
        console.log(res);
        if (res.isSuccess) {
          setService(res.result[0]);
        } else {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(
        changeToast({ loading: false, type: false, message: err.message })
      );
    }
    toggle(open);
  };
  const handleChange = (event, value) => {
    setPage(Number(value));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(beyanname);
        const res = await sendRequest(
          "GET",
          `Sales?page=${page}&take=${take}&name=${name}&userId=${userId}&voenOrPassport=${voen}&status=${status}&dqn=${dqn}&dateStart=${dateStart}&dateFinish=${dateFinish}&precinctId=${menteqe}&beyanname=${beyanname}`,
          //page=${page}&name=${name}&voenOrPassport=${voen}&userId=${userId}&status=${status}&dqn=${dqn}&dateStart=${dateStart}&dateFinish=${dateFinish}`,
          null
        );
        console.log(res);
        if (!res.isSuccess) {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        } else {
          setresult(res.result.data);
          setCountpage(res.result.totalPage);
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
  }, [
    page,
    name,
    voen,
    status,
    dqn,
    userId,
    dateStart,
    dateFinish,
    menteqe,
    take,
    load,
  ]);

  return result ? (
    <>
      <div className="TableMain">
        <table className={style.Table}>
          <thead className={style.TableHeada}>
            <tr>
              <th>Tarix</th>
              <th>Status</th>
              <th>Müştəri</th>
              <th>Müştəri kodu</th>
              <th>VÖEN/Passport</th>
              <th>Məbləğ</th>
              <th>ƏDV</th>
              <th>Cəm</th>
              <th className={style.ThCeck}>#</th>
            </tr>
          </thead>
          <tbody className={style.TableBody}>
            {console.log(result)}
            {result.length > 0 ? (
              result?.map((row, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    <td>{row.saleDate}</td>

                    <td>
                      <span className={style["Status" + row.salePayStatusId]}>
                        {row.payStatusName}
                      </span>
                    </td>

                    <td title={row.clientFullName}>
                      {" "}
                      {row.clientFullName.length > 60
                        ? row.clientFullName.substring(0, 30) + "..."
                        : row.clientFullName}
                    </td>

                    <td>{row.saleClientCode}</td>
                    <td>{row.clientVoenorPassportNo}</td>
                    <td>{row.totalAmount.toFixed(2)}</td>
                    <td>{row.vatAMount.toFixed(2)}</td>
                    <td>{row.totalPrice.toFixed(2)}</td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={x => handlOpenModal(true, row.saleId)}
                    >
                      <span className={style.info}>
                        <i class="fa-solid fa-info"></i>
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Məlumat yoxdur</td>
              </tr>
            )}
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
        isOpen={isOpen}
        handleClose={() => handlOpenModal(false, null)}
        containerVariant={containerVariant}
        width={"80%"}
        // height={"98%"}
        left={"left"}
        leftcount={"50%"}
        side={"top"}
        sidecount={"-50%"}
        bgcolor="#FFF"
        showd={"none"}
      >
        <ModalContent>
          <div className={style.ServiceDeatilMain}>
            <div className={style.ServiceDHead}>
              <div className={style.HeadMain}>
                <div className={style.HeadTitle}>
                  <h3>Xidmət reyestri</h3>
                </div>
                <span className={style.Button} onClick={() => toggle(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </div>
            </div>
            <div className={style.ServiceDBody}>
              <div className={style.ServiceDBodyHead}>
                <ul className={style.FormItems}>
                  <li className={`${style.FormItem} ${style.ShortItem}`}>
                    <label>Müştəri tipi</label>
                    <span>{service?.clientTypeName}</span>
                  </li>

                  <li className={`${style.FormItem} ${style.ShortItem}`}>
                    <label>VÖEN/Passport</label>
                    <span>{service?.clientVoenorPassportNo}</span>
                  </li>
                  <li className={`${style.FormItem} ${style.LongItem}`}>
                    <label>Müştəri adı</label>
                    <span title={service?.clientFullName}>
                      {service?.clientFullName.length > 60
                        ? service?.clientFullName.substring(0, 60) + "..."
                        : service?.clientFullName}
                    </span>
                  </li>
                  <li className={`${style.FormItem} ${style.ShortItem}`}>
                    <label>ƏDV-dən azad</label>
                    <span>{service?.saleIsDiplomatic ? "Bəli" : "Xeyr"}</span>
                  </li>
                  <li className={`${style.FormItem} ${style.ShortItem}`}>
                    <label>DQN</label>
                    <span>
                      {service?.saleCarNumber
                        ? service.saleCarNumber
                        : "Yoxdur"}
                    </span>
                  </li>

                  <li className={`${style.FormItem} ${style.ShortItem}`}>
                    <label>Tarix</label>
                    <span>{service?.saleDate}</span>
                  </li>
                  <li className={`${style.FormItem} ${style.ShortItem}`}>
                    <label>Beyannamə</label>
                    <span>{service?.saleDeclarationNo}</span>
                  </li>
                </ul>
              </div>
              <div className={style.ServiceDBodyTable}>
                <table className={style.NewSericeTable}>
                  <thead className={style.TableHeada}>
                    <tr>
                      <th>No:</th>
                      <th>Xidmətin adı</th>
                      <th>Ölçü vahidi</th>
                      <th>Miqdarı</th>
                      <th>Qiyməti</th>
                      <th>Məbləği</th>
                      <th>ƏDV dərəcəsi</th>
                      <th>ƏDV məbləği</th>
                      <th>Cəmi məbləğ</th>
                    </tr>
                  </thead>
                  <tbody className={`${style.TableBody} ${style.ModalTable}`}>
                    {service?.saleDetails.map((x, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{x.serviceName}</td>
                          <td>{x.serviceUnit}</td>
                          <td>{x.saleDetailQuantity}</td>
                          <td>{x.saleDetailPrice.toFixed(2)}</td>
                          <td>{x.saleDetailAmount.toFixed(2)}</td>
                          <td>{x.saleDetailVatrate}%</td>
                          <td>{x.saleDetailVatamount.toFixed(2)}</td>
                          <td>{x.saleDetailTotalAmount.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                    <tr className={style.TotalAmount}>
                      <td></td>
                      <td>Cəmi</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{service?.saleDetailAmount.toFixed(2)} ₼</td>
                      <td></td>
                      <td>{service?.saleTotalVatamount.toFixed(2)} ₼</td>
                      <td>{service?.saleTotalAmount} ₼</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={style.InspectorInfo}>
              <div className={style.NoteUserInfo}>
                <label>Qeyd</label>
                <span
                  className={style.customtooltip}
                  style={{ cursor: "pointer" }}
                  dtitle={service?.saleComment}
                >
                  {service?.saleComment
                    ? service.saleComment.substring(0, 15)
                    : "Qeyd Yoxdur"}
                </span>
              </div>
              <div className={style.inspector}>
                <div className={style.NoteUserInfo}>
                  <label>Struktur bölmə</label>
                  <span>
                    {service?.precinctName ? service.precinctName : "yoxdur"}
                  </span>
                </div>
                <div className={style.NoteUserInfo}>
                  {/* <ModalUSer
                  // isOpen={isOpen}
                  // handleClose={() => handlOpenModal(false)}
                  >
                    <ModalContent>
                      {mobValue ? (
                        <ul className={style.UserInfos}>
                          <li className={style.UserInfo}>
                            <label>Məsul şəxsin adı:</label>
                            <span>
                              Fərəczadə Şahin (inspektor){" "}
                              <img src="/icons/info.svg" alt="" />
                            </span>
                          </li>
                          <li className={style.UserInfo}>
                            <label>E-mail:</label>
                            <span>
                              faraczadeshahin@gmail.com
                              <img src="/icons/info.svg" alt="" />
                            </span>
                          </li>
                          <li className={style.UserInfo}>
                            <label>Məntəqənin adı:</label>
                            <span>
                              Siesco MMC
                              <img src="/icons/info.svg" alt="" />
                            </span>
                          </li>
                        </ul>
                      ) : null}
                    </ModalContent>
                  </ModalUSer> */}
                  <label>Məsul şəxs</label>
                  <span
                  // onClick={e => {
                  //   handlOpenModal(true);
                  //   setmobmodal(e);
                  // }}
                  >
                    {service?.inspectorFullName} (inspektor)
                  </span>
                </div>
              </div>
            </div>
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
