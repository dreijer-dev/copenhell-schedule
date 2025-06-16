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

export function Schedule() {
  const [selectedDate, setSelectedDate] = useState(getDefaultDate())
  const isMobile = useMediaQuery('(max-width: 768px)')

  const filteredEvents = events.filter(event =>
    event.since.startsWith(selectedDate)
  )

  const { getEpgProps, getLayoutProps } = useEpg({
    epg: filteredEvents,
    channels: stages,
    startDate: `${selectedDate}T12:00:00`,
    itemHeight: 75,
    isLine: true,
    dayWidth: 2000,
    sidebarWidth: isMobile ? undefined : 175,
    theme,
  })

  return (
    <div className='w-full flex flex-col gap-y-4 mt-8 items-center'>
      <DaySelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />
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
