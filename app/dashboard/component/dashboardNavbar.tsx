'use client'
import React from 'react'
import { useAppContext } from '@/app/utils/providers';
import DashboardItems from './dashboardItems';
import UserSubscribers from './userSubscribers';
import { Icons } from "@/app/component/icons";

type Props = {}

export default function DashboardNavbar({}: Props) {
    const {authState} = useAppContext();
    const userId = authState.user?._id
  return (
    <div className='w-[290px]'>
         <div className='p-2'>
         <div className='p-2 flex items-center bg-[#f5f5f5f5] rounded'>
            <span className='text-2xl'><Icons.logo className="h-8 w-8" /> </span>
            <h5 className='pl-2 pt-1 capitalize'>dummy newsletter</h5>
         </div>
         <div>
            <DashboardItems />
            <UserSubscribers />
            <DashboardItems bottomContent={true} />
         </div>
    </div>
    </div>
  )
}