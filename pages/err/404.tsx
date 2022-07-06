import ErrorPage from '../../components/ErrorPage'

const slogans = {
    de: ['Uff.', 'Hier ist nichts', 'Ziemlich leer hier...', 'Nutzer:innen, die sich vertippt haben += 1'],
    en: ['oof.', 'There is nothing here', 'Really empty here...', 'Users that mistyped something += 1'],
}

export default function Error404Page({lang}: {lang: string}) {
    return <ErrorPage lang={lang} statusCode={404} statusMessage={'404 Not Found'} slogans={slogans} />
}
