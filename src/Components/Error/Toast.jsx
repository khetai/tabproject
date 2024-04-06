import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { changeToast } from "../../Store/auth";

function Toast() {
  const { notification } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.loading) {
      // Show loading toast
      toast.info("Loading...");
    } else if (notification.type === false) {
      toast.dismiss();
      // Show error toast
      toast.error(notification.message);
    } else if (notification.type === true) {
      toast.dismiss();
      // Show success toast
      toast.success(notification.message);
    }
    dispatch(changeToast({ loading: false, type: null, message: null }));
    // Clear notification after displaying
  }, [notification]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="colored"
      //   transition={"Bounce"}
    />
  );
}

export default Toast;
