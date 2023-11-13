import React, { useContext } from "react";
import { AppContext } from "../../App";
import MyLink from "../Global/MyLink";
import { AnimatePresence, motion } from "framer-motion";

import SelectBox from "../Global/SelectBox/SelectBox";
import Menu from "../Global/SelectBox/Menu";
import Option from "../Global/SelectBox/Option";
import Fetch from "../utils";
import { toast } from "react-toastify";

function Header({ checkedItems, setCheckedItems, setReload, orderBy, setOrderBy }) {
  const { language, theme, setConfirm } = useContext(AppContext);
  const deleteMany = () => {
    setConfirm({
      title: language.delete + " " + language.orders,
      message: language.multiple_delete_msg,
      confirmText: language.confirm_delete,
      cancelText: language.cancel_delete,
      confirm: (close) => {
        Fetch(
          `${import.meta.env.VITE_API}/orders/delete-multiple`,
          "DELETE",
          JSON.stringify({ ids: checkedItems }),
          { "Content-Type": "application/json" }
        ).then((res) => {
          if (res.type === "success") {
            setReload((prv) => !prv);
            setCheckedItems((prv) => []);
            toast.success(res.message, { theme });
          } else {
            toast.error(res.message, { theme });
          }
          close();
        });
      },
    });
  };
  return (
    <div
      className="
          w-full @container/head
          bg-light-primary-500 dark:bg-dark-primary-700
          px-4 py-3 rounded-t-md dakr:shadow-dark
        "
    >
      <div className="w-full flex items-center justify-between gap-2 flex-col @[500px]/head:flex-row">
        <h1 className="text-2xl font-bold text-dark-primary-500 dark:text-light-primary-500 mr-auto">
          {language.orders}
        </h1>
        <div className="w-full flex gap-3 justify-end">
          <AnimatePresence>
            {checkedItems?.length != 0 && (
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "linear", duration: 0.2 }}
                exit={{ opacity: 0, y: -20 }}
                key="add"
                onClick={deleteMany}
                disabled={checkedItems?.length == 0}
                className="
                      flex items-center justify-center gap-2 
                      px-5 pl-3 py-[6px] rounded-md 
                      border-[1.5px] border-error  dark:border-dark-primary-300
                      hover:bg-error hover:text-light-secondary-200 hover:border-transparent text-error dark:hover:border-transparent
                      transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:scale-90"
              >
                <i className="fas fa-trash"></i>
                {language.delete}
              </motion.button>
            )}
          </AnimatePresence>
          <div
            className="
                flex gap-3 items-center justify-center flex-col 
                @[400px]/tableFilters:flex-row
              "
          >
            <div
              className="
                  flex gap-2 justify-between items-center
                  max-w-fit w-full @[400px]/tableFilters:w-fit h-fit 
                  p-0 pl-2
                  border border-light-secondary-500 dark:border-dark-secondary-600 rounded-md
                  text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm
                  bg-light-secondary-500 dark:bg-dark-secondary-600
                "
            >
              <p className="whitespace-nowrap">{language.order_by}</p>
              <SelectBox
                {...{
                  selected: orderBy,
                  setSelected: setOrderBy,
                  className: "max-w-fit !rounded-md text-sm",
                }}
              >
                <Menu
                  className={` flex flex-col gap-2 py-2 px-2 
                          absolute top-[calc(100%+10px)] right-0 md:left-0 z-index-[2000]
                          bg-light-primary-500 dark:bg-dark-primary-500 rounded-md shadow-lg dark:shadow-dark
                          w-full min-w-fit h-auto 
                          border border-light-secondary-500 dark:border-dark-secondary-600`}
                >
                  <Option value={language.amount}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                      <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                        {language.amount}
                      </h1>
                    </div>
                  </Option>
                  <Option value={language.status}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                      <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                        {language.status}
                      </h1>
                    </div>
                  </Option>
                  <Option value={language.date}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                      <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">
                        {language.date}
                      </h1>
                    </div>
                  </Option>
                </Menu>
              </SelectBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
