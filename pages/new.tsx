import styled from "styled-components"
import Head from "next/head"
import LangSwitcher from "../components/langswitcher"
import Card from "../components/Card"
import Link from "next/link"
import { getLang } from "../scripts/Lang"
import { useEffect, useState } from "react"
import { EventBusContext, LangContext } from "../scripts/Contexts"
import { useContext } from "react"
import type { Translation } from "../scripts/Lang" 
import EventBus from "../scripts/EventBus"
import type { SyntheticEvent } from "react"

const socialsData = [
    {
        title: "Twitter",
        icon: "/assets/v6/socialmediaicons/twitter.svg",
        link: "https://twitter.com/PhilippIRL"
    },
    {
        title: "Telegram",
        icon: "/assets/v6/socialmediaicons/telegram.svg",
        link: "https://t.me/philippirl"
    },
    {
        title: "Discord",
        icon: "/assets/v6/socialmediaicons/discord.svg",
        link: "https://discord.gg/BRJBhJj"
    },
];

const translations = {
    de: {
        "newhome.title": "Hi, ich bin Philipp!",
        "newhome.aboutMe.title": "Über mich",
        "newhome.aboutMe.text": "{agePhrase} Ich könnte jetzt hier noch mehr Sachen über mich erzählen, mir fällt nur leider nicht viel zu mir ein.",
        "newhome.calculatingAge": "Also Berechnungen zur Bestimmung meines Alters laufen gerade im Hintergrund oder JavaScript ist deaktiviert.",
        "newhome.agePhrase": "Also laut Berechnungen bin ich derzeit {age} Jahre alt.",
        "newhome.footer.socials": "Socials",
        "newhome.footer.contact": "Impressum",
        "newhome.footer.terminal": "Terminal",
    },
    en: {
        "newhome.title": "Hi, I'm Philipp!",
        "newhome.aboutMe.title": "About myself",
        "newhome.aboutMe.text": "{agePhrase} Here I could write more things about myself. Unfortunately I don't have much to say about myself.",
        "newhome.calculatingAge": "So calculations to determine my age are currently running in the background or JavaScript is disabled.",
        "newhome.agePhrase": "So according to calculations I am currently {age} years old.",
        "newhome.footer.socials": "Socials",
        "newhome.footer.contact": "Imprint",
        "newhome.footer.terminal": "Terminal",
    },
}

const AppRoot = styled.div`
    min-height: 100vh;
`

const PageHeader = styled.header`
    height: 40vh;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
`

const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const HeaderTitle = styled.h1`
    text-align: center;
`

const SocialLinks = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
`

const SocialIcon = styled.img`
    width: 35px;
    height: 35px;
    transition: .2s;
    cursor: pointer;
    :hover {
        transform: scale(1.2);
    }
`

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
`

const GenericSection = styled.section`
    display: flex;
    flex-direction: row;
    margin-left: 20px;
    margin-right: 20px;
    width: 100%;
    max-width: 850px;
    justify-content: flex-start;
    margin-bottom: 75px;
    flex-wrap: wrap;
`

const SectionTitle = styled.h2`
    font-size: 28px;
    margin-bottom: 10px;
    margin-left: 20px;
    magin-right: 20px;
    @media only screen and (min-width: 1100px)  {
        margin-left: -75px;
    }
`

const GenericParagraph = styled.p`
    margin: 0;
    margin-left: 20px;
    margin-right: 20px;
    width: 100%;
`

const CardGrid = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    max-width: calc(100vw - 20px);
    margin: 10px;
    gap: 30px;
`

const StyledLink = styled.a`
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
    width: max-content;
`

const ContactText = styled.h2`
    margin: 20px;
`

const FooterElem = styled.footer`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
    justify-content: flex-end;
    width: calc(100vw - 20px);
    gap: 10px;
    @media only screen and (max-width: 600px)  {
        justify-content: center;
    }
    font-size: 18px;
    font-weight: bold;
