"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { useAuth } from '@/app/hook/use-auth';


type Email = {
  _id: string;
  title: string;
};
export default function Page() {
  const [emailTitle, setEmailTitle] = useState("");
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {getEmails} = useAuth();

  const {data} = useQuery("getEmails", getEmails, {
    retry: false
  })

  const handleCreate = () => {
    if (emailTitle.length === 0 ) {
      toast.error("Enter the email subject to continue!");
    } else {
      const formatTitle = emailTitle.replace(/\s+/g, "-").replace(/&/g, "-");
      router.push(`/dashboard/new-email?subject=${formatTitle}`)
    }
  }

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t as string);
  }, [token])

  const deleteHandler = async (id: string) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!token) {
      toast.error("No authorization token found.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/newsletter/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || res.statusText);
      } else {
        toast.success("Draft deleted successfully");
        window.location.reload();
      } 
    } catch (error) {
      toast.error("An error occurred while deleting the draft.");
        console.error("delete draft error:", error);
    }
  }

  return (
    <div className='w-full flex p-5 flex-wrap gap-6 relative'>
      <div className='w-[200px] h-[200px] bg-slate-50 flex flex-col items-center justify-center border cursor-pointer'
      onClick={() => setOpen(!open)}
      >
        <span className='text-2xl block text-center mb-3'>
          <Plus />
        </span>
        <h5 className='text-2xl'>Create New</h5>
      </div>

      {/* fetch all saved emails */}
      {
        data && data?.email.map((i:Email) => {
          const formatedTitle = i?.title?.replace(/\s+/g, '-').replace(/&/g, "-");
          return (
            <div className='w-[200px] h-[200px] relative bg-slate-50 flex flex-col justify-center items-center'
            key={i?._id}>
              <span className='absolute block z-20 right-2 top-2 text-2xl cursor-pointer'
              onClick={() => deleteHandler(i?._id)}
              >
                <Trash2  className='text-red-600'/>
              </span>
              <h5 className='text-xl text-center cursor-pointer'
              onClick={() => {
                localStorage.setItem("newsletterId", i?._id)
                router.push(`/dashboard/new-email?subject=${formatedTitle}`)
              }}
              >{i?.title}</h5>
            </div>
          )
        })
      }
      {
        open && (
          <div className='absolute flex items-center justify-center top-0 left-0 bg-[#00000028] h-screen w-full'>
            <div className='w-[600px] p-5 bg-white rounded shadow relative'>
              <div className='absolute top-3 right-3'>
              <span className='text-lg cursor-pointer'
              onClick={() => setOpen(!open)}
              >
               <X />
              </span>
              </div>
              <h5 className='text-2xl'>
                Enter your email subject
              </h5>
              <Input
              type='text'
              name=''
              className='border w-full my-2 h-[35px] px-2 outline-none'
              value={emailTitle}
              onChange={(e) => setEmailTitle(e.target.value)}
              />
              <Button
              color='primary'
              className='rounded text-xl mt-3'
              onClick={handleCreate}
              >
                Continue
              </Button>
            </div>
          </div>
        )
      }
    </div>
  )
}