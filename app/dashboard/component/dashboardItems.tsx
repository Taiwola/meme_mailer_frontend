import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {LayoutDashboardIcon, Pen, TrendingUp, Users, LogOutIcon, Satellite} from "lucide-react";
import { Icons } from "@/app/component/icons";
import { useAuth } from '@/app/hook/use-auth';
import {usePathname} from "next/navigation";

type Props = {
    bottomContent?: boolean
}

const sidebarItems = [
    {
        name: "Dashbord",
        link: "/dashboard",
        icon: <LayoutDashboardIcon />
    },
    {
        name: "Write",
        link: "/dashboard/write",
        icon: <Pen />
    },
    {
        name: "Grow",
        link: "/dashboard/grow",
        icon: <TrendingUp />,
    },
    {
        name: "Audience",
        link: "/dashboard/audience",
        icon: <Users />
    }
    ]




function DashboardItems({bottomContent}: Props) {
    const email = localStorage.getItem('useremail');
    const sideBottomItems = [
        {
            url: `/subscribe?email=${email}`,
            icon: <Satellite />,
            name: "Visit site"
        }
    ]


    const pathName = usePathname()
    const [activeRoute, setActiveRoute] = useState("");
    useEffect(() => {
        setActiveRoute(pathName);
    }, [pathName]) 
    const {signOut} = useAuth();
  return (
    <div>
        {!bottomContent ? (
            <>
            {sidebarItems.map((i, index) => (
                <Link
                key={index}
                href={i.link}
                className='p-2 py-5 flex items-center hover:bg-[#f5f5f5f5]'
                >
                    <span className={`text-3xl mr-2 ${activeRoute === i.link && 'text-[#463bbd]' }`}>
                       {i.icon}
                    </span>
                    <span className={`text-xl mr-2 ${activeRoute === i.link && 'text-[#463bbd]' }`}>
                        {i.name}
                    </span>
                </Link>
            ))}
            </>
        ) : (
            <>
            {sideBottomItems.map((i, index) => (
                <Link
                key={index}
                className='p-2 py-5 flex items-center hover:bg-[#f5f5f5f5]'
                href={i.url === '/' ? `subcribe?email=example@gmail.com` : i.url}
                >
                     <span className={`text-3xl mr-2 ${activeRoute === i.url && 'text-[#463bbd]' }`}>
                       {i.icon}
                    </span>
                    <span className={`text-xl mr-2 ${activeRoute === i.url && 'text-[#463bbd]' }`}>
                        {i.name}
                    </span>
                </Link>
            ))}
               {/* signout */}
        <div className='p-2 py-5 flex items-center cursor-pointer border-b'
        onClick={() => signOut()}
        >
            <span className='text-3xl mr-2'><LogOutIcon /></span>
            <span className='text-xl'>Sign Out</span>
        </div>

        {/* footer */}
        <br />
        <br />
        <div className='w-full flex justify-center cursor-pointer'>
        <Icons.logo className="h-8 w-8" />
        </div>
        <p className='text-sm text-center pt-5 pb-10'>
            @ 2024 seun. All rights reserved.
        </p>
            </>
        )}
    </div>
  )
}

export default DashboardItems