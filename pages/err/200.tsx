import ErrorPage from '../../components/ErrorPage'

const slogans = {
    de: ['Diese Meldung solle eigentlich nie vorkommen, weird...'],
    en: ['This message should never appear although you are seeing it, weird...'],
}

export default function Error200Page({lang}: {lang: string}) {
    return <ErrorPage lang={lang} statusCode={200} statusMessage={'200 OK'} slogans={slogans} />
}
