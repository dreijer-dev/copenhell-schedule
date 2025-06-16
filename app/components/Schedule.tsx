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

type ViewMode = 'default' | 'smaller' | 'tiny'

export function Schedule() {
  const [selectedDate, setSelectedDate] = useState(getDefaultDate())
  const [viewMode, setViewMode] = useState<ViewMode>('default')
  const isMobile = useMediaQuery('(max-width: 768px)')

  const filteredEvents = events.filter(event =>
    event.since.startsWith(selectedDate)
  )

  const dayWidth =
    viewMode === 'tiny' ? 700 : viewMode === 'smaller' ? 1200 : 2000

  const { getEpgProps, getLayoutProps } = useEpg({
    epg: filteredEvents,
    channels: stages,
    startDate: `${selectedDate}T12:00:00`,
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
                : 'bg-gray-100 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Default
          </button>
          <button
            onClick={() => setViewMode('smaller')}
            className={`px-3 py-1 text-sm rounded ${
              viewMode === 'smaller'
                ? 'bg-[#dc2626] text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Smaller
          </button>
          <button
            onClick={() => setViewMode('tiny')}
            className={`px-3 py-1 text-sm rounded ${
              viewMode === 'tiny'
                ? 'bg-[#dc2626] text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Tiny
          </button>
        </div>
      </div>
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
