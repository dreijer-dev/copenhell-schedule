import React from 'react'
import { Schedule } from './components/Schedule'
import Image from 'next/image'

export default function Home() {
  return (
    <div
      className={`bg-black flex flex-col items-center gap-4 p-4 min-h-screen`}
    >
      <Image
        src='https://networksites.livenationinternational.com/networksites/40bntupx/logo-white-copenhell-2025-600px.png'
        alt='Copenhell Logo'
        width={300}
        height={75}
      />
      <h1 className='text-white text-center text-2xl md:text-4xl font-bold'>
        Copenhell Schedule 2025
      </h1>
      <Schedule />
      <footer className='text-white text-center text-sm'>
        Made by{' '}
        <a href='https://dreijer.io' className='text-red-600 underline'>
          Dreijer
        </a>{' '}
        with ✌️
        <br />
        Schedule scraped by Weidick
      </footer>
    </div>
  )
}
