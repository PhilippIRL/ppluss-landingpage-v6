import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type EventBus from '../scripts/EventBus'

export default function Terminal({eventBus}: {eventBus: EventBus}) {

    let router = useRouter()

    useEffect(() => {
        eventBus.post({id: 'TERMINAL_FORCE'})
        router.replace('/')
    }, [])

    return (
        <>
            <span>Redirecting...</span>
            <noscript>
                <h1>Enable Javascript!</h1>
            </noscript>
        </>
    )

}
