import axios from "./axios";
import { useDispatch } from "react-redux";
import { resetTokens } from "../Store/auth";
import { Navigate } from "react-router-dom";
const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refrestoken = JSON.parse(
    localStorage.getItem("authState")
  ).refreshToken;
  const refresh = async () => {
    const response = await axios.post(`auth/get/refreshtoken/${refrestoken}`, {
      withCredentials: true,
    });
    //authslice de accesstokeni yenile ve locala vur refresh tokeni

    if (response.data.isSuccess) {
      // dispatch(resetTokens(response.data.result));
      return response.data.result.accestoken;
    } else {
      localStorage.clear();
      window.location.href = "/#/login";
    }
    console.log(response.data);
  };
  return refresh;
};

export default useRefreshToken;
