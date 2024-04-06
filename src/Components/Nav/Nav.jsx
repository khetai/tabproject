import React, { useState } from "react";
import style from "./index.module.css";
import logo from "../../Images/logo (1).png";
import { NavLink } from "react-router-dom";
import lefcircle from "../../Images/Group 22.png";
import lefcircle2 from "../../Images/Group 21.png";
import { act } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/auth";
// {
//   to: "/reporties",
//   rolekey: "Sales",
//   text: "Satışlar...",
//   icon: "circle.svg",
// },
// {
//   to: "/Medaxil",
//   rolekey: "Bank2",
//   text: "Hesaba mədaxil",
//   icon: "circle.svg",
// },
// {
//   to: "/Expense",
//   rolekey: "Bank3",
//   text: "Hesabdan məxaric",
//   icon: "circle.svg",
// },
const menu = [
  {
    to: "/",
    rolekey: "Home",
    text: "ANA SƏHİFƏ",
    icon: "home 2 (1).svg",
    altmenu: null,
  },

  {
    to: "/",
    rolekey: "Case",
    text: "SATIŞ və CRM",
    icon: "sell.svg",
    arrow: "expand.svg",
    altmenu: [
      {
        to: "/Services",
        rolekey: "Case1",
        text: "Xidmət reyestri",
        icon: "circle.svg",
      },
      {
        to: "/EQayime",
        rolekey: "Case2",
        text: "E-Qaimələr",
        icon: "circle.svg",
      },
    ],
  },
  {
    to: "/",
    rolekey: "Bank",
    text: "XƏZİNƏDARLIQ",
    icon: "Group 3.svg",
    arrow: "expand.svg",
    altmenu: [
      {
        to: "/Bank/Medaxil",
        rolekey: "Bank4",
        text: "Bank hesabına mədaxil",
        icon: "circle.svg",
      },
      {
        to: "/outcomings",
        rolekey: "Bank5",
        text: "Bank hesabından məxaric",
        icon: "circle.svg",
      },
      {
        to: "/Customer/Report",
        rolekey: "CustomerReport",
        text: "Müştəri balansı",
        icon: "circle.svg",
      },
    ],
  },
  {
    to: "/reports",
    rolekey: "Payable",
    text: "HESABATLAR",
    icon: "Summireze.svg",
    // arrow: "expand.svg",
    altmenu: null,
  },
  {
    to: "/reports",
    rolekey: "Payable",
    text: "MALİYYƏ",
    icon: "Summireze.svg",
    // arrow: "expand.svg",
    altmenu: [
      {
        to: "/bonuses",
        rolekey: "Bank1",
        text: "Bonusların hesablanması",
        icon: "circle.svg",
      },
    ],
  },
  {
    to: "/",
    rolekey: "Payable",
    text: "TƏNZİMLƏMƏLƏR",
    icon: "setting.svg",
    arrow: "expand.svg",
    altmenu: [
      {
        to: "/inspectors",
        rolekey: "Users",
        text: "İstifadəçilər",
        icon: "circle.svg",
        altmenu: null,
      },
      {
        to: "/clients",
        rolekey: "Client",
        text: "Müştərilər",
        icon: "circle.svg",
        altmenu: null,
      },
      {
        to: "/servicesCat",
        rolekey: "ServicesCat",
        text: "Xidmət kataloqu",
        icon: "circle.svg",
        altmenu: null,
      },
      {
        to: "/enterprises",
        rolekey: "Enterprises",
        text: "Müəssisə kataloqu",
        icon: "circle.svg",
        altmenu: null,
      },
      {
        to: "/departments",
        rolekey: "Department",
        text: "Şöbə kataloqu",
        icon: "circle.svg",
        altmenu: null,
      },
      {
        to: "/bankAccounts",
        rolekey: "BankAccounts",
        text: "Bank hesabatları kataloqu",
        icon: "circle.svg",
        altmenu: null,
      },
    ],
  },
  // {
  //   to: "/",
  //   rolekey: "Payable",
  //   text: "MÜŞTƏRİ PORTALI",
  //   icon: "contact.svg",
  //   altmenu: null,
  // },
  // {
  //   to: "/",
  //   rolekey: "Payable",
  //   text: "BROKER",
  //   icon: "monitoring.svg",
  //   altmenu: null,
  // },
];
const Nav = ({ setMinimize, minimize }) => {
  const [isActive, setIsActive] = useState(false);
  // const [minimize, setminize] = useState(true);
  const [opnsub, setSub] = useState({
    open: false,
    index: null,
  });
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    console.log("exit");
    // dispatch(changeStatus({ status: null }));
  };
  const { userFullName } = useSelector(state => state.auth);

  const subopen = async i => {
    console.log(i);
    if (opnsub.index === i) {
      setSub({
        open: !opnsub.open,
        index: i,
      });
    } else {
      setSub({
        open: true,
        index: i,
      });
    }
    console.log(opnsub);
  };
  return (
    <nav className={minimize ? style.minimized : ""}>
      {/* <img src={lefcircle} alt="" className={style.lefcircle} /> */}
      {/* <img src={lefcircle} alt="" className={style.lefcircle2} /> */}
      <div
        className={style.NavLogo}
        style={minimize ? { justifyContent: "center" } : {}}
      >
        <div className={style.navfrdiv}>
          {minimize ? (
            <div
              style={{
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                className={style.NavFooter}
                onClick={e => {
                  localStorage.setItem("minimized", !minimize);
                  setMinimize(!minimize);
                }}
              >
                <i
                  className="fa-solid fa-thumbtack"
                  style={
                    minimize
                      ? { transform: "rotate(45deg)", marginRight: "0px" }
                      : {}
                  }
                ></i>
              </div>
            </div>
          ) : (
            <>
              <div>
                <img
                  className={style.projectLogo}
                  src={"/icons/brand name-01.webp"}
                />
              </div>
              <div
                className={style.NavFooter}
                onClick={e => {
                  localStorage.setItem("minimized", !minimize);
                  setMinimize(!minimize);
                }}
              >
                <i
                  class="fa-solid fa-thumbtack"
                  style={minimize ? { transform: "rotate(180deg)" } : {}}
                ></i>
              </div>
            </>
          )}
        </div>
        <hr></hr>
      </div>
      <div className={style.NavBody}>
        <ul className={style.navUlfirst}>
          {menu.map((l, i) => {
            if (l.altmenu !== null) {
              return (
                <li key={i} className={style.firstLi}>
                  <div
                    className={`${style.firsta} ${
                      isActive === i ? style.active : ""
                    }`}
                    onClick={e => {
                      subopen(i);
                      setIsActive(i);
                    }}
                  >
                    <div className={style.navArrow}>
                      <img src={"/icons/" + l.icon} />
                      <span>{l.text}</span>
                    </div>
                    <i
                      className="fa-solid fa-chevron-up"
                      style={
                        !minimize
                          ? opnsub.index === i && opnsub.open
                            ? {}
                            : {
                                transform: "rotate(180deg)",
                              }
                          : { display: "none" }
                      }

                      // }
                    ></i>
                  </div>
                  <ul
                    className={
                      !minimize
                        ? opnsub.index === i && opnsub.open
                          ? style.navUlsecondactive
                          : style.navUlsecondclosed
                        : style.navUlsecondclosed
                    }
                  >
                    {l.altmenu.map((sub, s) => {
                      return (
                        <li
                          key={s + i}
                          className={
                            isActive === sub.rolekey ? style.active : ""
                          }
                          onClick={e => setIsActive(sub.rolekey)}
                        >
                          <NavLink to={sub.to}>
                            <img src={"/icons/" + sub.icon} />
                            <span>{sub.text}</span>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            } else {
              return (
                <li
                  key={l.icon + i}
                  className={`${style.firstLi} ${
                    isActive === i ? style.active : ""
                  }`}
                  onClick={e => setIsActive(i)}
                >
                  <NavLink to={l.to} className={style.firsta}>
                    <div className={style.navArrow}>
                      <img src={"/icons/" + l.icon} />
                      <span>{l.text}</span>
                    </div>
                  </NavLink>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className={style.head_userinfo}>
        <ul style={minimize ? { justifyContent: "center" } : null}>
          {minimize ? (
            <li>
              <button onClick={handleLogout}>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </li>
          ) : (
            <>
              <li>
                <i class={`fa-regular fa-user ${style.userinfoicon}`}></i>
                <span
                  className={style.userName}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {userFullName}
                </span>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
