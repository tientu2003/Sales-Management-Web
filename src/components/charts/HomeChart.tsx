import React, { useState,useMemo, useCallback} from "react";
import { Chart } from "chart.js/auto";
import { useRef,useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/system";
import { useSearchParams } from "next/navigation";

export default function HomeChart(){
    const chartColor = useColorModeValue('red','dark')
    const chartRef = useRef(null)
    const [labelsData,setLabelData] = useState({
        labels:['1','2'],
        datas:[1,2]})
    const SearchParams = useSearchParams()
    useEffect(() =>{
        fetch('http://localhost:3000//api/getChartData').then(
            (res) => {
                if (res.ok){
                  return res.json()
                }else{
                  throw new Error('This is an HTTP error,Chart')
                }
            }
        ).then( datapoints =>{
            const chartlable = datapoints.map((e:any) =>{
                return e.day
            })
            const chartData = datapoints.map((e:any) =>{
                return e.value
            })
            setLabelData({labels:chartlable,datas:chartData})
            }   
        );
       
    },[SearchParams])

    useMemo(()=>{
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }
            const context = chartRef.current.getContext("2d");
            const newChart = new Chart(context,{
                type : "bar",
                data : {
                    labels: labelsData.labels,
                    datasets:[
                    {
                      label: 'revenue ($)',
                      data: labelsData.datas,
                      backgroundColor: ["#F56565", "#ED8936","#ECC94B","#48BB78","#38B2AC","#4299E1","#0BC5EA"],

                    }]
                },
                options:{
                    scales:{
                        x:{
                            type: "category"
                        },
                        y:{
                            beginAtZero: true
                        }
                    }
                }
                });

                chartRef.current.chart = newChart
        }

    },[labelsData])
    
    return (
    <div style={{position:"relative"}}>
        <canvas ref={chartRef}/>
    </div>)

}