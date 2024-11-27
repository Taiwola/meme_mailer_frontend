"use client"
import React from 'react'
import { Providers } from '../utils/providers';
import DashboardNavbar from './component/dashboardNavbar';
import {useRouter} from "next/navigation";
import toast from 'react-hot-toast';
import {QueryClient, QueryClientProvider} from "react-query";

  

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

   const authToken = localStorage.getItem('token');
   const userId = localStorage.getItem('userId');
    const router = useRouter();
    // Create a QueryClient instance
  const queryClient = new QueryClient();

    if (!authToken) {
      toast.error("User not signed in!");
      router.replace("/sign-in");
    }

    // TODO
    // check if token hasn't expired
    // if its has, log the user out

    if (!userId) {
      toast.error("User not signed in!");
      router.replace("/sign-in");
    }
    return (
      <>
          <body>
            <Providers>
              <div className='w-full flex overflow-y-hidden'>
                <QueryClientProvider client={queryClient}>
                 <DashboardNavbar />
            {children}
            </QueryClientProvider>
              </div>
            </Providers>
          
        </body>
      </>
    );
  }