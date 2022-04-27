import Head from "next/head"
import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { getLang } from "../scripts/Lang"
import type { Translation } from "../scripts/Lang"
import type { SyntheticEvent } from "react"
import Header from "./header"

const AppRoot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`

const InnerContent = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
`

const StatusCode = styled.span`
    position: fixed;
    right: -100px;
    pointer-events: none;
    top: -220px;
    opacity: .04;
    font-weight: bold;
    font-size: 500px;
    margin: 0;
    overflow: hidden;
    z-index: 0;
    @media screen and (max-width: 1000px) {
        font-size: 300px;
        top: -130px;
        right: -50px;
    }
    @media screen and (max-width: 600px) {
        font-size: 150px;
        top: initial;
        bottom: -20px;
        right: 15px;
    }
    @media screen and (max-width: 350px) {
        display: none;
    }
`

const StatusMessage = styled.span`
    font-weight: bold;
    font-size: 4.75rem;
    margin: 25px;
    text-align: center;
`

const Slogan = styled.span`
    font-size: 1.9rem;
    margin: 25px;
    text-align: center;
    color: #999;
`

const VideoPlayerFrame = styled.div`
    display: flex;
    background-color: #000;
    width: 712px;
    height: 400px;
    margin-top: 100px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    @media screen and (max-width: 800px) {
        display: none;
    }
`

const VideoPlayerBackdrop = styled.img`
    filter: brightness(0.4) blur(25px);
    position: absolute;
    z-index: 0;
    border-radius: 10px;
    width: 100%;
    z-index: 1;
`

const VideoPlayerOverlay = styled.a`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    flex-direction: column;
    gap: 25px;
    cursor: pointer;
    color: #fff;
    text-decoration: none;
`

const VideoPlayerTitle = styled.span`
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-left: 40px;
    margin-right: 40px;
`

const VideoPlayerSubtitle = styled.span`
    font-size: 22px;
    color: #999;
    text-align: center;
    margin-left: 40px;
    margin-right: 40px;
`

const ActualYouTubeFrame = styled.iframe`
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
`

const languageData = {
    de: {
        "errorpage.error.noslogan": "Kein Spruch gefunden :c",
        "errorpage.video.title": "Was andere für Erfahrungen mit Computern gemacht haben...",
        "errorpage.video.subtitle": "Klicke um das Video abzuspielen",
    },
    en: {
        "errorpage.error.noslogan": "No slogan was found :c",
        "errorpage.video.title": "What others have experienced with computers...",
        "errorpage.video.subtitle": "Click to play",
    },
}

const getTranslation = getLang(languageData);

export default function ErrorPage({statusCode, statusMessage, slogans, lang}: {
    statusCode: number,
    statusMessage: string,
    slogans: {
        [lang: string]: string[],
    },
    lang: string,
}) {
    const t = getTranslation(lang)

    let [currentSlogan, setCurrentSlogan] = useState("")

    useEffect(() => {
        let slogansToUse = slogans[lang] || slogans["en"] || []
        if(slogansToUse.length != 0) {
            let newSlogan = slogansToUse[Math.floor(Math.random() * slogansToUse.length)]
            setCurrentSlogan(newSlogan)
        } else {
            setCurrentSlogan(t("errorpage.error.noslogan"))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slogans, lang])

    return (
        <AppRoot>
            <Head>
                <title>{statusMessage}</title>
            </Head>
            <Header />
            <InnerContent>
                <StatusMessage>{statusMessage}</StatusMessage>
                <Slogan>{currentSlogan}</Slogan>
                <VideoPlayer t={t} />
            </InnerContent>
            <StatusCode>{statusCode}</StatusCode>
        </AppRoot>
    )

}

const Videos = ["ZhK2hZvN3l8","BzczL7sSbDg","o4zJrsIpY3I","vjd732kSeHs","uqkGfinCFs0","QaveVba4Svg"]

function VideoPlayer({t}: {t: Translation}) {

    let [enabled, setEnabled] = useState(false)
    let [videoId, setVideoId] = useState("dQw4w9WgXcQ")

    useEffect(() => {
        setVideoId(Videos[Math.floor(Math.random() * Videos.length)])
    }, [])

    const activatePlayer = (e: SyntheticEvent) => {
        e.preventDefault()
        setEnabled(true)
    }

    if(enabled) {
        return (
            <VideoPlayerFrame>
                <ActualYouTubeFrame src={`https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1&mute=1&rel=0`} allow="autoplay; fullscreen"></ActualYouTubeFrame>
            </VideoPlayerFrame>
        )
    } else {
        return (
            <VideoPlayerFrame>
                <VideoPlayerBackdrop src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}></VideoPlayerBackdrop>
                <VideoPlayerOverlay href={`https://youtu.be/${videoId}`} onClick={activatePlayer} target="_blank" rel="noopener">
                    <VideoPlayerTitle>{t("errorpage.video.title")}</VideoPlayerTitle>
                    <VideoPlayerSubtitle>{t("errorpage.video.subtitle")}</VideoPlayerSubtitle>
                </VideoPlayerOverlay>
            </VideoPlayerFrame>
        )
    }
}