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
        "contact.nojs": "Aktiviere Javascript um die Kontaktdaten einzusehen",
        "contact.provider": "Diensteanbieter",
        "contact.address": "- Adresse auf Anfrage -",
        "contact.email": "Email",
        "contact.phone": "Telefon",
        "contact.phoneNumber": "- Auf Anfrage -",
        "contact.further": "Weitere Daten auf Anfrage",
    },
    en: {
        "contact.title": "Contact",
        "contact.nojs": "Enable Javascript to view the contact data",
        "contact.provider": "Provider identification",
        "contact.address": "- Address at request -",
        "contact.email": "Email",
        "contact.phone": "Phone",
        "contact.phoneNumber": "- At request -",
        "contact.further": "Further details at request",
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

const Gray = styled.span`
    color: #aaa;
`;

const getTranslation = getLang(languageData);

export default function contact({lang}: {lang: string}) {
    const t = getTranslation(lang);
    let [secondRender, setSecondRender] = useState(false);

    useEffect(() => {
        setSecondRender(true);
    });

    let innerContent = secondRender ? (
        <ContentWrapper>
            <Paragraph>
                <h2>{t("contact.provider")}</h2>
                <b>Philipp S.</b><br/>
                <Gray>{t("contact.address")}</Gray>
            </Paragraph>
            <Paragraph>
                {t("contact.email")}: <UndecoratedLink href="mailto:pplussinfo@gmail.com">pplussinfo@gmail.com</UndecoratedLink><br/>
                {t("contact.phone")}: <Gray>{t("contact.phoneNumber")}</Gray>
            </Paragraph>
            <Paragraph>
                <Gray>{t("contact.further")}</Gray>
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
            <Header lang={lang} />
            <h1>{t("contact.title")}</h1>
            {innerContent}
        </AppRoot>
    );

}
