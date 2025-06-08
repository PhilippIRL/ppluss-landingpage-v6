import { ActionDispatch, useEffect, useReducer } from 'react'
import { getBrandString, SHELL_PROMPT } from './terminalUtils'

export type OpenState = 'OPEN' | 'CLOSING' | 'CLOSED' | 'OPENING'
export type TerminalMode = 'INTERACTIVE' | 'FORCE_COMMAND'

export type TerminalState = {
    openState: OpenState,
    mode: TerminalMode,
    lines: string[],
    height: number,
    typingText: string,
    currentHistoryEntry: string,
    commandHistory: string[],
    historyPosition: number,
}

export type TerminalAction = { type: 'TERMINAL_TOGGLE' }
    | { type: 'TERMINAL_SET_OPEN', openState: OpenState }
    | { type: 'TERMINAL_ANIM_COMPLETE', fromState: OpenState }
    | { type: 'TERMINAL_RESIZE', heightChange: number }
    | { type: 'TERMINAL_TYPING_TEXT_CHANGE', typingText: string }
    | { type: 'TERMINAL_CLEAR' }
    | { type: 'TERMINAL_PRINTLN', text: string }
    | { type: 'TERMINAL_COMMAND_PREPROCESS' }
    | { type: 'TERMINAL_HISTORY_SCROLL', direction: 'UP' | 'DOWN' }
    | { type: 'TERMINAL_ENABLE_FORCE_COMMAND', command: string }
    | { type: 'TERMINAL_TYPING_CANCEL' }
    | { type: 'TERMINAL_SET_HEIGHT', height: number }

export type TerminalDispatcher = ActionDispatch<[TerminalAction]>

function getInitialState(): TerminalState {
    return {
        openState: 'CLOSED',
        mode: 'INTERACTIVE',
        lines: [
            getBrandString(),
            '',
            SHELL_PROMPT,
        ],
        height: 400,
        typingText: '',
        currentHistoryEntry: '',
        commandHistory: [''],
        historyPosition: 0,
    }
}

const TOGGLE_NEXT_STATES = {
    'OPEN': 'CLOSING',
    'CLOSED': 'OPENING',

    'CLOSING': 'OPENING',
    'OPENING': 'CLOSING',
}

function TerminalReducer(oldState: TerminalState, action: TerminalAction): TerminalState {
    switch(action.type) {
        case 'TERMINAL_TOGGLE':
            return { ...oldState, openState: TOGGLE_NEXT_STATES[oldState.openState] as OpenState }

        case 'TERMINAL_SET_OPEN':
            return { ...oldState, openState: action.openState }

        case 'TERMINAL_ANIM_COMPLETE':
            if(action.fromState === 'CLOSING' && oldState.openState === 'CLOSING') {
                return { ...oldState, openState: 'CLOSED' }
            } else if(action.fromState === 'OPENING' && oldState.openState === 'OPENING') {
                return { ...oldState, openState: 'OPEN' }
            } else {
                return { ...oldState }
            }
        
        case 'TERMINAL_RESIZE':
            if(((oldState.height - action.heightChange) < 300 && action.heightChange > 0) ||
                ((oldState.height - action.heightChange) > window.innerHeight - 50 && action.heightChange < 0)) {
                return { ...oldState }
            }

            return { ...oldState, height: oldState.height - action.heightChange }

        case 'TERMINAL_SET_HEIGHT':
            return { ...oldState, height: action.height }

        case 'TERMINAL_TYPING_TEXT_CHANGE':
            if(oldState.mode === 'INTERACTIVE') {
                return { ...oldState, historyPosition: 0, typingText: action.typingText }
            } else {
                return { ...oldState }
            }
            
        case 'TERMINAL_CLEAR':
            return { ...oldState, lines: [] }

        case 'TERMINAL_PRINTLN':
            return { ...oldState, lines: [ ...oldState.lines, action.text ]}

        case 'TERMINAL_COMMAND_PREPROCESS':
            return {
                ...oldState,
                mode: 'INTERACTIVE',
                lines: [
                    ...oldState.lines.slice(0, oldState.lines.length - 1),
                    oldState.lines[oldState.lines.length - 1] + oldState.typingText,
                ],
                commandHistory: [
                    oldState.typingText,
                    ...oldState.commandHistory,
                ],
                historyPosition: 0,
                typingText: '',
            }

        case 'TERMINAL_ENABLE_FORCE_COMMAND':
            return { ...oldState, mode: 'FORCE_COMMAND', typingText: action.command, historyPosition: 0 }

        case 'TERMINAL_HISTORY_SCROLL':
            if(oldState.mode === 'INTERACTIVE') {
                let historyPosition = oldState.historyPosition

                if(action.direction === 'UP' && oldState.historyPosition < oldState.commandHistory.length - 1) {
                    historyPosition += 1
                } else if(action.direction === 'DOWN' && oldState.historyPosition > 0) {
                    historyPosition -= 1
                }

                return {
                    ...oldState,
                    currentHistoryEntry: oldState.historyPosition === 0 ? oldState.typingText : oldState.currentHistoryEntry,
                    historyPosition,
                    typingText: [oldState.currentHistoryEntry, ...oldState.commandHistory][historyPosition]
                }
            } else {
                return { ...oldState }
            }
        
        case 'TERMINAL_TYPING_CANCEL':
            if(oldState.mode === 'INTERACTIVE') {
                return {
                    ...oldState,
                    typingText: '',
                    lines: [
                        ...oldState.lines.slice(0, oldState.lines.length - 1),
                        oldState.lines[oldState.lines.length - 1] + oldState.typingText + '^C',
                        SHELL_PROMPT,
                    ],
                    historyPosition: 0,
                }
            } else {
                return { ...oldState }
            }

        default:
            return { ...oldState }
    }
}

export function useTerminalState(): [TerminalState, TerminalDispatcher] {
    const [state, dispatch] = useReducer<TerminalState, [TerminalAction]>(TerminalReducer, getInitialState())

    useEffect(() => {
        const keyboardHandler = (e: KeyboardEvent) => {
            if(e.altKey && e.code === 'KeyT') {
                e.preventDefault()

                dispatch({ type: 'TERMINAL_TOGGLE' })
            } else if(!e.altKey && !e.ctrlKey && !e.metaKey && e.code === 'ArrowUp') {
                e.preventDefault()

                dispatch({ type: 'TERMINAL_HISTORY_SCROLL', direction: 'UP' })
            } else if(!e.altKey && !e.ctrlKey && !e.metaKey && e.code === 'ArrowDown') {
                e.preventDefault()

                dispatch({ type: 'TERMINAL_HISTORY_SCROLL', direction: 'DOWN' })
            }
        }

        const resizeHandler = () => {
            if(window.innerHeight - 40 < state.height) {
                dispatch({ type: 'TERMINAL_SET_HEIGHT', height: window.innerHeight - 40 })
            }
        }

        window.addEventListener('keydown', keyboardHandler)
        window.addEventListener('resize', resizeHandler)
        return () => {
            window.removeEventListener('keydown', keyboardHandler)
            window.removeEventListener('resize', resizeHandler)
        }
    }, [dispatch, state.height])

    useEffect(() => {
        if(state.openState === 'CLOSING' || state.openState === 'OPENING') {
            const fromState = state.openState

            setTimeout(() => {
                dispatch({ type: 'TERMINAL_ANIM_COMPLETE', fromState })
            }, 300)
        }
    }, [state.openState])

    return [state, dispatch]
}
