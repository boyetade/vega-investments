"use client"

import React from 'react';

const CurrentValue = () => {


    return (
        <div className='grid items-center  min-h screen container mx-auto '>
        <div className='col-span-1 md:col-span-1 lg:col-span-1 '>
        <div className="rounded-xl shadow-lg bg-white ">
                <div className='p-5 flex flex-col m-6 ' > 
        <h1 className='text-2xl md:text-3xl font-medium  '> Current value</h1>
        <h2 className='m-6'>£4000</h2>
        </div>
        </div>
        
        <div className="rounded-xl shadow-lg bg-white ">
                <div className='p-5 flex flex-col m-6 ' > 
        <h1 className='text-2xl md:text-3xl font-medium  '> Current value</h1>
        <h2 className='m-6'>£4000</h2>
        </div>
        </div>

        

    </div>
    </div>
    )
}

export default CurrentValue;
