import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  width: 100%;
  height: 300px;
  z-index: 1;
`;
const ModalContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding 20px;
  position: absolute;
  bottom: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.1s;
  border-radius: 18px;
  box-shadow: 0px 4px 12px 0px #648bb02e;
  background: #ffffff;
`;
const CloseButton = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
`;

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};
const containerVariant = {
  initial: { bottom: "-120%", transition: { type: "spring" } },
  isOpen: { bottom: "-50%" },
  exit: { bottom: "-120%" },
};

const ModalUSer = ({ handleClose, children, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <ModalContainer variants={containerVariant}>
            <CloseButton
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20.39 20.39"
            >
              <title>close</title>
              <line
                x1="19.39"
                y1="19.39"
                x2="1"
                y2="1"
                fill="none"
                stroke="#5c3aff"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <line
                x1="1"
                y1="19.39"
                x2="19.39"
                y2="1"
                fill="none"
                stroke="#5c3aff"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </CloseButton>
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ModalUSer;
