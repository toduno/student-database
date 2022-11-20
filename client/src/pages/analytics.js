import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto' // react-chartjs-2 needs chart.js for it to work. 
//Always import chartjs along.

const Analytics = () => {
    const [records, setRecords] = useState([])
    const [chartData, setChartData] = useState({})
    
    
    useEffect(() => {
        const chart = () => {
            async function getRecords() {
                //get the response
                const response = await fetch(`http://localhost:7000/record/`)
                if(!response.ok) return window.alert(`An error has occurred: ${response.statusText}`)
    
                const records = await response.json()
               
                //set the records state with the response data
                setRecords(records)
            }
            getRecords()
    
            
            setChartData(
                {
                labels: ['Jan', 'Feb', 'March'], //the length of the labels array should be more than one else you won't see the line
                datasets: [
                    {
                        label: "look",
                        data: [1,2,3],
                        backgroundColor: ["red"],
                        borderRadius: 4
                    }
                ]
            }
        )
        }
        chart()

        return
    }, []) // Because you are modifing records in the useEffect, 
    //don't include record in this array else it will cause infinite loop

    return (
        <div>
            Hello World
            <Line
                data={chartData}
            />
        </div>
    )
}


export default Analytics
