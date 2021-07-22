import styled from "styled-components";
import Head from "next/head";
import { getLang } from "../scripts/Lang";
import Header from "../components/header";
import { useState } from "react";
import { useEffect } from "react";

const AppRoot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const languageData = {
    de: {
        "contact.title": "Kontakt",
        "contact.nojs": "Javascript muss aktiviert sein um die Kontaktdaten einzusehen",
        "contact.provider": "Diensteanbieter",
        "contact.email": "Email",
        "contact.phone": "Telefon",
        "contact.further": "Volle Daten auf Anfrage",
    },
    en: {
        "contact.title": "Contact",
        "contact.nojs": "Enable Javascript to view the contact data",
        "contact.provider": "Provider identification",
        "contact.email": "Email",
        "contact.phone": "Phone",
        "contact.further": "Full details on request",
    },
};

const UndecoratedLink = styled.a`
    color: #fff;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    width: calc(100% - 40px);
    max-width: 1000px;
`;

const Paragraph = styled.span`
    margin-top: 5px;
    margin-bottom: 5px;
`;

const Censored = styled.span`
    background-color: #444;
    color: #444;
    user-select: none;
`

const getTranslation = getLang(languageData);

export default function Contact({lang}: {lang: string}) {
    const t = getTranslation(lang);
    let [secondRender, setSecondRender] = useState(false);

    useEffect(() => {
        setSecondRender(true);
    },[]);

    let innerContent = secondRender ? (
        <ContentWrapper>
            <Paragraph>
                <h2>{t("contact.provider")}</h2>
                <b>Philipp <Censored>AAAAAAAA</Censored></b><br/>
                <Censored>Hauptstr. -12b</Censored><br/>
                <Censored>12345 leel0</Censored>
            </Paragraph>
            <Paragraph>
                {t("contact.email")}: <UndecoratedLink href="mailto:pplussinfo@gmail.com">pplussinfo@gmail.com</UndecoratedLink><br/>
                {t("contact.phone")}: <span>+49 <Censored>666 12345678</Censored></span>
            </Paragraph>
            <Paragraph>
                <b>{t("contact.further")}</b><br/>
            </Paragraph>
        </ContentWrapper>
    ) : (
        <span>{t("contact.nojs")}</span>
    );

    return (
        <AppRoot>
            <Head>
                <title>{t("contact.title")}</title>
            </Head>
            <Header />
            <h1>{t("contact.title")}</h1>
            {innerContent}
        </AppRoot>
    );

}
