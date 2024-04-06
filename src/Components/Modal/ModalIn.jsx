import React, { useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import style from "./index.module.css";
const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 15px;
`;
const containerVariant = {
  initial: { right: "-45%", transition: { type: "spring" } },
  isOpen: { right: "-3%" },
  exit: { right: "-45%" },
};
function ModalIn({ setOpen, open }) {
  const [form, setForm] = useState();
  return (
    <Modal
      isOpen={open}
      handleClose={() => {
        setOpen(false);
      }}
      containerVariant={containerVariant}
      width={"53%"}
      height={"auto"}
      left={"top"}
      leftcount={"50%"}
      side={"right"}
      sidecount={"0%"}
      showd={"none"}
    >
      <ModalContent>
        <div className={style.mHead}>
          <input placeholder="Axtar..." />
          <button
            className="Button"
            onClick={() => {
              setOpen(false);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div>
          <form>
            <div class={style.InputContainer}>
              <label for="">Test</label>
              <input className="Input" name="outcomingReason" value="" />
            </div>
          </form>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default ModalIn;
