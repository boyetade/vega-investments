"use client"

import React, { useEffect, useState } from 'react';
import Clock from 'react-live-clock';

const CurrentValue = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [currentValue, setCurrentValue] = useState<number | null>(null);
    const [prevBalance, setPrevBalance] = useState<number | null>(null);
    const [balanceDate, setBalanceDate] = useState<string | null>(null);
useEffect(() => {
    const fetchData = async () => { 
        try {
            const response = await fetch('api/portfolios');
            const result = await response.json();
            const totalValues = result.totalValues;
            const dateBalance = result.labels;
            setBalanceDate(dateBalance[dateBalance.length - 2]);
           setPrevBalance(totalValues[totalValues.length - 2]);
            setCurrentValue(totalValues[totalValues.length - 1]);
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }; 


   
    fetchData(); 
}, []);

const calculateDiff = (currentValue: number | null, prevBalance: number | null): number | undefined => {
    if (currentValue === null || prevBalance === null || typeof currentValue !== 'number' || typeof prevBalance !== 'number') {
        return undefined;
    }
    const relChange = (currentValue - prevBalance) / prevBalance;
    const percentageDiff = relChange * 100;

    return percentageDiff;

};

const currentPercentage = calculateDiff(currentValue, prevBalance);

    return (
        <div className='grid items-center  min-h screen container mx-auto '>
        <div className='col-span-1 md:col-span-1 lg:col-span-1 '>
        <div className="rounded-xl shadow-lg bg-white ">
                <div className='p-5 flex flex-col ' > 
                <p className='text-2xl md:text-xl font-bold  pb-3'> Your porfolio balance is</p>
                {loading ? <p >Just a moment, crunching the numbers for you!</p> : <><p className='font-bold text-4xl text-blue-500'>${currentValue?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p><p className={`text-xs font-bold  ${currentPercentage && currentPercentage > 0 ? 'text-green-700' : 'text-red-600'} `}>{currentPercentage?.toLocaleString(undefined, { minimumFractionDigits: 2 })}% since {balanceDate}</p></>} 
        </div>
        </div>
    </div>
    </div>
    )
}

export default CurrentValue;
