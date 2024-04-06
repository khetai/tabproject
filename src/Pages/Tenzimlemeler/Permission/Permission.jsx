import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import { changeToast } from "../../../Store/auth";
import usePrivate from "../../../Services/useAxiosPrivate2";
import { useDispatch } from "react-redux";
export default function Permission({ nom, data, userId }) {
  const dispatch = useDispatch();
  const { sendRequest } = usePrivate();
  const [result, setresult] = useState();
  const [checked, setChecked] = useState({
    index: data.groupId,
    active: data.gruopPermission,
  });
  useEffect(() => {
    setChecked({
      index: data.groupId,
      active: data.gruopPermission,
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
    console.log(userId, checked.index);
    try {
      const res = await sendRequest(
        "Post",
        `Inspector/ChangeRole/${userId}/${checked.index}`,
        null
      );
      console.log(res);
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

  return (
    <tr className={style.TableTr}>
      <td>{nom + 1}</td>
      <td>{data.groupName}</td>
      <td className={style.actionTd}>
        <Switch
          isOn={checked}
          handleToggle={handleToggle}
          colorOne="#CCCCCC"
          colorTwo="linear-gradient(77.62deg, #0d2e4f 2.96%, #0f5280 63.71%)"
        />
      </td>
    </tr>
  );
}
