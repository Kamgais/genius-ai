import { LandingContent } from '@/components/landing-content'
import { LandingHero } from '@/components/landing-hero'
import { LandingNavbar } from '@/components/landing-navbar'
import React from 'react'

export default function LandingPage() {
  return (
   <div className='h-full'>
    <LandingNavbar/>
    <LandingHero/>
    <LandingContent/>
   </div>
  )
}
