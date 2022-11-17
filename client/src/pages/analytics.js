import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"

const Analytics = () => {
    const [records, setRecords] = useState([])
    const [chartData, setChartData] = useState([])
    
    
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
    
            
            setChartData({
                labels: ['students'],
                datasets: [
                    {
                        label: "look",
                        data: records,
                        backgroundColor: ["red"],
                        borderRadius: 4
                    }
                ]
            })
        }
        chart()

        return
    }, [records]) 

    return (
        <div>
            <Line
            data={chartData}
            />
            
        
        </div>
    )
}


export default Analytics