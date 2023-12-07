import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../../App';
import { AnimatePresence, motion } from 'framer-motion';
import YearForm from './YearForm';
import LineChart from './LineChart';
import Fetch from '../../utils';

function RevenueChart({bounds}) {
    const { language, theme } = useContext(AppContext);
    const [year, setYear] = useState(new Date().getFullYear());
    const [orders, setOrders] = useState([
        {
            month: 1, // month
            total: 0, // total orders
        },
    ]);
    const [data, setData] = useState([]);
    useEffect(() => {
        Fetch(import.meta.env.VITE_API + `/Analytics/${year}/amount-per-month`, 'GET')
            .then(res => {
                if (res.type != 'success') toast.error(res.message, { theme: theme });
                else setOrders(res.data.orders);
            })
            .catch(err => {
                console.log(err);
            })
    }, [year])
    useEffect(() => {
        let data = [];
        for (let i = 1; i <= 12; i++) {
            const order = orders.find(item => item.month == i);
            if (order) data.push(order.total);
            else data.push(0);
        }
        setData(data);
    }, [orders])
  return (
    <div className={bounds.width < 700 ? 'w-full' : 'w-2/3'}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full flex flex-wrap gap-3 justify-center @[600px]/total:flex-nowrap "
        >
          <div className="w-full flex flex-col gap-3 justify-center items-center">
            <div
              className="
              w-full flex flex-wrap gap-3 justify-center 
              px-3 py-2
              @[600px]/total:flex-nowrap
              bg-light-primary-500 dark:bg-dark-primary-800
              shadow-md rounded-md
            "
            >
              <div className="w-full flex gap-3 justify-between items-center">
                <h1 className="w-full text-light-quarternary-500 dark:text-dark-quarternary-500 text-xl font-bold">
                  {language.revenue_per_month}
                </h1>
                <YearForm year={year} setYear={setYear} />
              </div>
              <LineChart className="w-1/2 max-h-[300px]" data={data} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default RevenueChart