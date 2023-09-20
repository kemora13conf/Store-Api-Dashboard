import React, { useContext } from "react";
import { AppContext } from "../../App";
import CheckBox from "../Global/CheckBox/CheckBox";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "../Global/ToggleBtn/Toggle";
import MyLink from "../Global/MyLink";
import Fetch from "../utils";
import { PopupsContext } from "../Global/Popups/PopupsContainer";
import { toast } from "react-toastify";
import { PaginationContext } from "./Categories";

function CategoryTable({
    checkedItems,
    setCheckedItems,
    checkAll,
    setCheckAll,
  }) {

  const { categories, setCategories } = useContext(PaginationContext);
  const { language, setReqFinished, theme } = useContext(AppContext);
  const { setConfirm } = useContext(PopupsContext);

  const changeState = (state, id) => {
    
    Fetch(
      import.meta.env.VITE_API + "/categories/change-state-category/" + id,
      "PUT",
      { state }
    ).then((res) => {
      setCategories((prv) => {
        return prv.map((category) => {
          if (category._id === id) {
            console.log({
              ...category,
              enabled: state,
            });
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

  const deleteCategory = async (id) => {
    setConfirm({
      title: "Delete Category",
      message: "Are you sure you want to delete this category?",
      confirmText: "Yes, Delete it!",
      cancelText: "No, Cancel!",
      confirm: (close) => {
        Fetch(import.meta.env.VITE_API + "/categories/" + id, "DELETE").then(
          (res) => {
            if (res.type === "success") {
              setCategories((prv) => {
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
            { categories.length > 0
              ? categories.map((category, index) => {
                  return (
                    <motion.tr
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      exit={{ opacity: 0, y: -20 }}
                      key={index}
                      className="
                              border-b border-light-secondary-300 dark:border-light-secondary-800 bg-light-secondary-100 dark:bg-dark-primary-600
                              text-light-quarternary-500 dark:text-dark-quarternary-600
                            "
                    >
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
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
                        <div className="w-fit h-auto relative flex gap-4 items-center px-4 py-2  rounded-lg">
                          <Toggle
                            toggled={category.enabled}
                            onClick={(state) => changeState(state, category._id)}
                          />
                          <MyLink
                            to={`${category._id}/update`}
                            className="shadow w-8 h-8 flex justify-center items-center rounded-full bg-info text-light-primary-500 hover:bg-opacity-70  transition-all duration-300"
                          >
                            <i className="fas fa-pen"></i>
                          </MyLink>
                          <button
                            onClick={() => {
                              deleteCategory(category._id);
                            }}
                            className="shadow w-8 h-8 flex justify-center items-center rounded-full bg-error text-white hover:bg-opacity-70 transition-all duration-300"
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

export default CategoryTable;
