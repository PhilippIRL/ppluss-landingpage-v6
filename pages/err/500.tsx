import ErrorPage from '../../components/ErrorPage'

const slogans = {
    de: ['Das sollte nicht passieren :/', '*duckt sich*'],
    en: ['This should not have happend :/', '*ducking*'],
}

export default function Error500Page({lang}: {lang: string}) {
    return <ErrorPage lang={lang} statusCode={500} statusMessage={'500 Internal Server Error'} slogans={slogans} />
}
