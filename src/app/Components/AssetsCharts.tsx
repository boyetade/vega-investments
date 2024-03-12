"use client"

import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const FilterButton = ({ title, selected, onClick }: { title: string, selected: boolean, onClick: () => void }) => {
    return (
        <button className={`px-4 text-base rounded-md mr-2 mb-2 ${selected ? 'bg-blue-500 text-white  font-semibold' : 'bg-gray-200 text-gray-800 '}`} onClick={onClick}>{title}</button>
    )
}

const AssetsCharts = () => {
    const [assets, setAssets] = useState<any[]>([]);
    const [prices, setPrices] = useState<any[]>([]);
    const [allData, setAllData] = useState<any>({
        labels: [],
        datasets: [{
            label: 'Poll',
            data: [] as number[],
            backgroundColor: ['blue', 'rgb(6 182 212)', 'red', 'black', 'purple'],

        }]
    });
    const [filteredData, setFilteredData] = useState<any>(null);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const assetsResponse = await fetch('/api/assets');
                const assetsData = await assetsResponse.json();
                setAssets(assetsData);
    
                const pricesResponse = await fetch('/api/prices');
                const pricesData = await pricesResponse.json();
                setPrices(pricesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    useEffect(() => {
        if (assets.length > 0 && prices.length > 0) {
            setAllData(generateChartData('all'));
        }
    }, [assets, prices]);

    useEffect(() => {
        if (assets.length > 0 && prices.length > 0) {
            setFilteredData(generateChartData(filter));
        }
    }, [assets, prices, filter]);

    const filteredAssets = filter === 'all' ? assets : assets.filter(asset => asset.type === filter);
    const assetTypes = Array.from(new Set(filteredAssets.map(asset => asset.type)));

    const assetTypesList = Array.from(new Set(assets.map(asset => asset.type)));

    const generateShadesOfBlue = (baseColor: string, numShades: number) => {
        const shades = [];
        const baseRGB = baseColor.match(/\d+/g);
    
        if (!baseRGB || baseRGB.length !== 3) {
            // Invalid base color format, return default blue shades
            return Array(numShades).fill('rgba(0, 0, 255, 0.6)');
        }
    
        const increment = 140 / (numShades - 1);
    
        for (let i = 0; i < numShades; i++) {
            const newR = Math.round(Number(baseRGB[0]) + i * increment);
            const newG = Math.round(Number(baseRGB[1]) + i * increment);
            const newB = Math.round(Number(baseRGB[2]) + i * increment);
            shades.push(`rgba(${newR}, ${newG}, ${newB}, 0.6)`);
        }
    
        return shades;
    };
    

    const generateChartData = (filter: string) => {
        let chartData;
        if (filter === 'all') {
            const assetTypes = Array.from(new Set(assets.map(asset => asset.type)));
            chartData = {
                labels: assetTypes,
                datasets: [{
                    label: 'Asset Price',
                    data: assetTypes.map(assetType => {
                        const filteredAssetsOfType = assets.filter(asset => asset.type === assetType);
                        const totalValue = filteredAssetsOfType.reduce((sum, accumulator) => {
                            const price = prices.find(price => price.asset === accumulator.name);
                            return sum + (price ? price.price : 0);
                        }, 0);
                        return totalValue;
                    }),
                    backgroundColor: generateShadesOfBlue('rgb(0, 0, 255)', assetTypes.length),
                    borderColor: []
                }]
            };
        } else {
            const filteredAssetsOfType = assets.filter(asset => asset.type === filter);
            chartData = {
                labels: filteredAssetsOfType.map(asset => asset.name),
                datasets: [{
                    label: 'Asset Price',
                    data: filteredAssetsOfType.map(asset => {
                        const price = prices.find(price => price.asset === asset.name);
                        return price ? price.price : 0;
                    }),
                    backgroundColor: generateShadesOfBlue('rgb(0, 0, 255)', filteredAssetsOfType.length),
                    borderColor: []
                }]
            };
        }

        return chartData;
    };



    const handleFilterChange = (selectedFilter: string) => {
        setFilter(selectedFilter);
    };

    const options = {
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        plugins: {
            tooltip : {
             backgroundColor: 'rgba(0, 0, 0, 0.3)'   
            }
        }
    };

    return (
        <div className='grid min-h-screen  container mx-auto '>
            <div className='col-span-1 md:col-span-1 lg:col-span-1 max-w-screen-lg mx-auto'>
                <div className="rounded-xl shadow-lg bg-white sm:h-screen md:h-auto w-full ">
                    <div className='p-5 flex flex-col m-6'>
                        <p className='text-xl md:text-xl font-medium pb-3'> Your Portfolio diversity</p>
                        <div className= 'flex'>
                        <FilterButton  title={'All'} selected={filter === 'all'} onClick={() => handleFilterChange('all')} />
                            {assetTypesList.map(assetType => (
                                <FilterButton key={assetType} title={assetType} selected={assetType === filter} onClick={() => handleFilterChange(assetType)} />

                            ))}
                        </div>
                        <Doughnut data={filter === 'all' ? allData : filteredData} options={options} className='m-6'></Doughnut>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetsCharts;
