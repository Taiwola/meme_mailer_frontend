"use client"
import { count } from 'console';
import React, { useState } from 'react'
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line
} from "recharts";

type Props = {}

const data = [
    {
        month: "Jan 2024",
        count: 2000,
    },
    {
        month: "Feb 2024",
        count: 1200,
    },
    {
        month: "March 2024",
        count: 2342,
    },
    {
        month: "April 2024",
        count: 900,
    },
    {
        month: "May 2024",
        count: 3000,
    },
    {
        month: "June 2024",
        count: 1000,
    },
    {
        month: "July 2024",
        count: 800,
    },
    {
        month: "Aug 2024",
        count: 1500,
    },
    {
        month: "Sept 2024",
        count: 1400,
    },
    {
        month: "Oct 2024",
        count: 1600,
    },
    {
        month: "Nov 2024",
        count: 1600,
    },
    {
        month: "Dec 2024",
        count: 1600,
    },
]

export default function SubcriberChat({}: Props) {
    const [subscribersData, setSubscribersData] = useState<any>([]);

  return (
    <div className='my-5 p-5 border rounded bg-white w-full md:h-[55vh] xl:h-[60vh]'>
        <div className='w-full flex'>
            <h3 className='font-medium'>Active Subscribers</h3>
        </div>
        <div className='flex w-full items-center justify-between'>
            <p className='opacity-[.5]'>Shows all active subscribers</p>
            <div className='flex items-center'>
                <div className='w-2 h-2 rounded-full bg-[#eb4898]' />
                <span className='pl-2 text-sm opacity-[.7]'>Subscribers</span>
            </div>
        </div>
        <ResponsiveContainer width="100%" height={"85%"} className={"mt-5"}>
            <LineChart
            width={500}
            height={200}
            data={data}
            syncId={"anyId"}
            margin={{
                top: 10,
                right: 30,
                left:0,
                bottom: 0
            }}
            >
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"month"} />
                <YAxis />
                <Tooltip />
                <Line
                type={"monotone"}
                dataKey={"count"}
                stroke='#EB4898'
                fill='#EB4898'
                />
            </LineChart>
        </ResponsiveContainer>
    </div> 
  )
}