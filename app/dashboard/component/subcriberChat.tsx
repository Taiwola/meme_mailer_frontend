"use client"
import React, { useEffect, useState } from 'react'
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line
} from "recharts";



export default function SubcriberChat() {
    const [subscribersData, setSubscribersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchSubscriberCount = async (): Promise<[]> => {
        const token = localStorage.getItem("token");
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      
        const res = await fetch(`${API_BASE_URL}/api/analytics`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add token for authorization
            "Content-Type": "application/json", 
          },
        });
      
        const response = await res.json();
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || res.statusText);
        }
        return response.data.last7months
      };

      useEffect(() => {
        const fetch = async () => {
           const last7months = await fetchSubscriberCount();
           setSubscribersData(last7months);
           setLoading(false);
        };
        fetch();
      }, [])

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
        {loading ? (
            <div className='h-[85%] flex items-center justify-center min-w-full'>
                <h5>Loading......</h5>
            </div>
        ) :(<ResponsiveContainer width="100%" height={"85%"} className={"mt-5"}>
            <LineChart
            width={500}
            height={200}
            data={subscribersData}
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
        </ResponsiveContainer>)}
    </div> 
  )
}