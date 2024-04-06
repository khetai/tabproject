import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import Inspectors from "../../Pages/Tenzimlemeler/Inspectors/Inspectors";
import Departments from "../../Pages/Tenzimlemeler/Precincts/Departments/departments";
import Precincts from "../../Pages/Tenzimlemeler/Precincts/Precincts";
import Example from "./Example";
import Income from "../../Pages/Xezinadarliq/Payments/BankIncome/Income";
import BankAccounts from "./../../Pages/Tenzimlemeler/BankAccounts/BankAccounts";
const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  resize: both;
`;
const containerVariant = {
  initial: { right: "-45%", transition: { type: "spring" } },
  isOpen: { right: "-3%" },
  exit: { right: "-45%" },
};
function ModalSelect({
  setOpen,
  open,
  type,
  width,
  height,
  setVal,
  funcval = null,
}) {
  const Tip = () => {
    if (type === 1) {
      return <Inspectors double={setVal} funcval={funcval} />;
    } else if (type === 2) {
      return <Departments double={setVal} funcval={funcval} />;
    } else if (type === 3) {
      return <Precincts double={setVal} funcval={funcval} />;
    } else if (type === 4) {
      return <BankAccounts double={setVal} funcval={funcval} />;
    }
  };
  return (
    <Example setOpen={setOpen} open={open} children={Tip}>
      <Tip />
    </Example>
    // <Modal
    //   isOpen={open}
    //   handleClose={() => {
    //     setOpen(false);
    //   }}
    //   containerVariant={containerVariant}
    //   width={width}
    //   height={height}
    //   left={"top"}
    //   leftcount={"50%"}
    //   side={"right"}
    //   sidecount={"0%"}
    //   showd={"block"}
    // >
    //   <ModalContent>
    //     <Tip />
    //   </ModalContent>
    // </Modal>
  );
}

export default ModalSelect;
