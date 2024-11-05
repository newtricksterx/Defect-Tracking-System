
import React from "react";
import { Doughnut } from "react-chartjs-2"

type Data = {
    label: string
    value: number
    color: string
    cutout: string
}[]

export function DoughnutChart ({ data }  : { data: Data }){

    const options: any = {
        plugins: {
          responsive: true,
        },
        cutout: data.map((item) => item.cutout),
      };
    
      const finalData = {
        labels: data.map((item) => item.label),
        datasets: [
          {
            data: data.map((item) => Math.round(item.value)),
            backgroundColor: data.map((item) => item.color),
            borderColor: data.map((item) => item.color),
            borderWidth: 2,
            dataVisibility: new Array(data.length).fill(true),
          },
        ],
      };

    return (
        
          <Doughnut
            data={finalData}
            options={options}
          />
        
      );
}