import * as React from "react";
import { motion, Reorder } from "framer-motion";
import { Ingredient } from "./ingredients";
import { CloseIcon } from "./CloseIcon";
import style from "../index.module.css";
export const Tab = ({ item, onClick, onRemove, isSelected }) => {
  return (
    <Reorder.Item
      value={item}
      id={item.label}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        backgroundColor: isSelected ? "#f3f3f3" : "#fff",
        y: 0,
        transition: { duration: 0.15 },
      }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      whileDrag={{ backgroundColor: "#e3e3e3" }}
      className={isSelected ? style.selected : style.tabli}
      onPointerDown={onClick}
    >
      <motion.span layout="position">{`${item.id} ${item.title}`}</motion.span>
      <motion.div layout className="close">
        <motion.button
          onPointerDown={event => {
            event.stopPropagation();
            onRemove();
          }}
          initial={false}
          animate={{ backgroundColor: isSelected ? "#e3e3e3" : "#fff" }}
        >
          <CloseIcon />
        </motion.button>
      </motion.div>
    </Reorder.Item>
  );
};
