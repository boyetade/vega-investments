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
    const [portfolio, setPortfolio] = useState<any[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
      const generateLabels = () => {
        const labelsArray: string[] = [];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
  
        for (let year = 2020; year <= currentYear; year++) {
          const startMonth = (year === 2020) ? 1 : 0; // Start from January for the first year, otherwise from January
          const endMonth = (year === currentYear) ? currentMonth : 12; // End at the current month for the current year
  
          for (let month = startMonth; month < endMonth; month++) {
            const formattedDate = new Date(year, month, 1).toLocaleString('default', { month: 'short' }) + ' ' + year;
            labelsArray.push(formattedDate);
          }
        }
  
        return labelsArray;
      };
  
      setLabels(generateLabels());
    }, []);
    const handleClick = ({ title }: { title: string }) => {
        setSelectedButton(title);
    };

    useEffect(() => {
      const fetchData = async () => {
          try {
              const portfolioResponse = await fetch('/api/portfolios');
              const portfolioData = await portfolioResponse.json();
              setPortfolio(portfolioData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      fetchData();
  }, []);
    
  const data = {
    labels: labels,
    datasets: portfolio.map((entry, index) => ({
      label: `Portfolio ${index + 1}`,
      data: entry.positions.map((position: any) => position.quantity), // Use relevant data from your portfolio structure
      borderColor: `rgb(${faker.datatype.number(255)}, ${faker.datatype.number(255)}, ${faker.datatype.number(255)})`,
      backgroundColor: `rgba(${faker.datatype.number(255)}, ${faker.datatype.number(255)}, ${faker.datatype.number(255)}, 0.5)`,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Balance Over Time',
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

    

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
        <Line data={data}
        options={options}
        className='m-6'></Line>
        </div>
        </div>
</div>
    </div>
    )
}

export default HistoricalValue;
