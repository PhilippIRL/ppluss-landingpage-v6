import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Hub() {

    let router = useRouter()

    useEffect(() => {
        router.replace('/socials')
    })

    return (
        <>
            <span>Redirecting...</span>
        </>
    )

}
