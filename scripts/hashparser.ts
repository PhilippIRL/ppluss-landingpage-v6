type HashObject = {[key: string]: string | null};

export default function parseHash(hash=window.location.hash): HashObject {
    const obj: HashObject = {}

    const props = hash.substring(1).split('&')
    props.map(prop => prop.split('='))
        .forEach(([key, data]) => {
            if(key) {
                obj[decodeURIComponent(key)] = data === undefined ? null : decodeURIComponent(data)
            }
        })
        
    return obj
}