`

const getTranslation = getLang(translations)

function AgeParagraph({t}: {t: Translation}) {
    let [age, setAge] = useState(-1)

    useEffect(() => {
        var birthday = [26, 8, 2003];
        var dateObj = new Date();
        var age = dateObj.getFullYear() - birthday[2];
        var hasHadBD = (dateObj.getMonth() >= birthday[1]) || (dateObj.getMonth() == (birthday[1] - 1) && dateObj.getDate() >= birthday[0]);
        if(!hasHadBD) age--;
        setAge(age);
    }, []);

    let agePhrase = age !== -1 ? t("newhome.agePhrase").replace("{age}", age.toString()) : t("newhome.calculatingAge");

    return (
        <GenericParagraph>{t("newhome.aboutMe.text").replace("{agePhrase}", agePhrase)}</GenericParagraph>
    )
}

function Footer({t, eventBus}: {t: Translation, eventBus: EventBus}) {
    function openTerminal(e: SyntheticEvent) {
        e.preventDefault()
        eventBus.post({id: "TERMINAL_TOGGLE"})
    }
    return (
        <FooterElem>
            <Link href="/socials">
                <StyledLink href="/socials">{t("newhome.footer.socials")}</StyledLink>
            </Link>
            <Link href="/contact">
                <StyledLink href="/contact">{t("newhome.footer.contact")}</StyledLink>
            </Link>
            <StyledLink href="/terminal" onClick={openTerminal}>{t("newhome.footer.terminal")}</StyledLink>
        </FooterElem>
    )
}

export default function NewHome() {
    let lang = useContext(LangContext)
    let eventBus: any = useContext(EventBusContext)

    let t = getTranslation(lang)

    let [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <AppRoot>
            <MainContainer>
                <Head>
                    <title>ppluss.de</title>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="description" content="Willkommen bei PplusS! Dies ist meine Webseite auf der ich, naja Text stehen hab und so... Und ich verlinke meine Social Media-Accounts!"></meta>
                </Head>
                <LangSwitcher loaded={loaded} />
                <PageHeader>
                    <HeaderContent>
                        <HeaderTitle>{t("newhome.title")}</HeaderTitle>
                        <SocialLinks>
                            {socialsData.map((data, index) => {
                                return (
                                    <a key={index} href={data.link} rel="noopener" target="_blank">
                                        <SocialIcon src={data.icon} alt={data.title} />
                                    </a>
                                )
                            })}
                            <Link href="/socials">
                                <SocialIcon src="/assets/v6/socialmediaicons/arrow.svg" alt="More" />
                            </Link>
                        </SocialLinks>
                    </HeaderContent>
                </PageHeader>
                <GenericSection>
                    <SectionTitle>{t("newhome.aboutMe.title")}</SectionTitle>
                    <AgeParagraph t={t} />
                </GenericSection>
                <GenericSection>
                    <SectionTitle>Lorem ipsum</SectionTitle>
                    <GenericParagraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed auctor massa. Vestibulum malesuada pretium turpis id hendrerit. Pellentesque congue urna id pellentesque mattis. Morbi pulvinar lorem quis est consequat, non feugiat metus dapibus. Proin laoreet condimentum lacus eget vulputate. Etiam sagittis urna eu urna viverra, eu pharetra metus ultricies. Proin sed mi ut purus luctus fringilla. Quisque molestie augue eu risus condimentum, vitae porta felis bibendum. Donec ut ligula sed nisl egestas semper. Maecenas sit amet interdum dui, et tincidunt ante. Nunc consectetur turpis sed quam varius consequat. Vivamus varius tincidunt lobortis. Aliquam erat volutpat. Fusce bibendum ante sem. Etiam viverra mauris a sapien suscipit hendrerit.</GenericParagraph>
                </GenericSection>
                <GenericSection>
                    <CardGrid>
                        <Card title={"PLACEHOLDER"} description={"PLACEHOLDER"} background="/assets/v6/cards/gge.webp" />
                        <Card title={"PLACEHOLDER"} description={"PLACEHOLDER"} background="/assets/v6/cards/gge.webp" />
                        <Card large={true} title={"PLACEHOLDER"} description={"PLACEHOLDER"} background="/assets/v6/cards/gge.webp" />
                    </CardGrid>
                </GenericSection>
                <GenericSection>
                    <ContactText>Feel free to <Link href="/socials"><StyledLink>contact me</StyledLink></Link>, cheers!</ContactText>
                </GenericSection>
                <Footer eventBus={eventBus} t={t} />
            </MainContainer>
            <a hidden rel="me" href="https://chaos.social/@philippirl">a link to verify my website on mastodon</a>
        </AppRoot>
    )
}