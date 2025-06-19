'use client'

import { Epg, Layout, useEpg } from 'planby'
import React, { useState } from 'react'
import { stages } from '../fixtures/stages'
import { events } from '../fixtures/events'
import { theme } from '../styles/theme'
import { ChannelItem } from './ChannelItem'
import { DaySelector } from './DaySelector'
import { Program } from './Program'
import { useMediaQuery } from '../hooks/useMediaQuery'

const getDefaultDate = () => {
  const today = new Date()
  const june18 = new Date('2025-06-18')

  return today >= june18 ? today.toISOString().split('T')[0] : '2025-06-18'
}

type ViewMode = 'default' | 'smaller'

export function Schedule() {
  const [selectedDate, setSelectedDate] = useState(getDefaultDate())
  const [viewMode, setViewMode] = useState<ViewMode>('default')
  const isMobile = useMediaQuery('(max-width: 768px)')

  const filteredEvents = events.filter(event =>
    event.since.startsWith(selectedDate)
  )

  const dayWidth = viewMode === 'smaller' ? 1200 : 2000

  const { getEpgProps, getLayoutProps } = useEpg({
    epg: filteredEvents,
    channels: stages,
    startDate: `${selectedDate}T10:00:00.000Z`,
    itemHeight: 75,
    isLine: true,
    dayWidth,
    sidebarWidth: isMobile ? undefined : 175,
    theme,
  })

  return (
    <div className='w-full flex flex-col gap-y-4 mt-8 items-center'>
      <DaySelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      <div className='flex flex-col items-center'>
        <span className='text-sm font-medium text-white'>Size:</span>
        <div className='flex items-center gap-2 mb-4'>
          <button
            onClick={() => setViewMode('default')}
            className={`px-3 py-1 text-sm rounded ${
              viewMode === 'default'
                ? 'bg-[#dc2626] text-white'
                : 'bg-gray-800 text-white hover:bg-gray-300'
            }`}
          >
            Default
          </button>
          <button
            onClick={() => setViewMode('smaller')}
            className={`px-3 py-1 text-sm rounded ${
              viewMode === 'smaller'
                ? 'bg-[#dc2626] text-white'
                : 'bg-gray-800 text-white hover:bg-gray-300'
            }`}
          >
            Smaller
          </button>
        </div>
      </div>
      <p className='text-white p-2 border-red-600 border font-sans text-sm'>
        NB! End times are not accurate (not provided by the festival)
      </p>
      <div className='w-full'>
        <Epg {...getEpgProps()}>
          <Layout
            {...getLayoutProps()}
            renderProgram={({ program, ...rest }) => (
              <Program key={program.data.id} program={program} {...rest} />
            )}
            renderChannel={({ channel }) => (
              <ChannelItem key={channel.uuid} channel={channel} />
            )}
          />
        </Epg>
      </div>
    </div>
  )
}
