import React from "react";
import "react-toastify/scss/main.scss";
import "swiper/scss";
import "swiper/scss/navigation";
import { ToastContainer, toast } from "react-toastify";
import { Routes } from "containers";

import { ModalProvider } from "@project/libs/context";
import { useDispatch } from "react-redux";
import { keplrDisconnect } from "store/keplr/actionCreators";

const App = () => {
  const dispatch = useDispatch();

  window.addEventListener("keplr_keystorechange", () => {
    dispatch(keplrDisconnect());
    toast.success("Wallet has been changed", {
      position: toast.POSITION.TOP_CENTER,
    });
  });

  return (
    <ModalProvider>
      <Routes />
      <ToastContainer
        hideProgressBar
        position="top-right"
        autoClose={3000}
        draggable
        pauseOnHover
      />
    </ModalProvider>
  );
};

export { App };
