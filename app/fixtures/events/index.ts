import type { Event } from './types'
import { events as june18Events } from './june18'
import { events as june19Events } from './june19'
import { events as june20Events } from './june20'
import { events as june21Events } from './june21'

export const events: Event[] = [
  ...june18Events,
  ...june19Events,
  ...june20Events,
  ...june21Events,
]

export type { Event }
