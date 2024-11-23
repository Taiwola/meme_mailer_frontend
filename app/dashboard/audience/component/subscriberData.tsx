'use client';
import React from 'react';
import { useQuery } from 'react-query';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'timeago.js';
import { Box, Typography, CircularProgress } from '@mui/material';

type Subscriber = {
  _id: string;
  email: string;
  createdAt: string;
  source?: string;
  status?: string;
};

const getAllSubscriber = async () => {
  const token = localStorage.getItem("token");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${API_BASE_URL}/api/subscriber`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || res.statusText);
  }

  return data.subscriber;
};

export default function SubscriberData() {
  const { data, isError, isLoading } = useQuery<Subscriber[]>("getAllSubscribers", getAllSubscriber, {
    retry: false,
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'email', headerName: 'Email', flex: 0.8 },
    { field: 'createdAt', headerName: 'Subscribed At', flex: 0.5 },
    { field: 'source', headerName: 'Source', flex: 0.5 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      renderCell: (params) => (
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          width: '100%',
          height: '100%',
        }}
      >
        <Typography
          style={{
            color: params.row.status === 'Active' ? 'green' : 'red',
            fontWeight: 'bold',
            textAlign: 'left',
          }}
        >
          {params.row.status}
        </Typography>
        </Box>
      ),
    },
  ];

  const rows:any = data?.map((subscriber) => ({
    id: subscriber._id,
    email: subscriber.email,
    createdAt: format(subscriber.createdAt),
    source: subscriber.source || 'N/A',
    status: subscriber.status || 'Active',
  })) || [];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color="error">Error loading subscribers.</Typography>
      </Box>
    );
  }

  return (
    <Box height={400} width="100%">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
