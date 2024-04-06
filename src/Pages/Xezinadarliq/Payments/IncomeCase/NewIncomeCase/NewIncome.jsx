import React, { useState } from "react";
import style from "./index.module.css";
import ModalUSer from "./ModalUSer";
import ModalServicChild from "./ModalServicChild";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Modal from "../../../../../Components/Modal/Modal";
const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 60px 30px;
`;
const containerVariant = {
  initial: { right: "-50%", transition: { type: "spring" } },
  isOpen: { right: "-15%" },
  exit: { right: "-50%" },
};

function NewIncome() {
  const [isOpen, toggle] = useState(false);
  const [isServiceOpen, toggleService] = useState(false);
  const [isServiceChildOpen, toggleServiceChild] = useState(false);
  const [mobValue, setmobmodal] = useState();
  const [customtype, setCustomtype] = useState(1);
  const [fomrdata, setFormData] = useState();
  const [diplomat, setDiplomat] = useState(false);
  function handlOpenModal(open) {
    toggle(open);
  }
  function handlOpenModal2(open) {
    toggleService(open);
  }
  function handlOpenModal3(open) {
    toggleServiceChild(open);
  }
  const handleChange = e => {
    e.preventDefault();
    let { name, value } = e.target;
    setFormData({ ...fomrdata, [name]: value });
  };
  const HandleSendFrom = e => {
    e.preventDefault();
    console.log(fomrdata);
  };

  const handleSearch = e => {
    console.log(e);
    if (e === 1) {
      setFormData({
        beyan: fomrdata.beyan,
        voen: "21315ADSASD",
        fullname: "Ahmed Recebli Ali oglu",
        pasport: "AD13515454",
      });
    } else if (e === 2) {
      setFormData({
        beyan: null,
        voen: fomrdata?.voen,
        fullname: "Ahmed Recebli Ali oglu",
        pasport: "AD13515454",
      });
    } else {
      setFormData({
        beyan: null,
        voen: null,
        fullname: "Ahmed Recebli Ali oglu",
        pasport: fomrdata.pasport,
      });
    }
  };
  const handleCustomChange = e => {
    console.log(fomrdata);
    console.log(e);
    setCustomtype(e);
    setFormData({
      beyan: null,
      voen: null,
      fullname: null,
      pasport: null,
    });
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
              name="customerType"
              id="customerType1"
              placeholder="Tarix"
              type="radio"
              onChange={e => handleCustomChange(1)}
              defaultChecked
            />
            Hüquqi
          </label>
          <label htmlFor="customerType2">
            <input
              name="customerType"
              id="customerType2"
              placeholder="Tarix"
              type="radio"
              onChange={e => handleCustomChange(2)}
            />
            Vətandaş
          </label>
          <label htmlFor="customerType3">
            <input
              name="customerType"
              id="customerType3"
              placeholder="Tarix"
              type="radio"
              onChange={e => handleCustomChange(3)}
            />
            Qeyri-rezident
          </label>
          <label htmlFor="diplomat">
            <input
              name="diplomat"
              id="diplomat"
              placeholder="Tarix"
              type="radio"
              checked={diplomat}
              onClick={() => setDiplomat(!diplomat)}
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
                  name="beyan"
                  value={fomrdata?.beyan ? fomrdata?.beyan : ""}
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
                  name="voen"
                  value={fomrdata?.voen ? fomrdata?.voen : ""}
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
                  name="pasport"
                  value={fomrdata?.pasport ? fomrdata?.pasport : ""}
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
              <label>Musteri adi</label>
              <input
                type="text"
                placeholder="Tam ad..."
                name="fullname"
                onChange={handleChange}
                value={fomrdata?.fullname ? fomrdata?.fullname : ""}
              />
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
          <ul className={style.TableHeada}>
            <li>No:</li>
            <li>Xidmətin adı</li>
            <li>Ölçü vahidi</li>
            <li>Unikal kod</li>
            <li>DQN</li>
            <li>Miqdarı</li>
            <li>Qiyməti</li>
            <li>Məbləği</li>
            <li>ƏDV dərəcəsi</li>
            <li>ƏDV məbləği</li>
            <li>Cəmi məbləğ</li>
          </ul>
          <ul className={style.TableBody}>
            <li>
              <span>Sətir yoxdur</span>
            </li>
            <li>
              <span>Sətir yoxdur</span>
            </li>
          </ul>
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
        handleClose={() => handlOpenModal3(false)}
      >
        <ModalContent>
          <ul style={{ padding: "20px" }}>
            <li
              className={style.FormItem}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <label>Elektron Gömrük Bəyannaməsi xidmətinin miqdarı: </label>
              <input
                style={{ width: "20%", padding: "0 10px" }}
                type="number"
              />
            </li>
            <li
              className={style.FormItem}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <label>EB (əlavə vərəq) xidmətinin miqdarı:</label>
              <input
                style={{ width: "20%", padding: "0 10px" }}
                type="number"
              />
            </li>
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
              <button className={style.HeadAddButton}>
                <img src="/icons/save 1.svg" alt="" />
                <span>Yadda saxla</span>
              </button>
            </li>
            <li style={{ listStyle: "none" }}>
              <button
                className={style.HeadPrintButton}
                style={{ boxShadow: "0px 4px 17px 0px #8693A740" }}
                onClick={() => handlOpenModal3(false)}
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
            <li
              onClick={e => {
                handlOpenModal3(true);
              }}
            >
              <span>Elektron Gömrük Bəyannaməsi</span>
              <span>00000002</span>
            </li>
            <li
              onClick={e => {
                handlOpenModal3(true);
              }}
            >
              <span>Tranzit yüklərə tərtib olunan gömrük bəyannaməsi</span>
              <span>00000003</span>
            </li>
            <li
              onClick={e => {
                handlOpenModal3(true);
              }}
            >
              <span>QİB</span>
              <span>00000004</span>
            </li>
            <li
              onClick={e => {
                handlOpenModal3(true);
              }}
            >
              <span>Gömrük bəyannamələrinin tərtib olunma xidməti</span>
              <span>00000005</span>
            </li>
            <li
              onClick={e => {
                handlOpenModal3(true);
              }}
            >
              <span>Məxfi yüklər</span>
              <span>00000006</span>
            </li>
            <li
              onClick={e => {
                handlOpenModal3(true);
              }}
            >
              <span>Sadələşmiş bəyannamə</span>
              <span>00000007</span>
            </li>
            <li
              onClick={e => {
                handlOpenModal3(true);
              }}
            >
              <span>Yük aşırma xidməti</span>
              <span>00000008</span>
            </li>
            <li
              onClick={e => {
                handlOpenModal3(true);
              }}
            >
              <span>EB (əlavə vərəq)</span>
              <span>00000009</span>
            </li>
          </ul>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default NewIncome;
