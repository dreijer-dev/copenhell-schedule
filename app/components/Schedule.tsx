'use client'

import { Epg, Layout, useEpg } from 'planby'
import React, { useState } from 'react'
import { stages } from '../fixtures/stages'
import { events } from '../fixtures/events'
import { theme } from '../helpers/theme'
import { ChannelItem } from './ChannelItem'
import { DaySelector } from './DaySelector'

const getDefaultDate = () => {
  const today = new Date()
  const june18 = new Date('2025-06-18')

  return today >= june18 ? today.toISOString().split('T')[0] : '2025-06-18'
}

export function Schedule() {
  const [selectedDate, setSelectedDate] = useState(getDefaultDate())

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
    sidebarWidth: 175,
    theme,
  })

  return (
    <div className='flex flex-col gap-4  items-center'>
      <DaySelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      <div className='w-[1000px] md:w-[1200px] h-[800px]'>
        <Epg {...getEpgProps()}>
          <Layout
            {...getLayoutProps()}
            renderChannel={({ channel }) => (
              <ChannelItem key={channel.uuid} channel={channel} />
            )}
          />
        </Epg>
      </div>
    </div>
  )
}
