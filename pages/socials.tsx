import { getLang } from '../scripts/Lang'
import Header from '../components/header'
import Head from 'next/head'
import styled, { css, keyframes } from 'styled-components'
import { useContext, useState } from 'react'
import SocialCard from '../components/SocialCard'
import { LangContext } from '../scripts/Contexts'
import { motion } from 'framer-motion'
import type { Translation } from '../scripts/Lang' 

const socialsData = [
    {
        title: 'Twitter / X',
        text: '@PhilippIRL',
        color: '#1DA1F2',
        icon: '/assets/v6/socialmediaicons/twitter.svg',
        link: 'https://twitter.com/PhilippIRL'
    },
    {
        title: 'Twitter / X',
        text: '@ppspriv',
        color: '#1DA1F2',
        icon: '/assets/v6/socialmediaicons/twitter.svg',
        link: 'https://twitter.com/ppspriv'
    },
    {
        title: 'YouTube',
        text: '',
        color: '#ff0000',
        icon: '/assets/v6/socialmediaicons/youtube.svg',
        link: 'https://youtube.com/@philippirl'
    },
    {
        title: 'Instagram',
        text: '',
        color: '#5851db',
        icon: '/assets/v6/socialmediaicons/instagram.svg',
        link: 'https://instagram.com/philipp_irl'
    },
    {
        title: 'Discord',
        text: 'philippirl',
        color: '#7289da',
        icon: '/assets/v6/socialmediaicons/discord.svg',
        link: 'https://discord.com/users/221363184076980234'
    },
    {
        title: 'Discord',
        text: 'Just another guild',
        color: '#7289da',
        icon: '/assets/v6/socialmediaicons/discord.svg',
        link: 'https://discord.gg/BRJBhJj'
    },
    {
        title: 'Spotify',
        text: '',
        color: '#1db954',
        icon: '/assets/v6/socialmediaicons/spotify.svg',
        link: 'https://open.spotify.com/user/pplussmc'
    },
    {
        title: 'Matrix',
        text: '',
        color: '#0DBD8B',
        icon: '/assets/v6/socialmediaicons/matrix.svg',
        link: 'https://matrix.to/#/@philippirl:matrix.org'
    },
    //{
    //    title: 'Tellonym',
    //    text: '',
    //    color: '#ff1a88',
    //    icon: '/assets/v6/socialmediaicons/tellonym_square.png',
    //    link: 'https://tellonym.me/ppluss'
    //},
    {
        title: 'Telegram',
        text: '',
        color: '#0088cc',
        icon: '/assets/v6/socialmediaicons/telegram.svg',
        link: 'https://t.me/philippirl'
    },
    {
        title: 'Snapchat',
        text: '',
        color: '#fffc00',
        icon: '/assets/v6/socialmediaicons/snapchat.svg',
        link: 'https://www.snapchat.com/add/philippirl'
    },
    {
        title: 'Twitch',
        text: '',
        color: '#9146ff',
        icon: '/assets/v6/socialmediaicons/twitch.svg',
        link: 'https://twitch.tv/philipp_irl'
    },
    {
        title: 'Mastodon',
        text: 'chaos.social',
        color: '#657786',
        icon: '/assets/v6/socialmediaicons/mastodon.svg',
        link: 'https://chaos.social/@philippirl'
    },
    {
        title: 'Last.fm',
        text: '',
        color: '#d51007',
        icon: '/assets/v6/socialmediaicons/lastfm.svg',
        link: 'https://www.last.fm/user/PhilippIRL'
    },
    {
        title: 'GitHub',
        text: '',
        color: '#333',
        icon: '/assets/v6/socialmediaicons/github.svg',
        link: 'https://github.com/PhilippIRL'
    },
    //{
    //    title: 'GitLab',
    //    text: '',
    //    color: '#e24329',
    //    icon: '/assets/v6/socialmediaicons/gitlab.svg',
    //    link: 'https://gitlab.com/PhilippIRL'
    //},
    {
        title: 'TikTok',
        text: '',
        color: '#333',
        icon: '/assets/v6/socialmediaicons/tiktok.svg',
        link: 'https://www.tiktok.com/@pplussmc'
    },
    {
        title: 'Steam',
        text: '',
        color: '#1b2838',
        icon: '/assets/v6/socialmediaicons/steam.svg',
        link: 'https://steamcommunity.com/id/PhilippIRL/'
    },
    {
        title: 'Träwelling',
        text: '',
        color: '#c72730',
        icon: '/assets/v6/socialmediaicons/traewelling.svg',
        link: 'https://traewelling.de/@PhilippIRL'
    },
    {
        title: 'Reddit',
        text: '',
        color: '#ff4500',
        icon: '/assets/v6/socialmediaicons/reddit.svg',
        link: 'https://www.reddit.com/user/PplusS'
    },
]

const languageData = {
    de: {
        'socials.title': 'Socials',
    },
    en: {
        'socials.title': 'Socials',
    },
}

const getTranslation = getLang(languageData)

const AppRoot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: Inter, sans-serif;
    min-height: 100vh;
`

const SocialsContainer = styled(motion.div)`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow: visible;
    max-width: max(90%, 1200px);
    margin: 4rem 0;
    align-content: flex-start;
`

const UndecoratedLink = styled(motion.a)`
    color: #fff;
    text-decoration: none;
    margin: 10px;
`

const colorRotateAnim = keyframes`
    to {
        filter: hue-rotate(360deg);
    }
`

const SocialsTitle = styled.h1<{colorRotate: boolean}>`
    font-size: 5rem;
    color: #fff;
    ${(props) => props.colorRotate && css`
        color: #f00;
        animation: 3s ${colorRotateAnim} linear infinite;
    `}
`

function SocialsTitleView({t}: {t: Translation}) {
    const [colorRotate, setColorRotate] = useState(false)

    return <SocialsTitle onClick={() => setColorRotate(!colorRotate)} colorRotate={colorRotate}>{t('socials.title')}</SocialsTitle>
}

export default function Socials() {
    let lang = useContext(LangContext)
    const t = getTranslation(lang)

    const containerAnim = {
        hidden: {
            opacity: 1,
            scale: .0,
        },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
            },
            scale: 1,
        },
    }

    const itemAnim = {
        hidden: {
            scale: 0,
        },
        show: {
            scale: 1,
        },
    }

    return (
        <AppRoot>
            <Head>
                <title>{t('socials.title')}</title>
            </Head>
            <Header />
            <SocialsTitleView t={t} />
            <SocialsContainer variants={containerAnim} initial='hidden' animate='show'>
                {socialsData.map((data, index) => {
                    return (
                        <UndecoratedLink key={index} href={data.link} target={data.link.startsWith('https') ? '_blank' : ''} rel="noreferrer" variants={itemAnim}>
                            <SocialCard title={data.title} description={data.text} icon={data.icon} color={data.color} />
                        </UndecoratedLink>
                    )
                })}
            </SocialsContainer>
        </AppRoot>
    )
}
