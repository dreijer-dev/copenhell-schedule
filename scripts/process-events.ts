import fs from 'node:fs'
import path from 'node:path'

type SourceEvent = {
  date: string
  artist: string
  stage: string
  description: string
  img: string
}

type ProcessedEvent = {
  channelUuid: string
  description: string
  id: string
  image: string
  since: string
  till: string
  title: string
}

// Stage to UUID mapping
export const stageToUuid: Record<string, string> = {
  GEHENNA: 'gehenna-uuid',
  HELVÍTI: 'helviti-uuid',
  PANDÆMONIUM: 'pandaemonium-uuid',
  HADES: 'hades-uuid',
  BIERGARTEN: 'biergarten-uuid',
  BONEYARD: 'boneyard-uuid',
  'COPENHELL CON': 'copenhell-con-uuid',
  UDGAARD: 'udgaard-uuid',
  'MOBIL SCENE': 'mobil-scene-uuid',
}

// Read source data
const sourceData = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), 'app', 'fixtures', 'copenhell_program.json'),
    'utf-8'
  )
) as SourceEvent[]

// Sort events by date and stage for processing
sourceData.sort((a, b) => {
  const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime()
  if (dateCompare === 0) {
    return a.stage.localeCompare(b.stage)
  }
  return dateCompare
})

// Group events by stage
const eventsByStage = sourceData.reduce<Record<string, SourceEvent[]>>(
  (acc, event) => {
    if (!acc[event.stage]) {
      acc[event.stage] = []
    }
    acc[event.stage].push(event)
    return acc
  },
  {}
)

// Process events with dynamic end times
let eventId = 4 // Starting from event-4 as per history
const processedEvents: ProcessedEvent[] = []

Object.entries(eventsByStage).forEach(([stage, events]) => {
  events.forEach((event, index) => {
    const startDate = new Date(event.date)
    let endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // Default 2 hours

    // If there's a next event on this stage, adjust end time
    if (index < events.length - 1) {
      const nextEvent = events[index + 1]
      const nextStartDate = new Date(nextEvent.date)

      // If next event starts before our default end time, end 5 minutes before next event
      if (nextStartDate < endDate) {
        endDate = new Date(nextStartDate.getTime() - 5 * 60000) // Subtract 5 minutes
      }
    }

    processedEvents.push({
      channelUuid: stageToUuid[stage],
      description: event.description,
      id: `event-${eventId++}`,
      image: event.img,
      since: startDate.toISOString(),
      till: endDate.toISOString(),
      title: event.artist,
    })
  })
})

// Sort all events by date for final output
processedEvents.sort(
  (a, b) => new Date(a.since).getTime() - new Date(b.since).getTime()
)

// Group events by day
const eventsByDay = processedEvents.reduce<Record<string, ProcessedEvent[]>>(
  (acc, event) => {
    const day = event.since.split('T')[0]
    if (!acc[day]) {
      acc[day] = []
    }
    acc[day].push(event)
    return acc
  },
  {}
)

// Ensure output directories exist
const fixturesDir = path.join(process.cwd(), 'app', 'fixtures')
const eventsDir = path.join(fixturesDir, 'events')
if (!fs.existsSync(eventsDir)) {
  fs.mkdirSync(eventsDir)
}

// Write day files
Object.entries(eventsByDay).forEach(([day, events]) => {
  const dayName = day.split('-')[2] // Get the day number
  const content = `import type { Event } from './types'

export const events: Event[] = ${JSON.stringify(events, null, 2)}
`
  fs.writeFileSync(path.join(eventsDir, `june${dayName}.ts`), content)
})

// Create index file to export all days
const indexContent = `import type { Event } from './types'
import { events as june18Events } from './june18'
import { events as june19Events } from './june19'
import { events as june20Events } from './june20'
import { events as june21Events } from './june21'

export const events: Event[] = [
  ...june18Events,
  ...june19Events,
  ...june20Events,
  ...june21Events
]

export type { Event }
`
fs.writeFileSync(path.join(eventsDir, 'index.ts'), indexContent)

// Create types file
const typesContent = `type Event = {
  channelUuid: string
  description: string
  id: string
  image: string
  since: string
  till: string
  title: string
}

export type { Event }
`
fs.writeFileSync(path.join(eventsDir, 'types.ts'), typesContent)

console.log('Events processing completed!')
