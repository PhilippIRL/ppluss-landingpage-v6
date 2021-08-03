import ErrorPage from "../../components/ErrorPage"

const slogans = {
    de: ["same", "xd"],
    en: ["same", "xd"],
}

export default function Error418Page({lang}: {lang: string}) {
    return <ErrorPage lang={lang} statusCode={418} statusMessage={"418 I'm a teapot"} slogans={slogans} />
}
