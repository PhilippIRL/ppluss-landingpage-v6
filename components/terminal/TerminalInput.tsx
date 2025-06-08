import { ChangeEvent, FormEvent, KeyboardEvent, RefObject, useCallback, useEffect } from 'react'
import { TerminalDispatcher } from './terminalState'
import styles from './terminal.module.css'
import { focusField } from './terminalUtils'

export function TerminalInput({ typingText, dispatch, onSubmit, inputRef }: { typingText: string, dispatch: TerminalDispatcher, onSubmit: (e: FormEvent<HTMLFormElement>) => void, inputRef: RefObject<HTMLInputElement | null> }) {
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'TERMINAL_TYPING_TEXT_CHANGE', typingText: e.target.value })
    }, [dispatch])

    const keyComboHandler = useCallback((e: KeyboardEvent) => {
        if(e.ctrlKey && !e.metaKey && !e.altKey && e.code === 'KeyC') {
            e.preventDefault()
            
            dispatch({ type: 'TERMINAL_TYPING_CANCEL' })
        }
    }, [dispatch])

    const onInputBlur = useCallback(() => {
        focusField(inputRef.current)
    }, [inputRef])

    useEffect(() => {
        focusField(inputRef.current)
    }, [inputRef])

    return (
        <form className={styles.terminalInputForm} onSubmit={onSubmit}>
            <input type="text" ref={inputRef} onBlur={onInputBlur} onChange={onChange} onKeyDown={keyComboHandler} value={typingText} />
        </form>
    )
}
