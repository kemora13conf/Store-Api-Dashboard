import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { motion } from "framer-motion";
import MyLink from "../Global/MyLink";
import CountAll from "./Items/CountAll";
import OrdersChart from "./Items/OrdersChart";
import useMeasure from "react-use-measure";
import Invoice from "./Items/Invoice";

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
        <OrdersChart />
        {bounds.width > 700 && <Invoice />}
      </div>
    </motion.div>
  );
}

export default Home;
