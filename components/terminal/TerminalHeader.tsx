import { useEffect, useRef } from 'react'
import styles from './terminal.module.css'
import { TerminalDispatcher } from './terminalState'

export function TerminalHeader({ dispatch }: { dispatch: TerminalDispatcher }) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(ref.current !== null) {
            const node = ref.current
            
            let dragging = false

            const upHandler = (_e: PointerEvent) => {
                dragging = false
            }

            const downHandler = (e: PointerEvent) => {
                e.preventDefault()

                dragging = true
            }

            const moveHandler = (e: PointerEvent) => {
                if(dragging) {
                    e.preventDefault()

                    dispatch({ type: 'TERMINAL_RESIZE', heightChange: e.movementY })
                }
            }
            
            node.addEventListener('pointerdown', downHandler)
            window.addEventListener('pointerup', upHandler)
            window.addEventListener('pointermove', moveHandler)

            return () => {
                node.removeEventListener('pointerdown', downHandler)
                window.removeEventListener('pointerup', upHandler)
                window.removeEventListener('pointermove', moveHandler)
            }
        }
    }, [ref, dispatch])

    return (
        <div ref={ref} className={styles.terminalHeader}>
            <div className={styles.terminalResizePill}></div>
            <button className={styles.terminalCloseButton} onClick={() => dispatch({ type: 'TERMINAL_SET_OPEN', openState: 'CLOSING' })}>
                <svg viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
            </button>
        </div>
    )
}
