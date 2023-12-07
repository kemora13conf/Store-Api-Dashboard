import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../App";
import MyLink from "../../Global/MyLink";
import Fetch from "../../utils";

function OrdersByStatus() {
  const { theme, language } = useContext(AppContext);
  const [ordersByStatus, setOrdersByStatus] = useState([
    {
      status: "pending",
      total: 0,
    },
  ]);

  useEffect(() => {
    Fetch(import.meta.env.VITE_API + `/Analytics/invoice`, "GET")
      .then((res) => {
        if (res.type != "success") toast.error(res.message, { theme: theme });
        else setOrdersByStatus(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      className="
          w-1/3 max-w-[350px] min-w-[250px]
          max-h-[375px]
          bg-light-primary-500 dark:bg-dark-primary-800
          rounded-md shadow-md
        "
    >
      <div className="w-full h-full flex flex-col gap-3 p-3 relative">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-lg font-semibold text-light-primary-900 dark:text-dark-primary-100">
            {language.orders_by_status}
          </h1>
        </div>
        <div className="w-full h-full flex flex-col gap-3 overflow-hidden rounded-md">
          {ordersByStatus.map((order, index) => {
            console.log(order);
            return (
              <div
                key={index}
                className="
                    w-full flex gap-3 items-center 
                    px-3 py-2
                    bg-blue-100 bg-opacity-40 dark:bg-dark-primary-700
                  "
              >
                <span 
                  className={`
                    w-[20px] h-[20px] rounded-full
                    ${order.status == 'Not Processed' ? 'bg-yellow-500' : ''}
                    ${order.status == 'Under Process' ? 'bg-green-500' : ''}
                    ${order.status == 'Cancelled' ? 'bg-red-500' : ''}
                    ${order.status == 'Delivered' ? 'bg-blue-500' : ''}
                  `}
                />
                <h1 className="text-light-primary-900 dark:text-dark-primary-100 mr-auto">
                  {order.status}
                </h1>
                <h1 className="text-light-primary-900 dark:text-dark-primary-100">
                  {order.total}
                </h1>
              </div>
            );
          }
            
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersByStatus;
