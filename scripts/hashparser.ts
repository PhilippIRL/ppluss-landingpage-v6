type HashObject = {[key: string]: string | null};

export default function parseHash(hash=window.location.hash): HashObject {
    let obj: HashObject = {};
    let props = hash.substr(1).split("&");
    props.map(prop => prop.split("="))
        .forEach(([key, data]) => {
            if(key) {
                obj[decodeURIComponent(key)] = data === undefined ? null : decodeURIComponent(data);
            }
        });
    return obj;
}