import React, { useContext, useState } from "react";
import { AppContext } from "../../../App";
import { AnimatePresence, motion } from "framer-motion";

function Details(props) {
  const { language } = useContext(AppContext);
  const { products } = props;
  const [opened, setOpened] = useState(false);
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-light-quarternary-500 dark:text-dark-tertiary-600 font-medium text-md flex gap-3 justify-between items-center whitespace-nowrap">
        {language.show + " " + language.more}
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
            key={products[0]?._id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ ease: "linear", duration: 0.2 }}
            exit={{ opacity: 0, height: 0 }}
            className="
                w-full overflow-hidden flex gap-3
                overflow-x-auto px-3 py-2 rounded-md
                bg-light-secondary-500 dark:bg-dark-primary-600
            "
          >
            {products?.map((product, index) => (
              <div
                key={index}
                className="
                    min-w-[120px] w-full flex flex-col
                    overflow-hidden rounded-[4px]
                    bg-light-primary-500 dark:bg-dark-primary-700
                    shadow
                "
              >
                <img
                  src={
                    import.meta.env.VITE_ASSETS +
                    "/images/" +
                    product.product.gallery[0].name
                  }
                  className="
                    w-full h-[80px] object-cover

                  "
                />
                <div className="p-2">
                    <p className="text-light-quarternary-400 dark:text-dark-primary-200 font-medium text-sm">
                        {product.product.name}
                    </p>
                    <p className="text-light-quarternary-300 dark:text-dark-primary-300 font-normal text-xs">
                        {product.quantity + " x " + product.product.price + " $"}
                    </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Details;
