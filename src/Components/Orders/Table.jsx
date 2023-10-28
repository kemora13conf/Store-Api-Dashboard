import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import CheckBox from "../Global/CheckBox/CheckBox";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "../Global/ToggleBtn/Toggle";
import MyLink from "../Global/MyLink";
import Fetch from "../utils";
import { toast } from "react-toastify";
import Row from "./Row";

function Table(props) {
  const {
    data,
    setData,
    checkedItems,
    setCheckedItems,
    checkAll,
    setCheckAll,
  } = props;
  const { language, setReqFinished, theme, setConfirm } =
    useContext(AppContext);

  const [states, setStates] = useState([]);
  useEffect(() => {
    Fetch(`${import.meta.env.VITE_API}/orders/all-states`, "GET").then(
      (res) => {
        if (res.type === "success") {
          setStates(res.data);
        }
      }
    );
  }, []);
  console.log(states);
  return (
    <div className="w-full h-full overflow-x-auto gap-3 min-h-[350px]">
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
              {language.client}
            </th>
            <th className="px-4 py-5 text-left">{language.amount}</th>
            <th className="px-4 py-5 text-left">{language.status}</th>
            <th className="px-4 py-5 text-left">{language.invoice}</th>
          </tr>
        </thead>
        <tbody className="text-sm font-medium text-gray-700">
          <AnimatePresence>
            {data?.length > 0 ? (
              data.map((item, index) => {
                return (
                  <Row
                    {...{
                      item,
                      index,
                      states,
                      setData,
                      checkedItems,
                      setCheckedItems,
                      checkAll
                    }}
                  />
                );
              })
            ) : (
              <tr
                className="
                     bg-light-secondary-100 dark:bg-dark-primary-600
                      text-light-quarternary-500 dark:text-dark-quarternary-600
                  "
              >
                <td colSpan={6}>
                  <div className="w-full px-3 py-4 text-center text-lg text-light-quarternary-500 dark:text-dark-quarternary-500">
                    {language.no_orders_found}
                  </div>
                </td>
              </tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
