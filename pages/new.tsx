import styled, { createGlobalStyle } from 'styled-components'
import Link from 'next/link'
import Head from 'next/head';

const socialsData = [
    {
        title: "Twitter",
        icon: "/assets/v6/socialmediaicons/twitter.svg",
        link: "https://twitter.com/PhilippIRL"
    },
    {
        title: "Matrix",
        icon: "/assets/v6/socialmediaicons/matrix.svg",
        link: "https://matrix.to/#/@philippirl:matrix.org"
    },
    {
        title: "Discord",
        icon: "/assets/v6/socialmediaicons/discord.svg",
        link: "https://discord.gg/BRJBhJj"
    },
];

const GlobalStyles = createGlobalStyle`
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

const SocialLink = styled.a`
    display: flex;
`

export default function NewHome({}) {
    return (
        <AppRoot>
            <GlobalStyles />
            <Head>
                <title>ppluss.de</title>
                {/* eslint-disable-next-line */}
                <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap' />
                <meta name="description" content="Willkommen bei PplusS! Dies ist meine Webseite auf der ich, naja Text stehen hab und so... Und ich verlinke meine Social Media-Accounts!"></meta>
            </Head>
            <Page>
                <Header>
                    <TopHeader>
                        <TitleContainer as="h1">
                            <Title as="span">Hey,</Title>
                            <Subtitle as="span">I&apos;m Philipp!</Subtitle>
                        </TitleContainer>
                        <Logo src="/logo.png" />
                    </TopHeader>
                    <DescriptionText>Just another 18yo developer</DescriptionText>
                    <SocialsBar>
                        {socialsData.map(data => (
                        <Link href={data.link} key={data.title} passHref>
                            <SocialLink target="_blank">
                                <SocialsIcon src={data.icon} />
                            </SocialLink>
                        </Link>
                        ))}
                        <Link href="/socials/" passHref>
                            <SocialLink>
                                <SocialsIcon src="/assets/v6/socialmediaicons/arrow.svg" />
                            </SocialLink>
                        </Link>
                    </SocialsBar>
                </Header>
                <ProjectsTitle>Projects</ProjectsTitle>
                <ProjectLeft>
                    <UndecoredLink href="https://regenbogen-ice.de/" target="_blank">
                        <ProjectTitle>Where&apos;s the Rainbow ICE?</ProjectTitle>
                        <ProjectSubtitle>Track the rainbow ICE and other ICE trains</ProjectSubtitle>
                        <ProjectGallery>
                            <ProjectImage src="/assets/v6/cards/regenbogenice.png" />
                        </ProjectGallery>
                    </UndecoredLink>
                </ProjectLeft>
                <ProjectRight>
                    <UndecoredLink href="https://github.com/philippirl" target="_blank">
                        <ProjectTitle>Random stuff</ProjectTitle>
                        <ProjectSubtitle>Some small random code projects</ProjectSubtitle>
                        <ProjectGallery>
                            <ProjectImage src="https://cdn.discordapp.com/attachments/790953646501789728/945055841378246666/unknown.png" />
                        </ProjectGallery>
                    </UndecoredLink>
                </ProjectRight>
            </Page>
        </AppRoot>
    )
}
