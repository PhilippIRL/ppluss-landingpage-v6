import { createContext } from 'react'
import type EventBus from '../scripts/EventBus'

export const LangContext = createContext('en')
export const EventBusContext = createContext<EventBus | null>(null)
