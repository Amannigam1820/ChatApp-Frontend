import React from 'react'
import {Line, Doughnut} from "react-chartjs-2"
import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip } from "chart.js"
import { purpleLight,purple,orange,orangeLight } from '../../constants/color'
import { getLast7Days } from '../../lib/feature'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,Legend,  Tooltip, Filler, ArcElement
)
const lineChartOption = {
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false
        }
    },
    scales:{
        x:{
            grid:{
                display:false
            }
            //display:false
        },
        y:{
            beginAtZero:true,
            grid:{
                display:false
            }
            //display:false
        }
    }
}
const labels = getLast7Days()

const LineChart = ({value=[]}) => {
    const data = {
        labels,
          datasets:[{
            data:value,
            fill:true,
            label:"Message",
            backgroundColor:purpleLight,
            borderColor:purple
          }]
    }
  return (
    
    
    <Line data={data} options={lineChartOption}/>
  )
}

const DoughnutOption = {
    responsive:true,
    plugins:{
        legend:{
            display:false
        },
        title:{
            display:false
        }
    },
    
}

const DoughnutChart = ({value=[], labels=[]}) => {
    const data = {
        labels,
          datasets:[{
            data:value,
            label:"Total Chats VS Group Chats",
            backgroundColor:[purpleLight,orangeLight],
            borderColor:[purple,orange],
            hoverBackgroundColor:[purple,orange],
            offset:40
          }]
    }
    return (
      <Doughnut style={{zIndex:10}} data={data} options={DoughnutOption}/>
      
    )
  }
export {LineChart, DoughnutChart}