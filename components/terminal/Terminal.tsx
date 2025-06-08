import styles from './terminal.module.css'
import { CSSProperties, FormEvent, useCallback, useRef } from 'react'
import { TerminalDispatcher, TerminalState, useTerminalState } from './terminalState'
import { handleCommand } from './terminalCommands'
import EventBus from '../../scripts/EventBus'
import { TerminalEventBusConnector } from './TerminalEventBusConnector'
import { TerminalInput } from './TerminalInput'
import { TerminalHeader } from './TerminalHeader'
import { TerminalContent } from './TerminalContent'
import { focusField } from './terminalUtils'

export default function TerminalWrapper({eventBus}: {eventBus: EventBus}) {
    const [terminalState, dispatch] = useTerminalState()
    
    return (
        <>
            { terminalState.openState !== 'CLOSED' ? <Terminal state={terminalState} dispatch={dispatch} eventBus={eventBus!} /> : null }
            <TerminalEventBusConnector eventBus={eventBus} dispatch={dispatch} />
        </>
    )
}

function Terminal({ state, dispatch, eventBus }: { state: TerminalState, dispatch: TerminalDispatcher, eventBus: EventBus }) {
    const inputRef = useRef<HTMLInputElement>(null)

    const rootClassName = [
        styles.terminalRoot,
        state.openState === 'OPENING' ? styles.terminalRootOpening : null,
        state.openState === 'CLOSING' ? styles.terminalRootClosing : null,
    ].filter(className => className !== null).join(' ')

    const onRunCommand = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        handleCommand(state, dispatch, eventBus)
    }, [eventBus, state, dispatch])

    return (
        <div className={rootClassName} style={{'--terminal-height': state.height + 'px'} as CSSProperties} onClick={() => focusField(inputRef.current)}>
            <TerminalHeader dispatch={dispatch} />
            <TerminalContent lines={state.lines} typingText={state.typingText} terminalMode={state.mode} />
            <TerminalInput typingText={state.typingText} dispatch={dispatch} onSubmit={onRunCommand} inputRef={inputRef} />
        </div>
    )
}
