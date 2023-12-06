import React, { useContext, useEffect, useState } from "react";
import Fetch from "../../utils";
import { toast } from "react-toastify";
import { AppContext } from "../../../App";
import CountUp from "react-countup";
import { AnimatePresence, motion } from "framer-motion";

function CountAll() {
  const { language, theme } = useContext(AppContext);
  const [total, setTotal] = useState({
    catgories: 0,
    products: 0,
    orders: 0,
    clients: 0,
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    Fetch(import.meta.env.VITE_API + "/Analytics/total", "GET")
      .then((res) => {
        if (res.type != "success") toast.error(res.message, { theme: theme });
        else setTotal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setItems([
      {
        name: language.categories,
        icon: "fas fa-layer-group",
        count: total.catgories,
      },
      {
        name: language.products,
        icon: "fas fa-box-open",
        count: total.products,
      },
      {
        name: language.orders,
        icon: "fas fa-shopping-cart",
        count: total.orders,
      },
      { name: language.clients, icon: "fas fa-users", count: total.clients },
    ]);
  }, [total]);
  return (
    <div
      className="
            w-full @container/total max-w-[1020px] flex justify-center
        "
    >
      <div className="w-full flex flex-wrap gap-3 justify-center @[600px]/total:flex-nowrap ">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="
                w-full max-w-[250px] 
                bg-light-primary-500 dark:bg-dark-primary-800
                text-light-quarternary-500 dark:text-dark-tertiary-400
                shadow-md dark:shadow-dark 
                rounded-md overflow-hidden"
            >
              <div className="w-full p-4  flex flex-col gap-0  ">
                <div className="w-full flex items-start justify-between gap-4">
                  <span className="text-lg font-bold">
                    {item.name}
                  </span>
                  <i className={`${item.icon} text-3xl`}></i>
                </div>
                <span className="text-3xl font-bold flex items-center gap-2">
                  <span className="text-sm font-normal">
                    {language.total} :{" "}
                  </span>
                  <CountUp end={item.count} duration={5} />
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CountAll;
