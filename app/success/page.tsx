import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='w-full flex flex-col items-center justify-center h-screen'>
        <h1 className='text-7xl pb-8 capitalize text-green-500'>Congrats</h1>
        <Link href={"/"}>
        <Button>
        Back home
        </Button>
        </Link>
        </div>
  )
}