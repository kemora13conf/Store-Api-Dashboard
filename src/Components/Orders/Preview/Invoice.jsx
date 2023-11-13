import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../App";
import { motion } from "framer-motion";

function Invoice(props) {
  const { language } = useContext(AppContext);
  const { invoiceOpened, order, onClose } = props;
  
  const invoiceRef = useRef();
  console.log(order);
  
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
          fixed top-0 left-0 z-[200]
          bg-black bg-opacity-10 flex justify-center items-center
          backdrop-filter backdrop-blur-sm
        "
    >

    </motion.div>
  );
}

export default Invoice;
