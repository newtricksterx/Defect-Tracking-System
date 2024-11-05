'use client'

import Chart from "chart.js/auto";
import { CategoryScale, ArcElement, Tooltip, Legend  } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Data, doughnutData } from "@/lib/constants";
import { PieChart } from "@/components/Charts/PieChart";
import { DoughnutChart } from "@/components/Charts/DoughnutChart";
import AuthContext from "@/context/AuthContext";
import { Issue } from "@/lib/types";
import { useFetchQuerySet } from "@/CustomHooks/useFetchQuerySet";

Chart.register(CategoryScale, ArcElement, Tooltip, Legend);    
const endpoints = [
    '/api/epic/',
    '/api/story/',
    '/api/task/',
    '/api/bug/',
]

export default function Testpage(){

    const [data, setData] = useState([]);
    const [counts, setCounts] = useState({
        todoCount: 0,
        inproCount: 0,
        complCount: 0
    });

    const {authTokens} = useContext(AuthContext);

    const fetchedData = (
        endpoints.map((endpoint) => {
          const data = useFetchQuerySet<Issue>(endpoint, authTokens ? authTokens.access : "")
          return data;
      })
    )
    
    useEffect(() => {
        if (!fetchedData) return;
    
        // Temporary object to hold new counts
        let newCounts = {
            todoCount: 0,
            inproCount: 0,
            complCount: 0
        };
    
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
    }, [fetchedData]);
    
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

    return (
        <div>
            <DoughnutChart data={doughnutData}/>
        </div>
    )
}

/*
  export const doughnutData= [
    {
      label: "TO DO",
      value: 55,
      color: "rgba(255, 0, 0, 1)",
      cutout: "50%",
    },
    {
      label: "IN PROGRESS",
      value:15,
      color: "rgba(255, 255, 0, 1)",
      cutout: "50%",
    },
    {
      label: "COMPLETED",
      value: 80,
      color: "rgba(0, 255, 0, 1)",
      cutout: "50%",
    },
  ]
*/