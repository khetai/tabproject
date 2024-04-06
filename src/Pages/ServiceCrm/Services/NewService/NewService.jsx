import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import ModalUSer from "./ModalUSer";
import ModalServicChild from "./ModalServicChild";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import UsePrivate from "../../../../Services/useAxiosPrivate2";
import Modal from "../../../../Components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 60px 20px;
`;
const containerVariant = {
  initial: { right: "-50%", transition: { type: "spring" } },
  isOpen: { right: "-15%" },
  exit: { right: "-50%" },
};
const initial = {
  client: {
    clientClientTypeId: 1,
    clientVoenorPassportNo: "",
    clientFullName: "",
  },
  sale: {
    saleDeclarationNo: "",
    saleComment: "",
    saleIsDiplomatic: false,
    saleCarNumber: "",
  },
  saleDetails: [],
};

function NewService() {
  const navigate = useNavigate();
  const { sendRequest } = UsePrivate();
  const [db, setDb] = useState();
  const [isOpen, toggle] = useState(false);
  const [isServiceOpen, toggleService] = useState(false);
  const [isServiceChildOpen, toggleServiceChild] = useState(null);
  const [mobValue, setmobmodal] = useState();
  const [customtype, setCustomtype] = useState(1);
  const [formdata, setFormData] = useState(initial);
  const [saledata, setSaledata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(`https://localhost:7257/api/Inspector/NewSale`)
          .then(res => {
            console.log(res.data);
            setDb(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      } catch (err) {
        console.error(err);
        // dispatch(changeNot({ type: err.isSuccess, message: err.message }));
      }
    };
    fetchData();
  }, []);
  function handlOpenModal(open) {
    toggle(open);
  }
  function handlOpenModal2(open) {
    toggleService(open);
  }
  function handlOpenModal3(open) {
    toggleServiceChild(open);
  }

  const handleSaleDetailsChange = (service, count) => {
    const newSaleDetail = {
      saleDetailServiceId: service.serviceId,
      saleDetailName: service.serviceName,
      saleDetailUnit: service.serviceUnit,
      saleDetailCode: service.serviceCode,
      saleDetailQuantity: parseInt(count) || 0,
      saleDetailPrice: service.servicePrice,
      saleDetailAmount:
        (parseInt(count) || 0) * service.servicePrice || service.servicePrice,
      saleDetailVatrate: 18,
      saleDetailVatamount:
        ((parseInt(count) || 0) * service.servicePrice * 18) / 100 || 0,
      saleDetailTotalAmount:
        (parseInt(count) || 0) * service.servicePrice +
        (((parseInt(count) || 0) * service.servicePrice * 18) / 100 || 0),
    };
    const updatedSaleDetails = [...saledata, newSaleDetail];
    setSaledata(updatedSaleDetails);
  };
  const submitServiceDetail = () => {
    const updatedSaleDetails = [...formdata.saleDetails];
    saledata.forEach(newSaleDetail => {
      const index = updatedSaleDetails.findIndex(
        existingSaleDetail =>
          existingSaleDetail.saleDetailServiceId ===
          newSaleDetail.saleDetailServiceId
      );
      if (index !== -1) {
        updatedSaleDetails[index] = {
          ...updatedSaleDetails[index],
          ...newSaleDetail,
        };
      } else {
        updatedSaleDetails.push(newSaleDetail);
      }
    });
    setFormData({
      ...formdata,
      saleDetails: updatedSaleDetails.filter(s => s.saleDetailQuantity !== 0),
    });
    setSaledata([]);
    handlOpenModal3();
    toggleService(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setFormData({
        ...formdata,
        [parent]: {
          ...formdata[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formdata, [name]: value });
    }
  };

  const HandleSendFrom = () => {
    console.log("start");
    try {
      axios
        .post(
          `https://localhost:7257/api/Inspector/AddSale`,
          {
            ...formdata,
            ["sale"]: {
              ...formdata["sale"],
              ["saleIsDiplomatic"]: formdata.sale.saleIsDiplomatic == "true",
            },
          },
          {
            headers: {
              "Content-Type": "application/json", // Update the content type to JSON
            },
          }
        )
        .then(res => {
          navigate("/Services");
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
      // dispatch(changeNot({ type: err.isSuccess, message: err.message }));
    }
  };

  const handleSearch = e => {
    console.log(e);
    if (e == 1) {
      console.log("beyan");
    } else if (e === 2) {
      const fetchData = async () => {
        try {
          axios
            .get(
              `https://localhost:7257/api/Inspector/GetVOEN/${formdata.client.clientVoenorPassportNo}`
            )
            .then(res => {
              setFormData({
                ...formdata,
                ["client"]: {
                  ...formdata["client"],
                  ["clientFullName"]: res.data,
                },
              });
              console.log(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        } catch (err) {
          console.error(err);
          // dispatch(changeNot({ type: err.isSuccess, message: err.message }));
        }
      };
      fetchData();
    }
  };
  return (
    <div className={style.container}>
      <div className={style.Head}>
        <div className={style.HeadMain}>
          <div className={style.HeadTitle}>
            <h3>XİDMƏTLƏRİN GÖSTƏRİLMƏSİ</h3>
          </div>
          <ul className={style.HeadBody}>
            <li>
              <button className={style.HeadAddButton} onClick={HandleSendFrom}>
                <img src="/icons/save 1.svg" alt="" />
                <span>Yadda saxla</span>
              </button>
            </li>
            <li>
              <NavLink to={"/Services"}>
                <button className={style.HeadPrintButton}>
                  <img src="/icons/x-circle 1.svg" alt="" />
                  <span>Ləğv et</span>
                </button>
              </NavLink>
            </li>
            <li>
              <button className={style.HeadPrintButton}>
                <img src="/icons/print.svg" alt="" />
                <span>Çap edin</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.Body}>
        <div className={style.ClientTypes}>
          <span>Müştəri tipi</span>
          <label htmlFor="customerType1">
            <input
              id="customerType1"
              placeholder="Tarix"
              type="radio"
              name="client.clientClientTypeId"
              onChange={e => {
                setCustomtype(1);
                handleChange(e);
              }}
              value={1}
              defaultChecked={formdata.client.clientClientTypeId == 1}
            />
            Hüquqi
          </label>
          <label htmlFor="customerType2">
            <input
              id="customerType2"
              placeholder="Tarix"
              type="radio"
              value={2}
              name="client.clientClientTypeId"
              onChange={e => {
                setCustomtype(2);
                handleChange(e);
              }}
            />
            Vətandaş
          </label>
          <label htmlFor="customerType3">
            <input
              id="customerType3"
              placeholder="Tarix"
              type="radio"
              value={3}
              name="client.clientClientTypeId"
              onChange={e => {
                setCustomtype(3);
                handleChange(e);
              }}
            />
            Qeyri-rezident
          </label>
          <label htmlFor="diplomat">
            <input
              id="diplomat"
              type="checkbox"
              name="sale.saleIsDiplomatic"
              value={!formdata?.sale?.saleIsDiplomatic}
              onChange={e => {
                handleChange(e);
              }}
              // onChange={() => setDiplomat(!diplomat)}
            />
            Diplomat
          </label>
        </div>
        <div className={style.BodySearch}>
          <ul className={customtype ? style.FormItems : style.formNone}>
            <li
              className={
                customtype === 1 || customtype === 2
                  ? style.FormItem
                  : style.formNone
              }
            >
              <div>
                <label>Bəyannamə</label>
                <input
                  type="text"
                  placeholder="Bəyannamə..."
                  name="sale.saleDeclarationNo"
                  value={
                    formdata?.sale.saleDeclarationNo
                      ? formdata?.sale.saleDeclarationNo
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
              <button onClick={e => handleSearch(1)}>Axtar</button>
            </li>
            <li className={customtype === 1 ? style.FormItem : style.formNone}>
              <div>
                <label>Vöen</label>
                <input
                  type="text"
                  placeholder="Vöen..."
                  name="client.clientVoenorPassportNo"
                  value={
                    formdata?.client?.clientVoenorPassportNo
                      ? formdata.client.clientVoenorPassportNo
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
              <button onClick={e => handleSearch(2)}>Axtar</button>
            </li>
            <li
              className={
                customtype === 3 || customtype === 2
                  ? style.FormItem
                  : style.formNone
              }
            >
              <div>
                <label>Pasport nömrəsi</label>
                <input
                  type="text"
                  placeholder="Pasport..."
                  name="client.clientVoenorPassportNo"
                  value={
                    formdata?.client.clientVoenorPassportNo
                      ? formdata?.client.clientVoenorPassportNo
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
              <button onClick={e => handleSearch(3)}>Axtar</button>
            </li>
          </ul>
        </div>
        <form className={style.BodyForm}>
          <ul className={customtype ? style.FormItems : style.formNone}>
            <li className={style.FormItem}>
              <label>Müştəri adı</label>
              <input
                type="text"
                placeholder="Tam ad..."
                name="client.clientFullName"
                onChange={handleChange}
                value={
                  formdata?.client.clientFullName
                    ? formdata?.client.clientFullName
                    : ""
                }
              />
            </li>
            <li className={style.FormItem}>
              <div>
                <label>DQN</label>
                <input
                  type="text"
                  placeholder="DQN..."
                  name="sale.saleCarNumber"
                  value={
                    formdata?.sale.saleCarNumber
                      ? formdata?.sale.saleCarNumber
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
            </li>
          </ul>
        </form>
        <div className={style.BodyInfoForm}>
          <button
            className={style.AddService}
            onClick={e => {
              handlOpenModal2(true);
            }}
          >
            <img src="/icons/pluscircle.svg" alt="" />
            <span>Xidmət əlavə et</span>
          </button>
          <table className={style.NewSericeTable}>
            <thead className={style.TableHeada}>
              <tr>
                <th>No:</th>
                <th>Xidmətin adı</th>
                <th>Ölçü vahidi</th>
                <th>Unikal kod</th>
                <th>Miqdarı</th>
                <th>Qiyməti</th>
                <th>Məbləği</th>
                <th>ƏDV dərəcəsi</th>
                <th>ƏDV məbləği</th>
                <th>Cəmi məbləğ</th>
              </tr>
            </thead>
            <tbody className={style.TableBody}>
              {formdata.saleDetails.map((x, i) => {
                return (
                  <tr key={x.saleDetailServiceId}>
                    <td>
                      <div className={style.TableBodyFirstTd}>{i + 1}</div>
                    </td>
                    <td>
                      <div>{x.saleDetailName}</div>
                    </td>
                    <td>
                      <div>{x.saleDetailUnit}</div>
                    </td>
                    <td>
                      <div>{x.saleDetailCode}</div>
                    </td>
                    <td>
                      <div>{x.saleDetailQuantity}</div>
                    </td>
                    <td>
                      <div>{x.saleDetailPrice}</div>
                    </td>
                    <td>
                      <div>{x.saleDetailAmount}</div>
                    </td>
                    <td>
                      <div>{x.saleDetailVatrate}</div>
                    </td>
                    <td>
                      <div>{x.saleDetailVatamount}</div>
                    </td>
                    <td>
                      <div className={style.TableBodyLastTd}>
                        {x.saleDetailTotalAmount}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <ul className={style.TableHeada}>
            <li>No:</li>
            <li>Xidmətin adı</li>
            <li>Ölçü vahidi</li>
            <li>Unikal kod</li>
            <li>Miqdarı</li>
            <li>Qiyməti</li>
            <li>Məbləği</li>
            <li>ƏDV dərəcəsi</li>
            <li>ƏDV məbləği</li>
            <li>Cəmi məbləğ</li>
          </ul>
          <ul className={style.TableBody}>
            {formdata.saleDetails.map((x, i) => {
              return (
                <li key={x.saleDetailServiceId}>
                  <span>{i + 1}</span>
                  <span>{x.saleDetailName}</span>
                  <span>{x.saleDetailUnit}</span>
                  <span>{x.saleDetailCode}</span>
                  <span>{x.saleDetailQuantity}</span>
                  <span>{x.saleDetailPrice}</span>
                  <span>{x.saleDetailAmount}</span>
                  <span>{x.saleDetailVatrate}</span>
                  <span>{x.saleDetailVatamount}</span>
                  <span>{x.saleDetailTotalAmount}</span>
                </li>
              );
            })}
          </ul> */}
        </div>
        <div className={style.BodyUserNot}>
          <div className={style.FormItem}>
            <label>Qeyd</label>
            <input
              style={{
                width: "100% !important",
                background: "#F6F6F6",
                padding: "10px 15px",
              }}
              name="sale.saleComment"
              onChange={handleChange}
              value={
                formdata.sale.saleComment ? formdata?.sale.saleComment : ""
              }
              type=""
              placeholder="Qeyd"
            />
          </div>
          <div className={style.NoteUserInfo}>
            <label>Struktur bölmə</label>
            <span>Astara</span>
          </div>
          <div className={style.NoteUserInfo}>
            <ModalUSer
              isOpen={isOpen}
              handleClose={() => handlOpenModal(false)}
            >
              <ModalContent>
                {mobValue ? (
                  <ul className={style.UserInfos}>
                    <li className={style.UserInfo}>
                      <label>Məsul şəxsin adı:</label>
                      <span>
                        Fərəczadə Şahin (inspektor){" "}
                      </span>
                    </li>
                    <li className={style.UserInfo}>
                      <label>E-mail:</label>
                      <span>
                        faraczadeshahin@gmail.com
                      </span>
                    </li>
                    <li className={style.UserInfo}>
                      <label>Məntəqənin adı:</label>
                      <span>
                        Siesco MMC
                      </span>
                    </li>
                  </ul>
                ) : null}
              </ModalContent>
            </ModalUSer>
            <label>Məsul şəxs</label>
            <span
              onClick={e => {
                handlOpenModal(true);
                setmobmodal(e);
              }}
            >
              Fərəczadə Şahin (inspektor) <img src="/icons/info.svg" alt="" />
            </span>
          </div>
        </div>
      </div>

      <ModalServicChild
        isOpen={isServiceChildOpen}
        handleClose={() => (handlOpenModal3(null), setSaledata([]))}
      >
        <ModalContent>
          <ul style={{ padding: "20px" }}>
            {isServiceChildOpen?.map(e => {
              return (
                <li
                  key={e.serviceId}
                  className={style.FormItem}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <label>{e.serviceName}</label>
                  <input
                    min={0}
                    style={{ width: "20%", padding: "0 10px" }}
                    type="number"
                    value={
                      saledata.length > 0
                        ? saledata.find(x => x.serviceId === e.serviceId)
                            ?.saleDetailQuantity
                        : formdata.saleDetails.find(
                            x => x.saleDetailServiceId === e.serviceId
                          )?.saleDetailQuantity
                    }
                    onChange={x => handleSaleDetailsChange(e, x.target.value)}
                  />
                </li>
              );
            })}
          </ul>
          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "20px 0",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <li style={{ listStyle: "none" }}>
              <button
                className={style.HeadAddButton}
                onClick={submitServiceDetail}
              >
                <img src="/icons/save 1.svg" alt="" />
                <span>Yadda saxla</span>
              </button>
            </li>
            <li style={{ listStyle: "none" }}>
              <button
                className={style.HeadPrintButton}
                style={{ boxShadow: "0px 4px 17px 0px #8693A740" }}
                onClick={e => (handlOpenModal3(), setSaledata([]))}
              >
                <img src="/icons/x-circle 1.svg" alt="" />
                <span>Ləğv et</span>
              </button>
            </li>
          </ul>
        </ModalContent>
      </ModalServicChild>
      <Modal
        isOpen={isServiceOpen}
        handleClose={() => handlOpenModal2(false)}
        containerVariant={containerVariant}
        width={"30%"}
        height={"100%"}
        left={"top"}
        leftcount={"50%"}
        side={"right"}
        sidecount={"-15%"}
      >
        <ModalContent>
          <ul className={style.TableHeada}>
            <li>Ad</li>
            <li>Kod</li>
          </ul>
          <ul className={style.TableServiceBody}>
            {db &&
              db.map(x => {
                return (
                  <li
                    key={x.groupId}
                    onClick={e => {
                      handlOpenModal3(
                        db.find(s => s.groupId === x.groupId).services
                      );
                    }}
                  >
                    <span>{x.groupName}</span>
                    <span>{x.groupId}</span>
                  </li>
                );
              })}
          </ul>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default NewService;
