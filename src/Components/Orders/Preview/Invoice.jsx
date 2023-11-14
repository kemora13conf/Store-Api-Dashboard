import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../App";
import { motion } from "framer-motion";
import Client from "./Client";
import Details from "./Details.JSX";
import Fetch from "../../utils";

function Invoice(props) {
  const { language } = useContext(AppContext);
  const { invoiceOpened, setInvoiceOpened, order, onClose, } = props;
  const invoiceRef = useRef();

  const handleDownload = () => {
    Fetch(
      `${
        import.meta.env.VITE_API
      }/orders/${order._id}/invoice`,
      "GET"
    ).then((res) => {
      if(res.type==='success'){
        window.open(import.meta.env.VITE_ASSETS+'/Invoices/'+res.data, "_blank");
      }
    });
  };

  useEffect(() => {
    if (invoiceOpened) {
      invoiceRef.current.addEventListener("click", (e) => {
        if (e.target == invoiceRef.current) {
          setInvoiceOpened(false);
        }
      });
    }
  }, [invoiceOpened]);
  return (
    <motion.div
      key={order._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "linear", duration: 0.2 }}
      exit={{ opacity: 0, y: 20 }}
      ref={invoiceRef}
      className="
          w-full min-h-screen
          fixed top-0 left-0 z-[200] px-3 py-2
          bg-black bg-opacity-10 flex justify-center items-center
          backdrop-filter backdrop-blur-sm
          shadow-light dark:shadow-dark
        "
    >
      <div
        className="
          max-w-[350px] min-h-[250px] w-full
          bg-light-primary-500 dark:bg-dark-primary-800
          rounded-lg relative
        "
      >
        <div>
          {/* close button */}
          <button
            onClick={onClose}
            className="
              w-[40px] h-[40px] rounded-full
              bg-light-primary-500 dark:bg-dark-primary-800
              flex justify-center items-center
              absolute -top-[50px] right-0
            "
          >
            <i className="fas fa-times text-lg text-light-primary-50 dark:text-dark-primary-50"></i>
          </button>
          {/* download button */}
          <button
            onClick={handleDownload}
            className="
              w-[40px] h-[40px] rounded-full
              bg-light-primary-500 dark:bg-dark-primary-800
              flex justify-center items-center
              absolute -top-[50px] right-[50px]
            "
          >
            <i className="fas fa-download text-lg text-light-primary-50 dark:text-dark-primary-50"></i>
          </button>
        </div>
        {/* content */}
        <div className="w-full px-5 py-3">
          <h1
            className="
              text-light-primary-50 dark:text-dark-primary-50
              font-semibold text-xl
              flex justify-between items-center
            "
          >
            { language.order +" "+ language.invoice }

            <span className="flex gap-2 items-center font-normal opacity-70 text-sm">
              {
                order?.paid
                ? <i className="fas fa-check-circle text-green-500"></i>
                : <i className="fas fa-times-circle text-red-500"></i>
              }
              {
                language[order?.paid ? "paid" : "unpaid"]
              }
            </span>
          </h1>
          {/* id */}
          <div className="w-full flex gap-2 mt-2 items-center">
            <p className="text-light-quarternary-500 dark:text-dark-primary-200 font-medium text-lg">
              {language.id} :
            </p>
            <p className="text-light-quarternary-300 dark:text-dark-primary-300 font-normal text-sm">
              {order?._id}
            </p>
          </div>
          {/* Date */}
          <div className="w-full flex gap-2 items-center">
            <p className="text-light-quarternary-500 dark:text-dark-primary-200 font-medium text-lg">
              {language.date}
            </p>
            <p className="text-light-quarternary-300 dark:text-dark-primary-300 font-normal text-sm">
            {
              new Date(order?.createdAt)
                .toLocaleDateString(
                  language.locale,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )
            } 
            </p>
          </div>
          {/* status */}
          <div className="w-full flex gap-2  items-center">
            <p className="text-light-quarternary-500 dark:text-dark-primary-200 font-medium text-lg">
              {language.status}
            </p>
            <p className="text-light-quarternary-300 dark:text-dark-primary-300 font-normal text-sm">
              {language[order?.status.name]}
            </p>
          </div>
          {/* client */}
          {order?.client && <Client client={order?.client} />}
          {/* Total */}
          <div 
            className="
              w-full flex gap-2 items-center justify-between
              mt-4 mb-2 px-4 py-2 rounded-md
              bg-light-tertiary-500 dark:bg-dark-primary-600
              shadow-light dark:shadow-dark
            "
          >
            <p className="text-light-primary-300 dark:text-dark-primary-100 font-medium text-lg">
              {language.total + " " + language.price}
            </p>
            <p className="text-light-primary-300 dark:text-dark-primary-100 font-normal text-sm">
              {order?.amount} $
            </p>
          </div>
          {/* More details */}
          <Details products={order.items} />
        </div>
      </div>
    </motion.div>
  );
}

export default Invoice;
