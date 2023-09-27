import React, { useContext } from "react";
import { AppContext } from "../../App";
import CheckBox from "../Global/CheckBox/CheckBox";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "../Global/ToggleBtn/Toggle";
import MyLink from "../Global/MyLink";
import Fetch from "../utils";
import { PopupsContext } from "../Global/Popups/PopupsContainer";
import { toast } from "react-toastify";

function Table(props) {
  const {
    data,
    setData,
    checkedItems,
    setCheckedItems,
    checkAll,
    setCheckAll,
    setOpenedId,
    setIsFormOpen,
  } = props;
  const { language, setReqFinished, theme } = useContext(AppContext);
  const { setConfirm } = useContext(PopupsContext);

  const changeState = (state, id) => {
    Fetch(
      import.meta.env.VITE_API + "/categories/change-state/" + id,
      "PUT",
      { state }
    ).then((res) => {
      setData((prv) => {
        return prv.map((category) => {
          if (category._id === id) {
            return {
              ...category,
              enabled: state,
            };
          }
          return category;
        });
      });
    });
  };

  const editItem = (id) => {
    setOpenedId(id);
    setIsFormOpen(true);

  };

  const deleteItem = async (id) => {
    setConfirm({
      title: language.delete +' '+ language.category,
      message: language.category_delete_msg,
      confirmText: language.confirm_delete,
      cancelText: language.cancel_delete,
      confirm: (close) => {
        Fetch(import.meta.env.VITE_API + "/categories/" + id, "DELETE").then(
          (res) => {
            if (res.type === "success") {
              setData((prv) => {
                return prv.filter((category) => category._id !== id);
              });
              setReqFinished(false);
              toast.success(res.message, {
                theme: theme,
              });
            } else {
              toast.error(res.message, {
                theme: theme,
              });
            }
            close();
          }
        );
      }
    });

  };
  return (
    <div className="w-full rounded-md overflow-y-visible overflow-x-auto gap-3">
      <table className="w-full">
        <thead>
          <tr
            className="
              text-sm font-semibold text-light-quarternary-500 dark:text-dark-quarternary-500
              bg-light-secondary-500 dark:bg-dark-primary-700 rounded-lg overflow-hidden
              shadow 
            "
          >
            <th className="px-4 py-5 text-left flex gap-3">
              <CheckBox
                {...{
                  id: "checkAll",
                  setCheckAll,
                }}
              />
              {language.image}
            </th>
            <th className="px-4 py-5 text-left">{language.name}</th>
            <th className="px-4 py-5 text-left">{language.description}</th>
            <th className="px-4 py-5 text-left">{language.actions}</th>
          </tr>
        </thead>
        <tbody className="text-sm font-medium text-gray-700">
          <AnimatePresence>
            { data.length > 0
              ? data.map((category, index) => {
                  return (
                    <motion.tr
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      exit={{ opacity: 0, y: -20 }}
                      key={index}
                      className="
                              border-b border-light-secondary-300 dark:border-light-secondary-800 
                              bg-light-secondary-100 dark:bg-dark-primary-600
                              transition-all duration-300
                              hover:bg-light-secondary-200 dark:hover:bg-dark-primary-500
                              text-light-quarternary-500 dark:text-dark-quarternary-600
                            "
                    >
                      <td className="px-4 py-3">
                        <div className="flex gap-4 justify-start items-center">
                          <CheckBox
                            {...{
                              id: category._id,
                              checkAll,
                              checkedItems,
                              setCheckedItems,
                            }}
                          />
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-light-primary-500 dark:bg-dark-primary-500">
                            {
                              category.gallery.length > 0
                              ? <img
                                  className="w-full h-full object-cover rounded-full"
                                  src={`${import.meta.env.VITE_ASSETS}/Images/${category.gallery[0].name}`} 
                                  alt=""
                                />
                              : "-"
                            }
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="line-clamp-1">{category.name}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="line-clamp-1">{category.description}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-fit h-auto flex gap-4 items-center px-4 py-2  rounded-lg">
                          <Toggle
                            toggled={category.enabled}
                            onClick={(state) => changeState(state, category._id)}
                          />
                          <button
                            onClick={() => { editItem(category._id) }}
                            className="
                              shadow w-8 h-8 
                              flex justify-center items-center rounded-full 
                              bg-light-primary-500 dark:bg-dark-secondary-700 
                              text-light-quarternary-500 dark:text-light-secondary-600
                              transition-all duration-300
                              hover:bg-info hover:text-light-secondary-200
                              dark:hover:bg-info dark:hover:text-light-secondary-200"
                          >
                            <i className="fas fa-pen"></i>
                          </button>
                          <button
                            onClick={() => {
                              deleteItem(category._id);
                            }}
                            className="
                              shadow w-8 h-8 
                              flex justify-center items-center rounded-full 
                              bg-light-primary-500 dark:bg-dark-secondary-700 
                              text-light-quarternary-500 dark:text-light-secondary-600
                              transition-all duration-300
                              hover:bg-error hover:text-light-secondary-200
                              dark:hover:bg-error dark:hover:text-light-secondary-200"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              : <tr 
                  className="
                     bg-light-secondary-100 dark:bg-dark-primary-600
                      text-light-quarternary-500 dark:text-dark-quarternary-600
                  ">
                  <td colSpan={4}>
                    <div className="w-full px-3 py-4 text-center text-lg text-light-quarternary-500 dark:text-dark-quarternary-500">
                      No categories found
                    </div>
                  </td>
                </tr>
            }
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
