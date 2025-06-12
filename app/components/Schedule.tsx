'use client'

import { Epg, Layout, useEpg } from 'planby'
import React from 'react'
import { stages } from '../fixtures/stages'
import { events } from '../fixtures/events'

export function Schedule() {
  const { getEpgProps, getLayoutProps } = useEpg({
    epg: events,
    channels: stages,
    startDate: '2025-06-20T12:00:00',
    itemHeight: 50,
  })

  return (
    <div style={{ height: '600px', width: '1200px' }}>
      <Epg {...getEpgProps()}>
        <Layout {...getLayoutProps()} />
      </Epg>
    </div>
  )
}
