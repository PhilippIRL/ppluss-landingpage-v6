import { useState } from 'react'

export function useHoverListener(): [boolean, {[key: string]: () => void}] {
    const [hovering, setHovering] = useState(false)

    const eventHandlers = {
        onMouseEnter: () => setHovering(true),
        onMouseLeave: () => setHovering(false),
        onTouchStart: () => setHovering(true),
        onTouchCancel: () => setHovering(false),
        onTouchEnd: () => setHovering(false),
    }

    return [hovering, eventHandlers]
}
