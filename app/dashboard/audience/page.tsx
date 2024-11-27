import React from 'react'
import SubscriberData from './component/subscriberData';


export default function Page() {
  return (
    <div className='w-full p-5 h-screen overflow-hidden'>
        <h1 className='text-2xl font-medium'>
            Subscribers
        </h1>
        <p className='pt-1 text-lg'>view and manage your subscribers</p>
        <br />
        <SubscriberData />
    </div>
  )
}