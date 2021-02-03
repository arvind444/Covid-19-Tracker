import React, { useEffect } from 'react';
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            lable: function(tooltipiItem, data) {
                return numeral(tooltipiItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: 'll',
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function(value, index, values) {
                        return numeral(value).format("0a");
                    }
                },
            },
        ],
    },
}

function LineGraph({caseType = 'cases'}) {
    const [data, setData] = useState({});

    const buildChartData = (data, caseType = 'cases') => {
        const chartData = [];
        let lastDataPoint;
        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y : data[caseType][date] - lastDataPoint
                };
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[caseType][date]; 
        }
        return chartData;
    }

    useEffect(() => {
        const fetchData = async () => {
         await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            let chartData = buildChartData(data, 'cases');
            setData(chartData);
        });
        }; 
        fetchData(); 
    }, [caseType]);


    return (
        <div>
            {data?.length > 0 && (
                <Line 
                options = {options}
                data={{
                    datasets: [{
                        backgroundcolor: "rgba(255, 0, 0, 0.7)",
                        bordercolor: "# CC1034",
                        data: data
                    }]
                }}
    
                />
            )}
            
        </div>
    )
}

export default LineGraph
