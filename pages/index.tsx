import styled, { createGlobalStyle } from 'styled-components'
import Link from 'next/link'
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { EventBusContext, LangContext } from '../scripts/Contexts'
import type { SyntheticEvent } from 'react'
import { getLang } from '../scripts/Lang'
import type { Translation } from '../scripts/Lang'

const socialsData = [
    {
        title: 'Twitter',
        icon: '/assets/v6/socialmediaicons/twitter.svg',
        link: 'https://twitter.com/PhilippIRL'
    },
    {
        title: 'Matrix',
        icon: '/assets/v6/socialmediaicons/matrix.svg',
        link: 'https://matrix.to/#/@philippirl:matrix.org'
    },
    {
        title: 'Discord',
        icon: '/assets/v6/socialmediaicons/discord.svg',
        link: 'https://discord.gg/BRJBhJj'
    },
];

const translations = {
    de: {
        'home.title': 'Hey,',
        'home.subtitle': 'ich bin Philipp!',
        'home.description': 'So ein {age} jähriger {hobby}',
        'home.hobby.0': 'Webentwickler',
        'home.hobby.1': 'Zugfan',
        'home.hobby.2': 'Politikinteressierter',
        'home.projects.title': 'Projekte',
        'home.projects.rainbowice.title': 'Wo ist der Regenbogen-ICE?',
        'home.projects.rainbowice.subtitle': 'Tracke den Regenbogen-ICE und andere ICEs',
        'home.projects.randomstuff.title': 'Random Stuff',
        'home.projects.randomstuff.subtitle': 'Kleinere Random Code-Projekte',
        'home.contact.before': 'Gerne kannst du mich auch ',
        'home.contact.text': 'kontaktieren',
        'home.contact.after': '.',
    },
    en: {
        'home.title': 'Hey,',
        'home.subtitle': 'I\'m Philipp!',
        'home.description': 'Just another {age}yo {hobby}',
        'home.hobby.0': 'web developer',
        'home.hobby.1': 'railway fan',
        'home.hobby.2': 'person interested in politics',
        'home.projects.title': 'Projects',
        'home.projects.rainbowice.title': 'Where\'s the Rainbow ICE?',
        'home.projects.rainbowice.subtitle': 'Track the rainbow ICE and other ICE trains',
        'home.projects.randomstuff.title': 'Random stuff',
        'home.projects.randomstuff.subtitle': 'Some small random code projects',
        'home.contact.before': 'Feel free to ',
        'home.contact.text': 'contact me',
        'home.contact.after': '.',
    },
}

const GlobalStyles: any = createGlobalStyle`
    html {
        font-size: 85%;
        background-color: #111;
    }

    @media only screen and (max-width: 1200px) {
        html {
            font-size: 65%;
        }
    }

    @media only screen and (max-width: 1000px) {
        html {
            font-size: 55%;
        }
    }

    @media only screen and (max-width: 900px) {
        html {
            font-size: 45%;
        }
    }
`

const AppRoot = styled.div`
    min-height: 100vh;
    background-color: #000;
    background: linear-gradient(100deg, #111 0%, #000 100%);
    font-family: Inter, sans-serif;

    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
`

const Page = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    flex-direction: column;

    width: 100%;
    box-sizing: border-box;
    max-width: 1600px;
    padding: 0 5rem;
`

const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    min-height: 100vh;
`

const TopHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-top: 8rem;

    width: 100%;

    @media only screen and (max-width: 800px) {
        flex-direction: column-reverse;
        padding-top: 8rem;
    }
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
`

const Logo = styled.img`
    height: 20rem;

    @media only screen and (max-width: 800px) {
        height: 100px;
        margin-bottom: 4rem; /* safari mag flex gap nicht so */
    }
`

const Title = styled.h1`
    font-size: 7rem;
    margin: 0;
`

const Subtitle = styled(Title)`
    color: #777;
`

const DescriptionText = styled.h2`
    color: #777;
    font-size: 4rem;

    align-self: flex-start;
`

const SocialsBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2.5rem;

    margin: 10rem 0 2rem 0;
`

const SocialsIcon = styled.img`
    width: 6rem;

    transition: transform .1s;
    :hover {
        transform: scale(1.1);
    }
`

const ProjectsTitle = styled.h1`
    font-size: 6rem;
    margin: 16rem 0 0 0;
    align-self: flex-start;
`

const Project = styled.div`
    margin: 6rem 0;
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 100%;

    ::after {
        content: '';
        position: absolute;
        top: 4.5rem;
        width: 100vw;
        height: 3px;
        background-color: #fff;
    }
`

const ProjectLeft = styled(Project)`
    align-self: flex-start;

    ::after {
        right: calc(100% + 3rem);
    }
`

const ProjectRight = styled(Project)`
    align-self: flex-end;

    ::after {
        left: calc(100% + 3rem);
    }
`

const ProjectTitle = styled.h2`
    font-size: 3.75rem;

    margin: 0;
    margin-bottom: 1rem;
`

const ProjectSubtitle = styled.h3`
    font-size: 2rem;
    color: #777;

    margin: 0;
`

