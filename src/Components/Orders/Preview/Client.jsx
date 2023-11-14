import React, { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { AnimatePresence, motion } from "framer-motion";

function Client(props) {
  const { language } = useContext(AppContext);
  const { client } = props;
  const [opened, setOpened] = useState(true);

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-light-quarternary-500 dark:text-dark-tertiary-600 font-medium text-lg flex gap-3 justify-between items-center">
        {language.client}
        <span className="w-full h-[1px] bg-light-secondary-500 dark:bg-dark-primary-400" />
        <span
          className="
                min-w-[30px] h-[20px] rounded-full text-sm cursor-pointer
                bg-light-secondary-500 dark:bg-dark-primary-600
                flex justify-center items-center
            "
        >
          <i
            onClick={() => setOpened(!opened)}
            className={`
                fas fa-chevron-up ${opened ? "" : "-rotate-180"}
                text-light-primary-50 dark:text-dark-primary-50
                transition duration-300 ease-in-out
            `}
          />
        </span>
      </h2>
      <AnimatePresence>
        {opened && (
          <motion.div
            key={client?._id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ ease: "linear", duration: 0.2 }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full overflow-hidden flex gap-3"
          >
            <img
              src={
                import.meta.env.VITE_ASSETS + "/Clients-images/" + client.image
              }
              alt={client.fullname}
              className="w-12 h-12 rounded-full"
            />
            <div className="w-full flex flex-col gap-0">
              <p className="text-light-quarternary-400 dark:text-dark-primary-200 font-medium text-lg">
                {client?.fullname}
              </p>
              <p className="text-light-quarternary-300 dark:text-dark-primary-300 font-normal text-sm">
                {client?.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Client;
