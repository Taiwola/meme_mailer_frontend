"use client"
import React, { useState } from 'react';
import DashboardOverviewCard from './component/dashboardOverviewCard';
import SubcriberChat from './component/subcriberChat';
import { Button } from '@/components/ui/button';
import { Copy, Link as LucideLink, Pen } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function page() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (link:string) => {
    //const link = 'http://localhost.com/subscribe?email=example@gmail.com';
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      toast.success("Copied")
      setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
    });
  };
  return (
    <div className='p-5 w-full bg-[#f9fafb]'>
      <h1 className='text-2xl text-surface-900 font-medium'>
        Hi seun 👋
      </h1>
      <p className='text-surface-900 text-opacity-70 text-sm'>
        Here's how your publication is doing
      </p>
      <div className='w-full flex'>
        <div className='w-[65%] min-h-[88vh] pr-5'>
          <br />
          <DashboardOverviewCard clickRate={10} openRate={5} subscribers={200} />
          <SubcriberChat />
        </div>
        <div className='w-[35%] p-5'>
          {/* Create new letter button */}
          <div className='w-full flex justify-end'>
            <Button className='bg-black text-white text-lg rounded !px-6'>
              <span className='mr-1 ml-[-5px]'>
                <Pen />
              </span>
              <span>Start Writing</span>
            </Button>
          </div>
          {/* resources */}
          <br />
          <div>
            <h5 className='text-xl font-medium'>
              Resources
            </h5>
            <div className='bg-white p-5 border'>
              <h4 className='font-medium'>Home Page</h4>
              <div
      className="w-full px-2 my-1 h-[38px] bg-transparent border rounded-lg relative flex items-center cursor-pointer"
      onClick={() => handleCopyLink(" http://localhost.com/subscribe?email=example@gmail.com")}
    >
      <small
        className={`text-sm overflow-hidden overflow-ellipsis whitespace-pre ${
          copied ? 'bg-blue-200' : 'bg-transparent'
        }`}
        style={{ maxWidth: '100%' }}
      >
        http://localhost.com/subscribe?email=example@gmail.com
      </small>
      <div className='absolute h-[38px] w-[90px] rounded-r-lg bg-blue-200 flex right-0 items-center justify-center'>
        <span className='text-lg'><Copy /></span>
        <span className='pl-1'>copy</span>
      </div>
    </div>
            </div>
          </div>

          {/* Tutorials */}
          <div className='w-full bg-white border rounded p-5 my-3'>
            <h5 className='font-medium'>Tutorials</h5>
            <p className='text-sm opacity-[.7]'>
              Learn how to get started on bd and utilize all our features, directly from the tean
            </p>
            <br />
            <Button
            className='bg-[#fbcfe8] text-[#831743] rounded-lg h-[35px] font-medium'
            >
              Tutorials <span><LucideLink /></span>
            </Button>
          </div>

          {/* need help */}
          <div className='w-full bg-white border rounded p-5 my-3'>
            <h5 className='font-medium'>Need help?</h5>
            <Link
            href='/'
            >
              <div className='w-max px-3 h-[33px] bg-transparent border rounded flex my-3 items-center justify-center'>
                <span className='text-sm'>Knowledge base</span>
                <span className='ml-1'><LucideLink /></span>
              </div>
            </Link>
            <Link
            href='/'
            >
              <div className='w-max px-3 h-[33px] bg-transparent border rounded flex my-3 items-center justify-center'>
                <span className='text-sm'>API Documentation</span>
                <span className='ml-1'><LucideLink /></span>
              </div>
            </Link>
            <Link
            href='/'
            >
              <div className='w-max px-3 h-[33px] bg-transparent border rounded flex my-3 items-center justify-center'>
                <span className='text-sm'>Blog</span>
                <span className='ml-1'><LucideLink /></span>
              </div>
            </Link>
            <Link
            href='/'
            >
              <div className='w-max px-3 h-[33px] bg-transparent border rounded flex my-3 items-center justify-center'>
                <span className='text-sm'>FAQ</span>
                <span className='ml-1'><LucideLink /></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
