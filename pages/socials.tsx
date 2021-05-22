import { getLang } from "../scripts/Lang";
import Header from "../components/header";
import Head from "next/head";
import styled, { css, keyframes } from "styled-components";
import { useState } from "react";
import SocialCard from "../components/SocialCard";
import { SocialsPage as socialsData } from "../scripts/Socials";

const languageData = {
    de: {
        "socials.title": "Socials",
    },
    en: {
        "socials.title": "Socials",
    },
};

const getTranslation = getLang(languageData);

const AppRoot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SocialsContainer = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
`;

const UndecoratedLink = styled.a`
    color: #fff;
    text-decoration: none;
    margin: 10px;
`;

const colorRotateAnim = keyframes`
    to {
        filter: hue-rotate(360deg);
    }
`;

const SocialsTitle: any = styled.h1`
    font-size: 38px;
    color: #fff;
    ${(props: any) => props.colorRotate && css`
        color: #f00;
        animation: 3s ${colorRotateAnim} linear infinite;
    `}
`;

export default function Socials({lang}: {lang: string}) {
    const t = getTranslation(lang);

    let [colorRotate, setColorRotate] = useState(false);

    return (
        <AppRoot>
            <Head>
                <title>{t("socials.title")}</title>
            </Head>
            <Header lang={lang} />
            <SocialsTitle onClick={() => setColorRotate(!colorRotate)} colorRotate={colorRotate}>{t("socials.title")}</SocialsTitle>
            <SocialsContainer>
                {socialsData.map((data, index) => {
                    return (
                        <UndecoratedLink key={index} href={data.link} target="_blank">
                            <SocialCard title={data.title} description={data.text} icon={data.icon} color={data.color} />
                        </UndecoratedLink>
                    );
                })}
            </SocialsContainer>
        </AppRoot>
    );
}