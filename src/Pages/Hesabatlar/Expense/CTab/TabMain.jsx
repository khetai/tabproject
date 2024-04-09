import style from "../index.module.css";
import * as React from "react";
import { useState } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { Tab } from "./Tab";
import { AddIcon } from "./AddIcon";
import styled from "styled-components";
import {
  allIngredients,
  Ingredients,
  initialTabs,
  getNextIngredient,
} from "./ingredients";
import { removeItem, closestItem } from "./array-utils";

export default function TabMain() {
  const [tabs, setTabs] = useState(initialTabs);
  const [sidebar, setsidebar] = useState(allIngredients);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const remove = item => {
    if (item === selectedTab) {
      setSelectedTab(closestItem(tabs, item));
    }

    setTabs(removeItem(tabs, item));
  };

  const add = item => {
    const nextItem = getNextIngredient(tabs);
    console.log(nextItem);
    if (!tabs.find(x => x.id === item.id)) {
      setTabs([...tabs, item]);
    }
    setSelectedTab(item);
  };
  const MotionDiv = styled(motion.div)`
    height: 100%;
  `;
  return (
    <div className={style.tabsMains}>
      <div className={style.sidebarr}>
        <motion.aside>
          <div className={style.asidecontainer}>
            {sidebar.map(item => (
              <span
                key={item.id}
                className={selectedTab === item ? style.selectside : ""}
                onClick={() => {
                  add(item);
                }}
              >
                {item.title}
              </span>
            ))}
          </div>
        </motion.aside>
      </div>
      <div className={style.window}>
        <nav className={style.navtab}>
          <Reorder.Group
            as="ul"
            axis="x"
            onReorder={setTabs}
            className={style.tabs}
            values={tabs}
          >
            <AnimatePresence initial={true} animate={false}>
              {tabs.map(item => (
                <Tab
                  key={item.label}
                  item={item}
                  className={style.tab}
                  isSelected={selectedTab === item}
                  onClick={() => setSelectedTab(item)}
                  onRemove={() => remove(item)}
                />
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </nav>
        <div className={style.maintab}>
          <MotionDiv
            key={selectedTab ? selectedTab.label : "empty"}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            height="100%"
          >
            {selectedTab ? selectedTab.item : "😋"}
          </MotionDiv>
          <AnimatePresence
            mode="wait"
            className={style.mainchild}
          ></AnimatePresence>
        </div>
      </div>
    </div>
  );
}
