import React, { useContext, useEffect } from "react";
import Fetch from "../../utils";
import { toast } from "react-toastify";
import { AppContext } from "../../../App";
import CountUp from "react-countup";

function CountAll() {
  const { language, theme } = useContext(AppContext);
  const [total, setTotal] = React.useState({
    catgories: 0,
    products: 0,
    orders: 0,
    clients: 0,
  });
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
  return (
    <div
      className="
            w-full @container/total
        "
    >
      <div className="w-full flex gap-3 flex-wrap justify-between">
        <div className="w-full min-w-fit max-w-[200px] shadow-light">
          <div className="w-full p-4 bg-light-primary-500 flex flex-col gap-0 text-light-quarternary-500 ">
            <div className="w-full flex items-start justify-between gap-4">
              <span className="text-lg font-bold">{language.categories}</span>
              <i className="fas fa-layer-group text-3xl"></i>
            </div>
            <span className="text-3xl font-bold flex items-center gap-2">
              <span className="text-sm font-normal">{language.total} : </span>
              <CountUp end={total.catgories} duration={5} />
            </span>
          </div>
        </div>
        <div className="w-full min-w-fit max-w-[200px] shadow-light">
          <div className="w-full p-4 bg-light-primary-500 flex flex-col gap-0 text-light-quarternary-500 ">
            <div className="w-full flex items-start justify-between gap-4">
              <span className="text-lg font-bold">{language.products}</span>
              <i className="fas fa-box-open text-3xl"></i>
            </div>
            <span className="text-3xl font-bold flex items-center gap-2">
              <span className="text-sm font-normal">{language.total} : </span>
              <CountUp end={total.products} duration={5} />
            </span>
          </div>
        </div>
        <div className="w-full min-w-fit max-w-[200px] shadow-light">
          <div className="w-full p-4 bg-light-primary-500 flex flex-col gap-0 text-light-quarternary-500 ">
            <div className="w-full flex items-start justify-between gap-4">
              <span className="text-lg font-bold">{language.orders}</span>
              <i className="fas fa-shopping-cart text-3xl"></i>
            </div>
            <span className="text-3xl font-bold flex items-center gap-2">
              <span className="text-sm font-normal">{language.total} : </span>
              <CountUp end={total.orders} duration={5} />
            </span>
          </div>
        </div>
        <div className="w-full min-w-fit max-w-[200px] shadow-light">
          <div className="w-full p-4 bg-light-primary-500 flex flex-col gap-0 text-light-quarternary-500 ">
            <div className="w-full flex items-start justify-between gap-4">
              <span className="text-lg font-bold">{language.clients}</span>
              <i className="fas fa-users text-3xl"></i>
            </div>
            <span className="text-3xl font-bold flex items-center gap-2">
              <span className="text-sm font-normal">{language.total} : </span>
              <CountUp end={total.clients} duration={5} />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CountAll;
