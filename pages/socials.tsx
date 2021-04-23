import { getLang } from "../scripts/Lang";
import Header from "../components/header";
import Head from "next/head";
import styled, { css, keyframes } from "styled-components";
import { useEffect, useState } from "react";
import SocialCard from "../components/SocialCard";

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

const socialsData = [
    {
        title: "Twitter",
        text: "@PhilippIRL",
        color: "#1DA1F2",
        icon: "/assets/v6/socialmediaicons/twitter.svg",
        link: "https://twitter.com/PhilippIRL"
    },
    {
        title: "Twitter",
        text: "@ppscanary",
        color: "#1DA1F2",
        icon: "/assets/v6/socialmediaicons/twitter.svg",
        link: "https://twitter.com/ppscanary"
    },
    {
        title: "Twitter",
        text: "@ppspriv",
        color: "#1DA1F2",
        icon: "/assets/v6/socialmediaicons/twitter.svg",
        link: "https://twitter.com/ppspriv"
    },
    {
        title: "YouTube",
        text: "",
        color: "#ff0000",
        icon: "/assets/v6/socialmediaicons/youtube.svg",
        link: "https://youtube.com/PhilippPplusS"
    },
    {
        title: "Instagram",
        text: "",
        color: "#5851db",
        icon: "/assets/v6/socialmediaicons/instagram.svg",
        link: "https://instagram.com/philipp_irl"
    },
    {
        title: "Discord",
        text: "",
        color: "#7289da",
        icon: "/assets/v6/socialmediaicons/discord.svg",
        link: "https://discord.gg/BRJBhJj"
    },
    {
        title: "Spotify",
        text: "User",
        color: "#1db954",
        icon: "/assets/v6/socialmediaicons/spotify.svg",
        link: "https://open.spotify.com/user/pplussmc"
    },
    {
        title: "Spotify",
        text: "Artist",
        color: "#1db954",
        icon: "/assets/v6/socialmediaicons/spotify.svg",
        link: "https://open.spotify.com/artist/4El3b2uCyp4Qj68gSkvRDg"
    },
    {
        title: "Tellonym",
        text: "",
        color: "#ff1a88",
        icon: "/assets/v6/socialmediaicons/tellonym_square.png",
        link: "https://tellonym.me/ppluss"
    },
    {
        title: "Telegram",
        text: "",
        color: "#0088cc",
        icon: "/assets/v6/socialmediaicons/telegram.svg",
        link: "https://t.me/philippirl"
    },
    {
        title: "Snapchat",
        text: "",
        color: "#fffc00",
        icon: "/assets/v6/socialmediaicons/snapchat.svg",
        link: "https://www.snapchat.com/add/ppluss1"
    },
    {
        title: "Twitch",
        text: "",
        color: "#9146ff",
        icon: "/assets/v6/socialmediaicons/twitch.svg",
        link: "https://twitch.tv/philipp_irl"
    },
    {
        title: "chaos.social",
        text: "Mastodon",
        color: "#657786",
        icon: "/assets/v6/socialmediaicons/mastodon.svg",
        link: "https://chaos.social/@philippirl"
    },
    {
        title: "Last.fm",
        text: "",
        color: "#d51007",
        icon: "/assets/v6/socialmediaicons/lastfm.svg",
        link: "https://www.last.fm/user/PhilippIRL"
    },
    {
        title: "GitHub",
        text: "",
        color: "#333",
        icon: "/assets/v6/socialmediaicons/github.svg",
        link: "https://github.com/PhilippIRL"
    },
    {
        title: "GitLab",
        text: "",
        color: "#e24329",
        icon: "/assets/v6/socialmediaicons/gitlab.svg",
        link: "https://gitlab.com/PhilippIRL"
    },
    {
        title: "TikTok",
        text: "",
        color: "#333",
        icon: "/assets/v6/socialmediaicons/tiktok.svg",
        link: "https://www.tiktok.com/@pplussmc"
    },
    {
        title: "Steam",
        text: "",
        color: "#1b2838",
        icon: "/assets/v6/socialmediaicons/steam.svg",
        link: "https://steamcommunity.com/id/PplusS/"
    },
];

export default function Socials({lang}: {lang: string}) {
    const t = getTranslation(lang);

    let [pageWidth, setPageWidth] = useState(-1);
    let [colorRotate, setColorRotate] = useState(false);

    useEffect(() => {
        if(pageWidth === -1) {
            setPageWidth(window.innerWidth);
        }

        function resizehandler() {
            setPageWidth(window.innerWidth);
        }

        window.addEventListener("resize", resizehandler);
        return () => window.removeEventListener("resize", resizehandler);
    }, []);

    let itemsPerRow = Math.floor(pageWidth / 200);
    if(itemsPerRow > 6) itemsPerRow = 6;
    else if(itemsPerRow < 2) itemsPerRow = 2;
    let itemWidth = Math.floor((pageWidth / itemsPerRow) - 70 - (25 / itemsPerRow));
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
                            <SocialCard size={itemWidth} title={data.title} description={data.text} icon={data.icon} color={data.color} />
                        </UndecoratedLink>
                    );
                })}
            </SocialsContainer>
        </AppRoot>
    );
}