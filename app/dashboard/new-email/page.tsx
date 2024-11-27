"use client";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'; // Import useState and useEffect
import EmailEditor from './component/emailEditor';

export default function Page() {
    const [isClient, setIsClient] = useState(false);  // State to track if we are in the client-side
    const searchParams = useSearchParams();
    const subject: string = searchParams.get("subject")!;  // Using non-null assertion operator since subject is required
    const subjectTitle = subject.replace(/-/g, " ");  // Format subject

    // Set isClient to true when component is mounted (client-side)
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Render only on the client-side
   // Render a spinner while loading on the client-side
   if (!isClient) {
    return <div className="w-full h-full flex justify-center items-center">
        <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
    </div>;
}

    return (
        <div className='w-full flex bg-[#f7f7f7]'>
            <div className='w-full p-5 bg-white rounded-r-xl'>
                {/* back arrow */}
                <Link
                    href={"/dashboard/write"}
                    onClick={() => {
                        // Ensure we are on the client-side before accessing localStorage
                        if (typeof window !== "undefined") {
                            localStorage.removeItem("newsletterId");
                        }
                    }}
                    className='opacity-[.7] w-min flex text-xl items-center'
                >
                    <span><ArrowLeft /></span>
                    <span>Exit</span>
                </Link>
                {/* editor */}
                <div className='my-5'>
                    <EmailEditor subjectTitle={subjectTitle} />
                </div>
            </div>
        </div>
    );
}
