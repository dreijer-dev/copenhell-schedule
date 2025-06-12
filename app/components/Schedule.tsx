'use client'

import { Epg, Layout, useEpg } from 'planby'
import React from 'react'
import { stages } from '../fixtures/stages'
import { events } from '../fixtures/events'

export function Schedule() {
  const {
    getEpgProps,
    getLayoutProps,
    onScrollToNow,
    onScrollLeft,
    onScrollRight,
  } = useEpg({
    epg: events,
    channels: stages,
    startDate: '2025-06-18T12:00:00',
  })

  return (
    <div style={{ height: '600px', width: '1200px' }}>
      <Epg {...getEpgProps()}>
        <Layout {...getLayoutProps()} />
      </Epg>
    </div>
  )
}
