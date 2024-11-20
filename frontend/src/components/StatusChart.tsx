'use client'

import React from 'react'
import Chart from "chart.js/auto";
import { CategoryScale, ArcElement, Tooltip, Legend  } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { DoughnutChart } from "@/components/charts/DoughnutChart";
import AuthContext from "@/context/AuthContext";
import { IIssue } from "@/lib/types";
import { GetRequest } from '@/requests/GetRequest';

Chart.register(CategoryScale, ArcElement, Tooltip, Legend);    
const endpoints = [
    '/api/epic/',
    '/api/story/',
    '/api/task/',
    '/api/bug/',
]

function StatusChart() {
    const [loading, setLoading] = useState(true)

    const [counts, setCounts] = useState({
        todoCount: 0,
        inproCount: 0,
        complCount: 0
    });

    const { getRequest } = GetRequest()

    async function fetchDataFromEndpoints(){
        const result = []
        for(const url of endpoints){
            const response = await getRequest(url);
            result.push(response?.data)
        }

        return result
    }

    function generateCount(issuesList: IIssue[]){
        let newCounts = {
            todoCount: 0,
            inproCount: 0,
            complCount: 0
        };

        // Flatten the fetchedData and count statuses
        issuesList.forEach((item) => {
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
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await fetchDataFromEndpoints()
                generateCount(getData.flat())
                setLoading(false);
            } catch (error) {
                console.log(error)
            } 
        }

        fetchData()
    }, [])
    
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

    if(loading){
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
