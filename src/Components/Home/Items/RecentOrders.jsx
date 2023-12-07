import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../App";
import MyLink from "../../Global/MyLink";
import Fetch from "../../utils";
import useMeasure from "react-use-measure";

function RecentOrders() {
  const { theme, language } = useContext(AppContext);
  const [recentOrder, seRecentOrder] = useState([]);
  const[ref, bounds] = useMeasure();

  useEffect(() => {
    Fetch(import.meta.env.VITE_API + `/Analytics/orders/recent`, "GET")
      .then((res) => {
        if (res.type != "success") toast.error(res.message, { theme: theme });
        else seRecentOrder(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      ref={ref}
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
            {language.recent_orders}
          </h1>
        </div>
        <div className={`w-full max-h-[310px] flex flex-col gap-3 overflow-hidden rounded-md`}>
          {recentOrder.map((order, index) => (
            <div
              className="
                w-full px-3 py-2 
                bg-light-secondary-500 dark:bg-dark-primary-500 
                rounded 
                shadow
                flex flex-col gap-2
              "
            >
              <div className="w-full flex gap-2 items-center">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    import.meta.env.VITE_ASSETS +
                    "/Clients-images/" +
                    order.client.image
                  }
                  alt={order.client.fullname}
                />
                <div className="w-full flex flex-col gap-1">
                  <h1 className="text-sm  text-light-primary-900 dark:text-dark-primary-100">
                    {order.client.fullname}
                  </h1>
                  <h1
                    className=" w-fit px-2 py-[1px] rounded-full
                      text-xs  text-light-primary-900 dark:text-dark-primary-100
                      bg-light-quarternary-100 dark:bg-dark-primary-800
                      "
                  >
                    {order.status.name}
                  </h1>
                </div>
              </div>
              <div className="w-full flex items-center justify-between gap-1 pl-12">
                <h1 className="text-xs  text-light-primary-900 dark:text-dark-primary-100">
                  {order.items.length} {language.items}
                </h1>
                <h1 className="text-sm font-semibold text-light-primary-900 dark:text-dark-primary-100">
                  {order.amount} $
                </h1>
              </div>
            </div>
          ))}
        </div>
        <div
            className="
              w-full absolute bottom-0 left-0
              bg-gradient-to-t from-light-primary-500 dark:from-dark-primary-800 via-light-pimary-500 to-[rgba(255,255,255,0)]
              backdrop-blur-[5px]
              flex justify-center items-center
              h-10 rounded-full overflow-hidden
            "
          >
            <MyLink
              to="/orders"
              className="
                text-sm  text-light-primary-900 dark:text-dark-primary-100
                hover:text-light-secondary-700 dark:hover:text-dark-primary-200
                transition-colors duration-200
              "
            >
              {language.view_all}
            </MyLink>
          </div>
      </div>
    </div>
  );
}

export default RecentOrders;
