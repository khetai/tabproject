import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
`;
const CloseIcon = styled.svg`
  width: 18px;
  height: 18px;
  display: ${props => props.showd};
  position: absolute;
  right: 13px;
  top: 13px;
  cursor: pointer;
  resize: both;
`;
const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};
const ModalContainer = styled(motion.div)`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.bgcolor};
  position: absolute;
  ${props => props.side}: ${props => props.sidecount};
  ${props => props.left}: ${props => props.leftcount};
  transform: translate(-50%, -50%);
  transition: 0.1s;
  border-radius: 12px;
  resize: both;
`;
const Modal = ({
  handleClose,
  children,
  isOpen,
  width,
  height = "auto",
  side,
  sidecount,
  left,
  leftcount,
  containerVariant,
  bgcolor = "#f4f4f5",
  showd,
}) => {
  // const ModalContainer = styled(motion.div)`
  //   width: ${width};
  //   height: ${height};
  //   background-color: #f4f4f5;
  //   position: absolute;
  //   ${side}: ${sidecount};
  //   ${left}: ${leftcount};
  //   transform: translate(-50%, -50%);
  //   transition: 1s;
  //   border-radius: 12px;
  // `;

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <ModalContainer
            width={width}
            height={height}
            side={side}
            sidecount={sidecount}
            left={left}
            leftcount={leftcount}
            variants={containerVariant}
            bgcolor={bgcolor}
          >
            <CloseIcon
              showd={showd}
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
                stroke="#0f5380 "
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
                stroke="#0f5380 "
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </CloseIcon>
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
