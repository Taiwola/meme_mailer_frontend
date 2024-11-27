import { Button } from '@/components/ui/button';
import { Pen, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ChangeUsername from './changeUsername';
import ChangeEmail from './changeEmail';
import ChangePassword from './changePassword';



type User = {
  _id: string,
  name: string,
  email: string,
}

export default function CustomizeProfile() {
  const [data, setData] = useState<User>();

  const fetchUser = async  () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const res = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    const response = await res.json();

    if (!res.ok) {
      console.log(response.message);
      throw new Error(response.message);
    }
    setData(response.user);
  }

  useEffect(() => {
    fetchUser();
  },[]);


  return (
    <div className="bg-white shadow-lg border rounded-lg p-6 w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-[#831743]">Account</h2>
      <h5 className='text-sm font-normal mb-7'>Manage your account information</h5>

      <div className='flex flex-col gap-2'>
        <div>
        <h4 className='mb-2 font-bold'>Username</h4>
        <hr />
        <div className='flex flex-col justify-start items-start'>
        <p className='tracking-tight font-medium text-sm'>{data?.name}</p>
        <Popover>
          <PopoverTrigger>
          <Button className='text-[#831743]' variant={"link"}>
          <Pen /> Change username
        </Button>
          </PopoverTrigger>
          <PopoverContent>
          <ChangeUsername />
          </PopoverContent>
        </Popover>
        </div>
        </div>

        <br />
        <div>
          <h4 className='mb-2 font-bold'>Email</h4>
          <hr />
          <p className='tracking-tight font-medium text-sm'>{data?.email}</p>
          <Popover>
          <PopoverTrigger>
          <Button className='text-[#831743]' variant={"link"}>
          <Plus /> Change email
        </Button>
          </PopoverTrigger>
          <PopoverContent>
          <ChangeEmail />
          </PopoverContent>
        </Popover>
        </div>
      
      <div className='mt-2'>
        <h1 className='text-2xl font-semibold'>Security</h1>
        <hr />
        <p className='text-sm font-normal'>Manage your security peferences</p>
        <div className='flex flex-col justify-start items-start mt-2'>
        <p className='tracking-tight font-medium text-sm'>Password</p>
        <span>............</span>
        <Popover>
          <PopoverTrigger>
          <Button className='text-[#831743]' variant={"link"}>
          <Plus /> Change Password
        </Button>
          </PopoverTrigger>
          <PopoverContent>
          <ChangePassword />
          </PopoverContent>
        </Popover>
        </div>
      </div>


      </div>
    </div>
  );
}
