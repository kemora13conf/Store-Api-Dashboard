import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { motion } from "framer-motion";
import MyLink from "../Global/MyLink";
import CountAll from "./Items/CountAll";
import OrdersChart from "./Items/OrdersChart";
import useMeasure from "react-use-measure";
import RecentOrders from "./Items/RecentOrders";
import RevenueChart from "./Items/RevenueChart";
import OrdersByStatus from "./Items/OrdersByStatus";

function Home() {
  const { reqFinished, setActiveTab, language, setLoaded, selectedLanguage } =
    useContext(AppContext);
  const [ref, bounds] = useMeasure();
  useEffect(() => {
    setLoaded(true);
    setActiveTab(language.dashboard);
  }, [reqFinished, selectedLanguage]);

  // well lookin modern design for a dashboard home page with a nice animation on the cards and a nice background color
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.4, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0.4, y: -50 }}
      key={"products"}
      className="flex flex-col w-full h-full gap-4"
    >
      <CountAll />
      <div className="w-full flex justify-between items-stretch gap-3">
        <OrdersChart bounds={bounds} />
        {bounds.width > 700 && <RecentOrders />}
      </div>
      {
        bounds.width < 700 && (
          <div className="w-full flex justify-evenly flex-wrap items-start gap-3">
            <OrdersByStatus />
            <RecentOrders />
          </div>
        )
      }
      <div className="w-full flex justify-between items-start gap-3">
        {bounds.width > 700 && <OrdersByStatus />}
        <RevenueChart bounds={bounds} />
      </div>

      {/* made with love footer */}
      <div className="w-full flex justify-center items-center gap-2 flex-col pt-4 p-2">
        <span className="text-sm text-light-quarternary-500 dark:text-dark-quarternary-500">
          Made with ❤️ by Abdelghani El Mouak
        </span>
        <span className="text-xs text-light-quarternary-500 dark:text-dark-quarternary-500">
          2023
        </span>
      </div>

    </motion.div>
  );
}

export default Home;
