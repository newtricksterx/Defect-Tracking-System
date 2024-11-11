'use client'

import React from 'react'
import Chart from "chart.js/auto";
import { CategoryScale, ArcElement, Tooltip, Legend  } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { DoughnutChart } from "@/components/Charts/DoughnutChart";
import AuthContext from "@/context/AuthContext";
import { Issue } from "@/lib/types";
import { useFetchData } from '@/CustomHooks/useFetchData';

Chart.register(CategoryScale, ArcElement, Tooltip, Legend);    
const endpoints = [
    '/api/epic/',
    '/api/story/',
    '/api/task/',
    '/api/bug/',
]

function StatusChart() {
    const [chartLoading, setChartLoading] = useState(true)

    const [counts, setCounts] = useState({
        todoCount: 0,
        inproCount: 0,
        complCount: 0
    });

    const fetchedData = (
        endpoints.map((endpoint) => {
          const data = useFetchData<Issue[]>(endpoint, [])
          return data;
        })
    )

    useEffect(() => {
        if(fetchedData.flat().length > 0){
            setChartLoading(false);
        }
    }, [fetchedData])
    
    useEffect(() => {
        if (chartLoading) return;
    
        // Temporary object to hold new counts
        let newCounts = {
            todoCount: 0,
            inproCount: 0,
            complCount: 0
        };

        console.log(fetchedData.flat())
    
        // Flatten the fetchedData and count statuses
        fetchedData.flat().forEach((item) => {
            if (item.status === "TO_DO") {
                newCounts.todoCount++;
            } else if (item.status === "IN_PROGRESS") {
                newCounts.inproCount++;
            } else if (item.status === "COMPLETED") {
                newCounts.complCount++;
            }
        });
    
        // Set counts once after processing
        setCounts(newCounts);
    
        // Log counts after updating state
        console.log(newCounts);
    }, [chartLoading]);
    
    const doughnutData = [
        {
          label: "TO DO",
          value: counts.todoCount,
          color: "rgba(255, 0, 0, 1)",
          cutout: "50%",
        },
        {
          label: "IN PROGRESS",
          value: counts.inproCount,
          color: "rgba(255, 255, 0, 1)",
          cutout: "50%",
        },
        {
          label: "COMPLETED",
          value: counts.complCount,
          color: "rgba(0, 255, 0, 1)",
          cutout: "50%",
        },
      ]

    if(chartLoading){
        return (
            <div>
              Loading...
            </div>
        )
    } 

    return (
        <DoughnutChart data={doughnutData}/>
    )
}

export default StatusChart
