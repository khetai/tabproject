import React from "react";
import style from "./index.module.css";
import lefcircle from "../../Images/Group 22.png";
import lefcircle2 from "../../Images/Group 21.png";
import lefcircle3 from "../../Images/Group 20.png";
import logo from "../../Images/brand name.png";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure } from "../../Store/auth";
import AuthService from "../../Services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth); // Correct the slice name to 'auth'
  const handleLogin = async e => {
    dispatch(loginFailure());
    e.preventDefault();
    const response = await AuthService.sendPassword(e.target.email.value);
    console.log(response);
    if (!response.IsSuccess) {
      dispatch(loginFailure(response.Message));
    } else {
      navigate("/");
    }
  };
  return (
    <div className={style.loginMain}>
      <img src={lefcircle} alt="" className={style.lefcircle} />
      <img src={lefcircle2} alt="" className={style.lefcircle2} />
      <img src={lefcircle3} alt="" className={style.lefcircle3} />
      <div className={style.Login_container}>
        <div className={style.cardlogin}>
          <form onSubmit={handleLogin}>
            <div className={style.cardloginitems}>
              <h3>Sign Up</h3>
            </div>
            <div className={style.cardloginitems}>
              <div className={style.logininput}>
                <label>E-mail</label>
                <input
                  type="text"
                  required
                  name="email"
                  placeholder="E-mail daxil edin"
                />
              </div>
            </div>
            {error && (
              <p className="text" style={{ color: "red" }}>
                {error}
              </p>
            )}
            <div className={style.cardloginitems}>
              <button>Göndər</button>
              <NavLink to={"/login"}>Geriyə</NavLink>
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

export default ForgotPassword;
