import { useEffect, useState } from 'react'

declare global {
    interface Window {
        msgsocket: WebSocket
    }
}

export function initMsgSocket() {
    if(!window.msgsocket) {
        window.msgsocket = new WebSocket('wss://msgsocket.ppluss.de/ws')
    }
}

export function isSocketReady() {
    return Boolean(typeof window !== 'undefined' && window.msgsocket && window.msgsocket.readyState === WebSocket.OPEN)
}

export function sendMsgToSocket(field: string, content: string) {
    if(isSocketReady()) {
        const data = ['txt', field, content]
        const json = JSON.stringify(data)

        window.msgsocket.send(json)
    }
}

export function whenSocketIsReady(callback: () => void) {
    if(isSocketReady()) {
        callback()
    } else if(window.msgsocket && window.msgsocket.readyState === WebSocket.CONNECTING) {
        window.msgsocket.addEventListener('open', () => callback())
    } else if(!window.msgsocket) {
        window.msgsocket = new WebSocket('wss://msgsocket.ppluss.de/ws')
        window.msgsocket.addEventListener('open', () => callback())
    }
}

export function useSocketReadyness() {
    const [isReady, setIsReady] = useState<boolean>(false)

    useEffect(() => {
        if(isReady) {
            window.msgsocket.addEventListener('close', () => setIsReady(false))
        } else {
            whenSocketIsReady(() => setIsReady(true))
        }
    }, [isReady])

    return isReady
}
