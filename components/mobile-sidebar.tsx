"use client";

import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Sidebar from './sidebar'
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function MobileSidebar({apiLimitCount, isPro}: any) {
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    },[])

    if(!isMounted) {
        return null;
    }
  return (
    <Sheet>
    <SheetTrigger className='md:hidden'>
    <Button variant="ghost" size="icon" className='md:hidden'>
    <Menu/>
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className='p-0'>
    <Sidebar apiLimitCount={apiLimitCount} isPro={isPro}/>
  </SheetContent>
  </Sheet>
  )
}
