import React, { useContext, useState } from "react";
import { AppContext } from "../../../App";
import MyLink from "./../MyLink";
import { AnimatePresence, motion } from "framer-motion";

function MenuTab({ tab, index: i }) {
  const { language, activeTab } = useContext(AppContext);
  const [opened, setOpened] = useState(false);

  return (
    <div        
      className={`
            w-full flex flex-col gap-2
            transition-all duration-300
            rounded-xl relative overflow-hidden
            ${opened ? "bg-light-secondary-500 dark:bg-dark-primary-600" : ""}
        `}
    >
      <button
        key={i}
        onClick={() => setOpened(!opened)}
        className={`
            ${
              activeTab == tab.name ? "activeTab" : ""
            } flex items-center w-full rounded-xl  py-2 px-2 gap-4 cursor-pointer transition-all duration-300 
            ${
              opened
                ? ""
                : "hover:bg-light-secondary-300 dark:hover:bg-dark-primary-400"
            } 
            group
        `}
      >
        <div
          className="
                flex w-[40px] h-[40px] 
                bg-dark-primary-700 dark:bg-dark-secondary-700 text-light-primary-500 
                justify-center items-center rounded-full shadow-md 
                transition-all duration-300 group-hover:bg-light-primary-500dark-soft 
            "
        >
          <i className={`${tab.icon} text-1xl transition-all duration-300`}></i>
        </div>
        <p className="text-light-quarternary-500 dark:text-dark-tertiary-300 dark-soft mr-auto">
          {tab.name}
        </p>
        <span className="w-[40px] h-[40px] flex justify-center items-center">
          <i
            className={`
                fas fa-chevron-down 
                text-light-quarternary-500 dark:text-dark-quarternary-500
                transition-all duration-300
                ${opened ? "rotate-180" : ""}
            `}
          ></i>
        </span>
      </button>
      {/* list */}
      <AnimatePresence mode="wait">
        {opened ? (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ ease: "linear", duration: 0.3 }}
            exit={{ opacity: 0, height: 0 }}
            className="
                    w-[calc(100%-40px)] ml-[40px] pb-3 flex flex-col gap-2
                    menu-list-decoration
                "
          >
            {tab.menu?.map((item, index) => {
              return (
                <MyLink
                  key={index}
                  to={item.link}
                  className={`
                        ${
                          activeTab == item.name
                            ? `
                                bg-light-quarternary-700 text-light-primary-500 shadow-light 
                                dark:bg-dark-primary-800 dark:shadow-dark
                            `
                            : ""
                        } flex items-center w-[calc(100%-20px)] rounded-full py-2 px-2 gap-4 cursor-pointer 
                        transition-all duration-300 dark:text-dark-quarternary-500
                        hover:bg-light-primary-500 dark:hover:bg-dark-primary-700 group
                        hover:text-light-quarternary-500 dark:hover:text-dark-quarternary-500
                        relative pointer-dot-decoration
                    `}
                >
                  <div
                    className="flex w-[40px] h-[40px] bg-dark-primary-700 dark:bg-dark-secondary-700
                        justify-center items-center rounded-full shadow-md 
                        transition-all duration-300 group-hover:bg-light-primary-500dark-soft 
                    "
                  >
                    <i
                      className={`${item.icon} text-light-primary-500 text-1xl transition-all duration-300`}
                    ></i>
                  </div>
                  <p className=" dark-soft">
                    {item.name}
                  </p>
                </MyLink>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default MenuTab;