const ProjectGallery = styled.div`
    display: flex;
    margin-top: 2rem;
    overflow-x: auto;
    overflow-y: hidden;
    margin-left: -5rem;
    padding-left: 5rem;
    width: calc(100% + 5rem);
`

const ProjectImage = styled.img`
    border-radius: 30px;
    height: 400px;
    margin-right: 5rem;
`

const UndecoredLink = styled.a`
    text-decoration: inherit;
    color: inherit;
`

const Punchline = styled.span`
    font-size: 4rem;
    margin: 12rem 0;
    align-self: flex-start;
    font-weight: bold;
`

const DecoredLink = styled(UndecoredLink)`
    border-bottom: 4px solid white;
`

const SocialLink = styled.a`
    display: flex;
`

const Footer = styled.footer`
    width: 100vw;
    display: flex;
    padding: .5rem;
    justify-content: flex-end;
`

const FooterIcon = styled.img`
    height: 4rem;
    margin-right: 1rem;
`

function useAge() {
    const [age, setAge] = useState(0)

    useEffect(() => {
        const birthday = [26, 8, 2003];
        const dateObj = new Date();
        let age = dateObj.getFullYear() - birthday[2];
        const hasHadBD = (dateObj.getMonth() >= birthday[1]) || (dateObj.getMonth() == (birthday[1] - 1) && dateObj.getDate() >= birthday[0]);
        if(!hasHadBD) age--;
        setAge(age);
    }, []);

    return age
}

const hobbyCount = 3

function useRandomHobby(t: Translation) {
    const [hobby, setHobby] = useState('...')

    useEffect(() => {
        setHobby(t('home.hobby.' + Math.floor(hobbyCount * Math.random())))
    }, [t])

    return hobby
}

const getTranslation = getLang(translations)

export default function Home({}) {
    const lang = useContext(LangContext)
    const eventBus = useContext(EventBusContext)

    const t = getTranslation(lang)

    function openTerminal(e: SyntheticEvent) {
        e.preventDefault()
        eventBus!.post({id: 'TERMINAL_TOGGLE'})
    }

    const age = useAge()
    const hobby = useRandomHobby(t)

    return (
        <AppRoot>
            <GlobalStyles />
            <Head>
                <title>ppluss.de</title>
                <meta name='description' content='Willkommen bei PplusS! Dies ist meine Webseite auf der ich, naja Text stehen hab und so... Und ich verlinke meine Social Media-Accounts!'></meta>
            </Head>
            <Page>
                <Header>
                    <TopHeader>
                        <TitleContainer as='h1'>
                            <Title as='span'>{t('home.title')}</Title>
                            <Subtitle as='span'>{t('home.subtitle')}</Subtitle>
                        </TitleContainer>
                        <Logo src='/logo.png' />
                    </TopHeader>
                    <DescriptionText>{t('home.description').replace('{age}', String(age || '...')).replace('{hobby}', hobby)}</DescriptionText>
                    <SocialsBar>
                        {socialsData.map(data => (
                        <Link href={data.link} key={data.title} passHref>
                            <SocialLink target='_blank'>
                                <SocialsIcon src={data.icon} />
                            </SocialLink>
                        </Link>
                        ))}
                        <Link href='/socials/' passHref>
                            <SocialLink>
                                <SocialsIcon src='/assets/v6/socialmediaicons/arrow.svg' />
                            </SocialLink>
                        </Link>
                    </SocialsBar>
                </Header>
                <ProjectsTitle>{t('home.projects.title')}</ProjectsTitle>
                <ProjectLeft>
                    <UndecoredLink href='https://regenbogen-ice.de/' target='_blank'>
                        <ProjectTitle>{t('home.projects.rainbowice.title')}</ProjectTitle>
                        <ProjectSubtitle>{t('home.projects.rainbowice.subtitle')}</ProjectSubtitle>
                        <ProjectGallery>
                            <ProjectImage src='/assets/v6/cards/regenbogenice.png' />
                        </ProjectGallery>
                    </UndecoredLink>
                </ProjectLeft>
                <ProjectRight>
                    <UndecoredLink href='https://github.com/philippirl' target='_blank'>
                        <ProjectTitle>{t('home.projects.randomstuff.title')}</ProjectTitle>
                        <ProjectSubtitle>{t('home.projects.randomstuff.subtitle')}</ProjectSubtitle>
                        <ProjectGallery>
                            <ProjectImage src='https://cdn.discordapp.com/attachments/790953646501789728/945055841378246666/unknown.png' />
                        </ProjectGallery>
                    </UndecoredLink>
                </ProjectRight>
                <Punchline>{t('home.contact.before')}<Link href='/socials/' passHref><DecoredLink>{t('home.contact.text')}</DecoredLink></Link>{t('home.contact.after')}</Punchline>
            </Page>
            <Footer>
                <Link href='/contact/' passHref>
                    <UndecoredLink>
                        <FooterIcon src='/assets/v6/bottomicons/contact.svg' />
                    </UndecoredLink>
                </Link>
                <UndecoredLink href='/terminal/' target='_blank' onClick={openTerminal}>
                    <FooterIcon src='/assets/v6/bottomicons/terminal.svg' />
                </UndecoredLink>
            </Footer>
        </AppRoot>
    )
}
