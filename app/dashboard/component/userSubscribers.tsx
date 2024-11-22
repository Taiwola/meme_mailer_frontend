import React from 'react'
import {CloudLightning} from 'lucide-react'

type Props = {}

function UserSubscribers({}: Props) {
  return (
    <div className='w-full my-3 p-3 bg-[#fdd1f8] rounded hover:shadow-xl cursor-pointer'>
        <div className='w-full flex  items-center'>
            <h5 className='text-lg font-medium'>Lauch Plan</h5>
            <div className='w-[95px] bg-[#831745] shadow ml-2 cursor-pointer gap-2 h-[32px] flex justify-center items-center rounded'>
                <span className='text-white text-xl'>
                    <CloudLightning />
                </span>
                <span className='text-white text-sm'>Upgrade</span>
            </div>
            </div>
            <h5 className='text-[#831745]'>Total subcribers</h5>
            {/* add slider here */}
            <h6 className='text-[#831745]'>0 of 2500 added</h6>
       
    </div>
  )
}

export default UserSubscribers