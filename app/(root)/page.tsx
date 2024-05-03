"use client"

import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='h-full flex items-center justify-center'>
      <SignedIn>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <Link href="/dashboard/upload"><Button>Upload a File</Button></Link>
          <Link href="/dashboard"><Button>Dashboard</Button></Link>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <Button onClick={() => window.location.href = "/sign-in"} >Get started</Button>
      </SignedOut>
    </div>
  )
}

export default page