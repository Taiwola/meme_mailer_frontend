'use client';
import React, { useEffect, useState } from 'react';
import { CloudLightning } from 'lucide-react';
import { Box, Slider, Typography } from '@mui/material';

type Props = {};

// Simulate fetching value from a database
const fetchSubscriberCount = async (): Promise<number> => {
  const token = localStorage.get("token");
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

  console.log("from user subscribers: ",response);

  return new Promise((resolve) => setTimeout(() => resolve(500), 1000));
};

function UserSubscribers({}: Props) {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const count = await fetchSubscriberCount();
      setValue(count); // Set the value from the database
    };

    fetchData();
  }, []);

  return (
    <div className="w-full my-3 p-3 bg-[#fdd1f8] rounded hover:shadow-xl cursor-pointer">
      <div className="w-full flex items-center">
        <h5 className="text-lg font-medium">Launch Plan</h5>
        <div className="w-[95px] bg-[#831745] shadow ml-2 cursor-pointer gap-2 h-[32px] flex justify-center items-center rounded">
          <span className="text-white text-xl">
            <CloudLightning />
          </span>
          <span className="text-white text-sm">Upgrade</span>
        </div>
      </div>
      <Box
        sx={{
          width: 250,
          
        }}
      >
        <Typography variant="h5" className="text-[#831745]" gutterBottom>
          Total subscribers
        </Typography>

        {/* Read-Only Slider Component */}
        <Slider
          value={value}
          disabled
          aria-label="Subscriber Progress"
          valueLabelDisplay="off"
          min={0}
          max={2500}
          sx={{
            color: '#831745',
            height: 8,
            '& .MuiSlider-thumb': {
              height: 24,
              width: 24,
              backgroundColor: '#fff',
              border: '2px solid #831745',
            },
            '& .MuiSlider-rail': {
              opacity: 0.5,
            },
          }}
        />

        <Typography variant="h6" className="text-[#831745]">
          {value} of 2500 added
        </Typography>
      </Box>
    </div>
  );
}

export default UserSubscribers;
