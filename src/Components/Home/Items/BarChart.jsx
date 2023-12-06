import React, { createRef, forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { Chart } from 'chart.js/auto';
import { AppContext } from '../../../App';

// FarwordedRef Component
const BarChart = (props) => {
    const {data} = props;
    const { language, theme } = useContext(AppContext);
    const ref = useRef();
    console.log('data', data);
    useEffect(() => {
        const ctx = ref.current.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            
            data: {
                labels: language.months_arr,
                datasets: [{
                    data: data,
                    label: language.orders,
                    labelColor: theme == 'light' ? 'rgba(38,38,67)' : 'rgba(255, 255, 255)',
                    backgroundColor: [
                        theme == 'light' ? 'rgba(38,38,67)' : 'rgba(245, 235, 235)',
                    ],
                    borderRadius: 10,
                    borderSkipped: false,
                    borderWidth: 5,
                    borderColor: 'rgba(0,0,0,0)',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                scales: {
                    x: {
                        grid: {
                            color: theme == 'light' ? 'rgba(38,38,67,0.2)' : 'rgba(255, 120, 0, 0.3)',
                        },
                        ticks: {
                            color: theme == 'light' ? 'rgba(38,38,67)' : 'rgba(220, 220, 220)',
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: theme == 'light' ? 'rgba(38,38,67,0.2)' : 'rgba(255, 120, 0, 0.3)',
                        },
                        ticks: {
                            color: theme == 'light' ? 'rgba(38,38,67)' : 'rgba(220, 220, 220)',
                        }
                    }
                },
                
            }
        });
        return () => {
            chart.destroy();
        }
    }, [data])
  return (
    <canvas className={props.className? props.className : ''} ref={ref}/>
  )
}

export default BarChart