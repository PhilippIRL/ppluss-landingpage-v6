import { Ref, useEffect, useRef } from 'react'
import styles from './terminal.module.css'
import { TerminalMode } from './terminalState'

export function TerminalContent({ lines, typingText, terminalMode }: { lines: string[], typingText: string, terminalMode: TerminalMode }) {
    const bottomRef = useRef<HTMLElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView()
    }, [typingText, bottomRef])

    return (
        <div className={styles.terminalLines}>
            {lines.map((line, index) => {
                const lastLine = index === lines.length - 1

                return (
                    <TerminalLine
                        lastLine={lastLine}
                        key={index}
                        line={lastLine ? line + typingText : line}
                        {...(lastLine ? { bottomRef } : {})}
                        />
                )
            })}
            {terminalMode === 'FORCE_COMMAND' ? (
                <>
                    <TerminalLine line="" />
                    <TerminalLine line="Press enter to run command" />
                </>
            ) : null}
        </div>
    )
}

function TerminalLine({ line, lastLine, bottomRef }: { line: string, lastLine?: boolean, bottomRef?: Ref<HTMLElement> }) {
    return (
        <span ref={bottomRef} className={styles.terminalLine}>
            {line}
            {lastLine ? <>
                <span className={styles.terminalCursor}>&#x2588;</span>
            </> : null}
        </span>
    )
}
