import styled from "styled-components"
import Head from "next/head"
import LangSwitcher from "../components/langswitcher"
import type EventBus from "../scripts/EventBus"
import Card from "../components/Card"
import { FrontPage as socialsData } from "../scripts/Socials"
import Link from "next/link"
import { useState } from "react"
import { getLang } from "../scripts/Lang"
import { useEffect } from "react"

const translations = {
    de: {
        "newhome.title": "Hi, ich bin Philipp!",
        "newhome.aboutMe.title": "Über mich",
        "newhome.aboutMe.text": "{agePhrase} Ich könnte jetzt hier noch mehr Sachen über mich erzählen, mir fällt nur leider nicht viel zu mir ein.",
        "newhome.calculatingAge": "Also Berechnungen zur Bestimmung meines Alters laufen gerade im Hintergrund oder JavaScript ist deaktiviert.",
        "newhome.agePhrase": "Also laut Berechnungen bin ich derzeit {age} Jahre alt.",
    },
    en: {
        "newhome.title": "Hi, I'm Philipp!",
        "newhome.aboutMe.title": "About myself",
        "newhome.aboutMe.text": "{agePhrase} Here I could write more things about myself. Unfortunately I don't have much to say about myself.",
        "newhome.calculatingAge": "So calculations to determine my age are currently running in the background or JavaScript is disabled.",
        "newhome.agePhrase": "So according to calculations I am currently {age} years old.",
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
`

const ContactText = styled.h2`
    margin: 10px;
`

const getTranslation = getLang(translations)

export default function NewHome({lang, eventBus}: {lang: string, eventBus: EventBus}) {
    let t = getTranslation(lang)

    let [dynamicData, setDynamicData] = useState({
        age: 0,
        loaded: false,
    })

    useEffect(() => {

        var birthday = [26, 8, 2003];
        var dateObj = new Date();
        var age = dateObj.getFullYear() - birthday[2];
        var hasHadBD = (dateObj.getMonth() >= birthday[1]) || (dateObj.getMonth() == (birthday[1] - 1) && dateObj.getDate() >= birthday[0]);
        if(!hasHadBD) age--;

        setDynamicData({
            age,
            loaded: true,
        })

    }, [lang])

    return (
        <AppRoot>
            <MainContainer>
                <Head>
                    <title>ppluss.de</title>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="description" content="Willkommen bei PplusS! Dies ist meine Webseite auf der ich, naja Text stehen hab und so... Und ich verlinke meine Social Media-Accounts!"></meta>
                </Head>
                <LangSwitcher eventBus={eventBus} lang={lang} loaded={dynamicData.loaded} />
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
                        </SocialLinks>
                    </HeaderContent>
                </PageHeader>
                <GenericSection>
                    <SectionTitle>{t("newhome.aboutMe.title")}</SectionTitle>
                    <GenericParagraph>{t("newhome.aboutMe.text").replace("{agePhrase}", dynamicData.loaded ? t("newhome.agePhrase").replace("{age}", dynamicData.age.toString()) : t("newhome.calculatingAge"))}</GenericParagraph>
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
            </MainContainer>
            <a hidden rel="me" href="https://chaos.social/@philippirl">a link to verify my website on mastodon</a>
        </AppRoot>
    )
}