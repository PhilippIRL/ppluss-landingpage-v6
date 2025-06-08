import { useEffect } from 'react'
import EventBus, { BusEvent } from '../../scripts/EventBus'
import { TerminalDispatcher } from './terminalState'

export function TerminalEventBusConnector({ eventBus, dispatch }: { eventBus: EventBus, dispatch: TerminalDispatcher }) {
    useEffect(() => {
        const listener = (e: BusEvent) => {
            switch(e.id) {
                case 'TERMINAL_TOGGLE':
                    dispatch({ type: 'TERMINAL_TOGGLE' })
                    return

                case 'TERMINAL_FORCE':
                    dispatch({ type: 'TERMINAL_SET_OPEN', openState: 'OPEN' })
                    return
                
                case 'TERMINAL_FORCE_COMMAND':
                    dispatch({ type: 'TERMINAL_SET_OPEN', openState: 'OPEN' })
                    dispatch({ type: 'TERMINAL_ENABLE_FORCE_COMMAND', command: e.data })
                    return
            }
        }

        eventBus.attach(listener)
        return () => eventBus.detach(listener)
    }, [eventBus, dispatch])

    return null
}
