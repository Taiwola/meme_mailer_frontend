"use client"
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import EmailEditor from './component/emailEditor';

type Props = {}

export default function page({}: Props) {
    const searchParams = useSearchParams();
    const subject:string = searchParams.get("subject")!;
    const subjectTitle = subject.replace(/-/g, " ");
  return (
    <div className='w-full flex bg-[#f7f7f7]'>
        <div className='w-full p-5 bg-white rounded-r-xl'>
       {/* back arrow */}
       <Link
       href={"/dashboard/write"}
       onClick={() => localStorage.removeItem("newsletterId")}
       className='opacity-[.7] w-min flex text-xl items-center'
       >
        <span><ArrowLeft /></span>
        <span>Exit</span>
       </Link>
       {/* editor */}
       <div className='my-5'>
        <EmailEditor subjectTitle={subjectTitle}/>
       </div>
        </div>
    </div>
  )
}