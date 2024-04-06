import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import lefcircle3 from "../../Images/Group 20.png";
import logo from "../../Images/brand name.png";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../Services/AuthService";
import { loginStart, loginSuccess, loginFailure } from "../../Store/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { loading, error } = useSelector(state => state.auth); // Correct the slice name to 'auth'
  const handleLogin = async e => {
    setLoad(true);
    e.preventDefault();
    try {
      dispatch(loginStart());
      const response = await AuthService.login(
        e.target.username.value,
        e.target.password.value
      );
      if (response.isSuccess) {
        dispatch(loginSuccess(response.result));
        console.log(response);
        navigate("/");
      } else {
        dispatch(loginFailure(response.message));
      }
    } catch (err) {
      console.log(err);
    }
    setLoad(false);
  };
  return (
    <div className={style.loginMain}>
      <img src={lefcircle3} alt="" className={style.lefcircle3} />
      <div className={style.Login_container}>
        <div className={style.cardlogin}>
          <form onSubmit={handleLogin}>
            <div className={style.cardloginitems}>
              <h3>Giriş</h3>
            </div>
            <div className={style.cardloginitems}>
              <div className={style.logininput}>
                <label>İstifadəçi adı</label>
                <input
                  type="text"
                  required
                  name="username"
                  placeholder="İstifadəçi adını daxil edin"
                />
              </div>
              <div className={style.logininput}>
                <label>Şifrə</label>
                <input
                  type="password"
                  required
                  name="password"
                  placeholder="Şifrəni daxil edin"
                />
              </div>
            </div>
            {error && (
              <p className="text" style={{ color: "red" }}>
                {error}
              </p>
            )}
            <div className={style.cardloginitems}>
              <button>
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
                ) : (
                  "Daxil ol"
                )}
              </button>
              <NavLink to={"/ForgotPassword"}>Şifrəni unutmusunuz?</NavLink>
            </div>
          </form>
        </div>
        <div className={style.login_title}>
          <img className={style.projectLogoLogin} src={"/icons/brand name-01.webp"} />
          <p>
            Azərbaycan Respublikası Dövlət Gömrük Komitəsinin nəznində
            "AZƏRTERMİNALKOMPLEKS" BİRLİYİNİN daxili idarəetmə sistemi
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
