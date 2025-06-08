type HashObject = { [key: string]: string }

export default function parseHash(hash=window.location.hash): HashObject {
    const params = new URLSearchParams(hash.substring(1))
        
    return Object.fromEntries(params)
}
