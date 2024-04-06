import React, { useEffect } from "react";
import style from "./index.module.css";
import lefcircle from "../../Images/Group 22.png";
import lefcircle2 from "../../Images/Group 21.png";
import lefcircle3 from "../../Images/Group 20.png";
import logo from "../../Images/brand name.png";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure } from "../../Store/auth";
import AuthService from "../../Services/AuthService";
import { NavLink, useNavigate, useParams } from "react-router-dom";
const ChangePassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth); // Correct the slice name to 'auth'
  useEffect(() => {
    check();
    console.log(token);
  }, []);
  const check = async () => {
    dispatch(loginFailure());
    const response = await AuthService.CheckToken(token);
    console.log(response);
    if (!response.IsSuccess) {
      dispatch(loginFailure(response.Message));
      navigate("/");
    } else {
      dispatch(loginFailure());
    }
  };
  const handleLogin = async e => {
    dispatch(loginFailure());
    e.preventDefault();
    let name = e.target.password.value;
    let coname = e.target.confirmpassword.value;
    console.log(token);
    if (name == coname) {
      try {
        const response = await AuthService.changePassword(
          token,
          e.target.password.value
        );
        console.log(response);
        if (!response.isSuccess) {
          dispatch(loginFailure(response.message));
        } else {
          navigate("/");
          dispatch(loginFailure());
        }
      } catch (error) {
        dispatch(loginFailure(error.message));
      }
    } else {
      dispatch(loginFailure("Passwords do not match"));
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
                <label>Şifrə</label>
                <input
                  type="password"
                  required
                  name="password"
                  placeholder="Şifrə daxil edin"
                />
              </div>
              <div className={style.logininput}>
                <label>Təkrar şifrə</label>
                <input
                  type="password"
                  required
                  name="confirmpassword"
                  placeholder="Təkrar şifrə daxil edin"
                />
              </div>
            </div>
            {error && (
              <p className="text" style={{ color: "red" }}>
                {error}
              </p>
            )}
            <div className={style.cardloginitems}>
              <button>Yenilə</button>
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

export default ChangePassword;
