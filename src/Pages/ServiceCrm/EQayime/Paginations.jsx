import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Modal from "../../../Components/Modal/Modal";
import { changeToast } from "../../../Store/auth";
import styled from "styled-components";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import Select2Take from "../../../Components/Select/Select2Take";
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
  finishDate = null,
  startDate = null,
  voen = null,
  eCode = null,
  setLoad,
  load,
  ids,
  setIds,
}) => {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [db, setDb] = useState();
  const [isOpen, toggle] = useState(false);
  const [page, setPage] = useState(1);
  const [countpage, setCountpage] = useState();
  const [service, setService] = useState();
  const [take, setTake] = useState(25);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `Sales/Eqaime?take=${take}&dateStart=${startDate}&dateFinish=${finishDate}&page=${page}&voenOrPassport=${voen}&declarationNo=${eCode}`,
          null
        );
        setLoad(false);
        console.log(res);
        if (!res.isSuccess) {
          dispatch(
            changeToast({ loading: false, type: false, message: res.message })
          );
        } else {
          setDb(res.result.data);
          setCountpage(res.result.totalPage);
        }
      } catch (err) {
        setLoad(false);
        console.error(err);
        dispatch(
          changeToast({ loading: false, type: false, message: err.message })
        );
      }
    };
    fetchData();
  }, [finishDate, , take, load, page, voen, eCode, startDate]);

  const handleChange = (event, value) => {
    setPage(Number(value));
  };

  const handlOpenModal = async (open, id) => {
    console.log(ids);
    try {
      if (open) {
        const res = await sendRequest("GET", `Sales/${id}`, null);
        console.log(res);
        if (res.isSuccess) {
          console.log(res.result);
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
  return db ? (
    <>
      <div className="TableMain">
        <table className={style.Table}>
          <thead className={style.TableHeada}>
            <tr>
              <th className={style.ThCeck}>
                <label htmlFor="AllCheck">
                  {" "}
                  <input
                    id="AllCheck"
                    type="checkbox"
                    checked={take * page === ids.length}
                    onChange={e => {
                      if (e.target.checked) {
                        db.map(x => {
                          if (!ids.includes(x.saleId)) {
                            return setIds(prevIds => [...prevIds, x.saleId]);
                          }
                        });
                        console.log(ids);
                      } else {
                        console.log(ids);
                        setIds([]);
                      }
                    }}
                  />
                </label>
              </th>
              <th>Tarix</th>
              <th>Status</th>
              <th>Müştəri</th>
              <th>Müştəri kodu</th>
              <th>VÖEN/Passport</th>
              <th>Yükləmə sayı</th>
              <th className={style.ThCeck}>#</th>
            </tr>
          </thead>
          <tbody className={style.TableBody}>
            {db.length > 0 ? (
              db?.map((row, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    <td>
                      <input
                        type="checkbox"
                        value={row.saleId}
                        checked={ids.includes(row.saleId)}
                        onChange={e => {
                          console.log(row.saleId);
                          console.log(ids);
                          if (e.target.checked) {
                            setIds(prevIds => [...prevIds, row.saleId]);
                          } else {
                            setIds(prevIds =>
                              prevIds.filter(id => id !== row.saleId)
                            );
                          }
                        }}
                      />
                    </td>
                    <td>{row.saleDate}</td>

                    <td>
                      <span className={style["Status" + row.status]}>
                        {row.status}
                      </span>
                    </td>

                    <td title={row.clientFullName}>
                      {row.clientFullName.length > 60
                        ? row.clientFullName.substring(0, 60) + "..."
                        : row.clientFullName}
                    </td>
                    <td>{row.saleClientCode}</td>
                    <td>{row.clientVoenorPassportNo}</td>
                    <td>{row.downloadCount}</td>
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
        height={"auto"}
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
                  <h3>E-Qaimənin reyestri</h3>
                </div>
                <span className={style.Button} onClick={() => toggle(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </div>
            </div>
            <div className={style.ServiceDBody}>
              <div className={style.ServiceDBodyHead}>
                <ul className={style.FormItems}>
                  <li className={style.FormItem}>
                    <label>VÖEN/Pasport</label>
                    <span>{service?.clientVoenorPassportNo}</span>
                  </li>
                  <li className={style.FormItem}>
                    <label>Müştəri adı</label>
                    <span title={service?.clientFullName}>
                      {service?.clientFullName.length > 60
                        ? service?.clientFullName.substring(0, 60) + "..."
                        : service?.clientFullName}
                    </span>
                  </li>

                  <li className={style.FormItem}>
                    <label>Tarix</label>
                    <span>{service?.saleDate}</span>
                  </li>
                  <li className={style.FormItem}>
                    <label>E-Qaimə kodu</label>
                    <span>Yoxdur</span>
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
                  <tbody className={style.TableBody}>
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
                <span>
                  {service?.saleComment ? service.saleComment : "Qeyd Yoxdur"}
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
    <Loader />
  );
};

export default Paginations;
