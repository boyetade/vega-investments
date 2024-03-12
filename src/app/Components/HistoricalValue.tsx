"use client"

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS,
LineElement, 
CategoryScale, // x axis 
LinearScale, // y axis
PointElement, 
Tooltip,
Legend,
Title
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { faker } from '@faker-js/faker';

ChartJS.register(
    LineElement, 
    CategoryScale, // x axis 
    LinearScale, // y axis
    PointElement, 
    Title, 
    Tooltip,
    Legend
)

const FilterButton = ({title, selected, onClick} :{ title: string, selected:boolean, onClick: ()=> void }) => {
    
    return (
        <button className={`px-4 py-2 rounded-md mr-2 mb-2 ${selected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={onClick}>{title}</button>
    )
    
} 

const labels = ['Jan 23', 'Feb 23', 'March 23', 'April 23', 'May 23', 'June 23'];
const HistoricalValue = () => {
    const [selectedButton, setSelectedButton] = useState<string | null>("6 months");
    const [chartData, setChartData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchData = async () => {

        try {

          const response = await fetch ('api/portfolios');
          const result = await response.json();

          const labels = result.labels;
          const datasets = [
            {
              label: 'DataSet', 
              data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
              borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
          ]
          setChartData({
            labels: labels,
            datasets: datasets
        });

        setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData()
    }, []);

    const handleClick = ({ title }: { title: string }) => {
        setSelectedButton(title);
    };
    
    // const data = {
    //     labels: labels,
    //     datasets: [
    //         {
    //           label: 'Dataset 2',
    //           data: 
    //           borderColor: 'rgb(53, 162, 235)',
    //           backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //         },
    //       ],
    // }

    const options = {
        responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    y: {
      grid: {
        display: false
      }
    },
    x: {
      grid: {
        display: false 
      }
    }
  }
    }

    

    return (
        <div className='grid items-center min-h screen container mx-auto '>
            <div className='col-span-1 md:col-span-2 lg:col-span-2 '>
            <div className = "rounded-xl shadow-lg bg-white sm:h-screen md:h-auto w-full"> 
                <div className='p-5 flex flex-col m-6'>
   <div className='flex items-center justify-between'>
        <p className='text-base md:text-3xl font-medium  '> Your Porfolio balance</p>
        <div className="flex flex-wrap items-end justify-end" >
                            <FilterButton title="6 months" selected={selectedButton === "6 months"} onClick={() => handleClick({title: "6 months"})}/>
                            <FilterButton title="9 months" selected={selectedButton === "9 months"} onClick={() => handleClick({title:"9 months"})}/>
                            <FilterButton title="12 months" selected={selectedButton === "12 months"} onClick={() => handleClick({ title: "12 months" })} />
<FilterButton title="All time" selected={selectedButton === "All time"} onClick={() => handleClick({ title: "All time" })} />
                          
                        </div></div>
                        {loading ? <p>Loading...</p> : <Line data={chartData} options={options} className='m-6' />}
        </div>
        </div>
</div>
    </div>
    )
}

export default HistoricalValue;
