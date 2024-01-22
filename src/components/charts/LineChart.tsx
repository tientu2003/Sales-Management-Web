import React, { useState,useMemo, useCallback} from "react";
import { Chart } from "chart.js/auto";
import { useRef,useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/system";
import { useSearchParams } from "next/navigation";

export default function LineChart(){
    const chartColor = useColorModeValue('red','dark')
    const chartRef = useRef(null)
    const [labelsData,setLabelData] = useState({
        labels:['1','2','3','4','5','6','7'],
        datas:[1,5,6,2,3,4,2]})
    const SearchParams = useSearchParams()
    useEffect(() =>{
        fetch('http://localhost:3000//api/getLineChartData').then(
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
                type : 'line',
                data : {
                    labels: labelsData.labels,
                    datasets:[
                    {
                      label: 'revenue ($)',
                      data: labelsData.datas,
                      backgroundColor: 'transparent',
                      borderColor:'#7551FF',
                      pointBorderColor:'transparent',
                      pointBorderWidth:4,
                      borderWidth:1,
                      tension:0.5,
                      fill: {
                        target: 'origin',
                        // above: '#9374FF',  
                      }
                    }]
                },
                options:{
                    scales:{
                        x:{
                            ticks:{
                                display:false
                            },
                            grid:{
                                display:false
                            }
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