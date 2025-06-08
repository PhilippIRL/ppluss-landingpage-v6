import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type EventBus from '../scripts/EventBus'

export default function Terminal({eventBus}: {eventBus: EventBus}) {

    let router = useRouter()

    useEffect(() => {
        setTimeout(() => eventBus.post({id: 'TERMINAL_FORCE'}), 200)
        router.replace('/')
    }, [eventBus, router])

    return (
        <>
            <span>Redirecting...</span>
            <noscript>
                <h1>Enable Javascript!</h1>
            </noscript>
        </>
    )

}
