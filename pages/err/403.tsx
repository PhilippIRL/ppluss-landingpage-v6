import ErrorPage from "../../components/ErrorPage"

const slogans = {
    de: ["Böse!", "Nix browseable!", "Zugriff gesperrt! Unsere Administrator:innen wurden benachrichtigt."],
    en: ["Evil!", "Non-browseable!", "Access denied! Our administrators were notified."],
}

export default function Error403Page({lang}: {lang: string}) {
    return <ErrorPage lang={lang} statusCode={403} statusMessage={"403 Forbidden"} slogans={slogans} />
}
