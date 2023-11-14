import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CheckBox from "../Global/CheckBox/CheckBox";
import { AppContext } from "../../App";
import Fetch from "../utils";
import { toast } from "react-toastify";
import Invoice from "./Preview/Invoice";

function Row(props) {
  const {
    item,
    index,
    states,
    setData,
    checkedItems,
    setCheckedItems,
    checkAll,
  } = props;
  const { language, theme } = useContext(AppContext);
  const [selectedState, setSelectedState] = useState(item.status.name);
  const [opened, setOpened] = useState(false);
  const [invoiceOpened, setInvoiceOpened] = useState(false);

  const statesRef = useRef();
  
  // functions
  const openBox = (e) => {
    if (e.target == e.currentTarget) {
      setOpened((prev) => !prev);
    }
  };
  const openInvoice = (e) => {
    setInvoiceOpened((prev) => !prev);
  };
  const downloadInvoice = () => {
    Fetch(
      `${
        import.meta.env.VITE_API
      }/orders/${item._id}/invoice`,
      "GET"
    ).then((res) => {
      if(res.type==='success'){
        window.open(import.meta.env.VITE_ASSETS+'/Invoices/'+res.data, "_blank");
      }
    });
  };
  // Effects
  useEffect(() => {
    if (selectedState !== language[item.status.name]) {
      Fetch(
        import.meta.env.VITE_API + "/orders/" + item._id + "/status",
        "PUT",
        JSON.stringify({ status: selectedState }),
        { "Content-Type": "application/json" }
      )
        .then((res) => {
          if (res.type === "success") {
            setData((prev) => {
              return prev.map((order) => {
                if (order._id === item._id) {
                  return { ...order, status: res.data.status };
                } else {
                  return order;
                }
              });
            });
            toast.success(res.message, { theme });
          } else {
            toast.error(res.message, { theme });
          }
        })
        .catch((err) => {
          toast.error(err.message, { theme });
        });
    }
  }, [selectedState]);

  useEffect(() => {
    if (opened) {
      statesRef.current.addEventListener("click", (e) => {
        if (e.target == statesRef.current) {
          setOpened(false);
        }
      });
    }
  }, [opened]);


  useEffect(() => {
    setSelectedState(language[item.status.name]);
  }, [item]);
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
        <div className="flex gap-4 justify-start items-center max-h-[40px]">
          <CheckBox
            {...{
              id: item._id,
              checkAll,
              checkedItems,
              setCheckedItems,
            }}
          />
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-light-primary-500 dark:bg-dark-primary-500 max-h-[40px]">
            {item.client?.image ? (
              <img
                src={
                  import.meta.env.VITE_ASSETS +
                  "/Clients-images/" +
                  item.client.image
                }
                alt={item.client?.fullname}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full flex justify-center items-center text-light-quarternary-500 dark:text-dark-quarternary-500 max-h-[40px]">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
          {item.client?.fullname ? (
            <div className="line-clamp-1 whitespace-nowrap text-sm max-h-[40px]">
              {item.client.fullname}
            </div>
          ) : (
            <div className="line-clamp-1 whitespace-nowrap text-sm max-h-[40px]">
              {language.anonymous}
            </div>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="line-clamp-1 max-h-[40px]">{item.amount} $</div>
      </td>
      <td className="px-4 py-3">
        <div className="max-h-[40px]">
          <div> {/* This div is important because it is like the parent of the two div you can replace it with a fragment*/}
            <div
              onClick={openBox}
              className="
              flex items-center justify-center gap-4 w-fit
              text-light-quarternary-500 dark:text-dark-quarternary-400 
              text whitespace-nowrap
              max-w-fit text-sm
              bg-light-primary-500 dark:bg-dark-primary-500 rounded-md py-2 px-3 cursor-pointer 
              border border-light-secondary-500 dark:border-dark-secondary-600 max-h-[38px]
            "
            >
              {language[selectedState]}
            </div>
            <AnimatePresence>
              {opened ? (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0, y: -20 }}
                  ref={statesRef}
                  className="
                      w-full min-h-screen 
                      fixed z-[200] top-0 left-0
                      bg-black bg-opacity-10
                      backdrop-filter backdrop-blur-sm
                      flex justify-center items-center
                    "
                >
                  <div
                    className="
                        flex flex-col items-stretch w-[300px]
                        text-light-quarternary-500 dark:text-dark-quarternary-400 text 
                        whitespace-nowrap bg-light-primary-500 dark:bg-dark-primary-500 
                        rounded-md cursor-pointer 
                        border border-light-secondary-500 dark:border-dark-secondary-600
                      "
                  >
                    <div
                      className="
                            w-full px-5 py-3 text-lg
                            bg-light-primary-500 dark:bg-dark-primary-800
                            rounded-t-md
                            border-b border-light-secondary-500 dark:border-dark-secondary-600
                          "
                    >
                      {language.select + " " + language.status}
                    </div>
                    <div className="w-full min-h-[100px] max-h-[300px] overflow-y-auto">
                      {states?.map((state, index) => {
                        if (state.name == item.status.name) {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setSelectedState(state.name);
                                setOpened(false);
                              }}
                              className="
                                      px-5 py-3 text-sm flex justify-between
                                      hover:bg-light-secondary-200 dark:hover:bg-dark-primary-500
                                      transition-all duration-300
                                      border-b border-light-secondary-500 dark:border-dark-secondary-600
                                    "
                            >
                              {language[state.name]}
                              <i className="fas fa-check"></i>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setSelectedState(state.name);
                                setOpened(false);
                              }}
                              className="
                                      px-5 py-3 text-sm
                                      hover:bg-light-secondary-200 dark:hover:bg-dark-primary-500
                                      transition-all duration-300
                                      border-b border-light-secondary-500 dark:border-dark-secondary-600
                                    "
                            >
                              {language[state.name]}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="line-clamp-1 max-h-[40px]">
          {
            new Date(item.createdAt)
              .toLocaleDateString(
                language.locale,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )
          } 
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2 max-h-[40px]">
          <AnimatePresence>
            {
              invoiceOpened 
              ? (
                <Invoice
                  invoiceOpened={invoiceOpened}
                  setInvoiceOpened={setInvoiceOpened}
                  order={item}
                  onClose={()=>{
                    setInvoiceOpened(false)
                  }}
                />
              ) : null
            }
          </AnimatePresence>
          <button
            onClick={(e) => {openInvoice(item)}}
            className="
              shadow w-8 h-8 
              flex justify-center items-center rounded-full 
              bg-light-primary-500 dark:bg-dark-secondary-700 
              text-light-quarternary-500 dark:text-light-secondary-600
              transition-all duration-300
              hover:bg-info hover:text-light-secondary-200
              dark:hover:bg-info dark:hover:text-light-secondary-200"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button
            onClick={downloadInvoice}
            className="
              shadow w-8 h-8 
              flex justify-center items-center rounded-full 
              bg-light-primary-500 dark:bg-dark-secondary-700 
              text-light-quarternary-500 dark:text-light-secondary-600
              transition-all duration-300
              hover:bg-error hover:text-light-secondary-200
              dark:hover:bg-error dark:hover:text-light-secondary-200"
          >
            <i className="fas fa-download"></i>
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

export default Row;
