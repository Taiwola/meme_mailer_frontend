import React from 'react'
import MaxWidthWrapper from './maxwidthwrapper'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'


export default function Hero() {
  return (
    <MaxWidthWrapper>
    <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
    <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
  Empower Your Organization with <span className="text-blue-600">Professional Newsletters</span>
</h1>
<p className='mt-5 text-lg max-w-prose text-muted-foreground'>
  Welcome to NewsNow! We help businesses, non-profits, and organizations create, manage, and send engaging newsletters to their audiences, with ease and reliability.
</p>

<div className="flex flex-col sm:flex-row gap-4 mt-6">
  <Link href="/sign-up" className={buttonVariants()}>
    Get Started Today
  </Link>
  <Button variant={"secondary"}>Our Service Promise &rarr;</Button>
</div>


    </div>

  </MaxWidthWrapper>
  )
}