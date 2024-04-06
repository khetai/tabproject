import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import { changeToast } from "../../../Store/auth";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

export default function Inspector({
  nom,
  data,
  toggleService,
  page,
  double,
  funcval,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const MENU_ID = `menu-${data.userId}`;
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function displayMenu(e) {
    e.preventDefault();
    // put whatever custom logic you need
    // you can even decide to not display the Menu
    show({
      event: e,
    });
  }
  const [checked, setChecked] = useState({
    index: data.userId,
    active: data.userActive,
  });
  useEffect(() => {
    setChecked({
      index: data.userId,
      active: data.userActive,
    });
  }, [data]);
  const Switch = ({ isOn, handleToggle, colorOne, colorTwo }) => {
    return (
      <>
        <input
          checked={isOn.active}
          onChange={handleToggle}
          className={style.switchcheckbox}
          id={`${isOn.index}`}
          type="checkbox"
        />
        <label
          style={{ background: isOn.active ? colorTwo : colorOne }}
          className={style.switchlabel}
          htmlFor={`${isOn.index}`}
          title={checked.active ? "Blockla" : "Aktiv et"}
        >
          <span className={style.switchbutton} />
        </label>
      </>
    );
  };

  const handleToggle = async () => {
    dispatch(changeToast({ loading: true, type: false, message: null }));
    setChecked(prevState => ({
      ...prevState,
      active: !prevState.active,
    }));

    try {
      const res = await sendRequest(
        "Patch",
        `Inspector/InspectorActiveToggle/${checked.index}`,
        null
      );
      if (!res.isSuccess) {
        dispatch(
          changeToast({ loading: false, type: false, message: res.message })
        );
        setChecked(prevState => ({
          ...prevState,
          active: !prevState.active,
        }));
      } else {
        dispatch(
          changeToast({ loading: false, type: true, message: res.result })
        );
      }
    } catch (err) {
      console.error(err);
      dispatch(
        changeToast({ loading: false, type: false, message: err.message })
      );
    }
  };

  const handleChangePassword = async id => {
    dispatch(changeToast({ loading: true, type: false, message: null }));
    try {
      const res = await sendRequest(
        "Patch",
        `Inspector/ResetPasswordFromAdmin/${id}`,
        null
      );

      if (!res.isSuccess) {
        dispatch(
          changeToast({
            loading: false,
            type: false,
            message:
              "Şifrə yenilənə bilmədi. Təkrar yoxlayin əgər uğurlu olmasa texniki şöbəyə müraciət edin ",
          })
        );
      } else {
        dispatch(
          changeToast({
            loading: false,
            type: true,
            message: res.result,
          })
        );
      }
      // dispatch(changeSuccess({ message: "Email göndərildi." }));
    } catch (err) {
      // dispatch(
      //   changeNot({
      //     loading: false,
      //     type: false,
      //     message:
      //       "Şifrə yenilənə bilmədi. Təkrar yoxlayin əgər uğurlu olmasa texniki şöbəyə müraciət edin ",
      //   })
      // );
    }
  };

  return (
    <tr
      className={style.TableTr}
      onContextMenu={displayMenu}
      onDoubleClick={() =>
        funcval
          ? (funcval(data.userId, data.userFirstName + " " + data.userLastName),
            double({
              value: data.userId,
              name: "userId",
            }))
          : toggleService(data.userId)
      }

      // onDoubleClick={e => {
      //   funcval(pre.precinctId, pre.precinctName);
      //   double({
      //     value: pre.precinctId,
      //     name: "sobe",
      //   });
      // }}
    >
      <td>{(page - 1) * 8 + (nom + 1)}</td>
      <td>
        <i class="fa-solid fa-bars" onClick={displayMenu}></i>
      </td>
      <td>{data.userFirstName}</td>
      <td>{data.userLastName}</td>
      <td>{data.userPosition}</td>
      <td>{data.precinctName}</td>
      <td className={style.actionTd}>
        <Switch
          isOn={checked}
          handleToggle={handleToggle}
          colorOne="#CCCCCC"
          colorTwo="linear-gradient(77.62deg, #0d2e4f 2.96%, #0f5280 63.71%)"
        />
      </td>
      <Menu id={MENU_ID} animation="scale">
        <Item onClick={() => toggleService(data.userId)}>
          <span class="Service_info__e+dbC" style={{ marginRight: "5px" }}>
            <i class="fa-solid fa-info"></i>
          </span>
          Bax
        </Item>
        <Separator />
        <Item onClick={handleToggle}>
          <span class={checked.active ? style.deActive : style.Actives}></span>
          <span>{checked.active ? "Blockla" : "Aktiv et"}</span>
        </Item>
        <Separator />
        <Item onClick={() => navigate("/Permission/" + data.userId)}>
          <img
            src={"/icons/stamp-solid 1.svg"}
            alt=""
            title="Səlahiyyət"
            style={{ margin: "0 5px" }}
          />
          Səlahiyyət
        </Item>
        <Separator />
        <Item onClick={() => toggleService(data.userId)}>
          <img
            src={"/icons/edit.svg"}
            title="Edit"
            style={{ marginRight: "5px" }}
          />
          Dəyiş
        </Item>
        <Separator />
        <Item onClick={e => handleChangePassword(data.userId)}>
          <img
            src={"/icons/reset-password-1 1.svg"}
            title="Reset Password"
            style={{ marginRight: "5px" }}
          />
          Şifrəni yenilə
        </Item>
        <Separator />
        {/* <Submenu label="Submenu">
          <Item>Sub Item 2</Item>
        </Submenu> */}
      </Menu>
    </tr>
  );
}
