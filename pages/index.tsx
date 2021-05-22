import Head from "next/head";
import React from "react";
import LangSwitcher from "../components/langswitcher";
import { withRouter } from "next/router";
import { getLang } from "../scripts/Lang";
import Card from "../components/LegacyCard";
import Link from "next/link";
import PermissionPrompt from '../components/PermissionPrompt';
import SteamNotification from '../components/SteamNotification';

import type { BusEvent } from "../scripts/EventBus";
import type { SyntheticEvent } from "react";

const translations = {
    de: {
        "home.title": "Willkommen bei PplusS",
        "home.version": "v6",
        "home.aboutMe.title": "Über mich",
        "home.aboutMe.text": "Hey, ich bin Philipp. {agePhrase} Ich könnte jetzt hier noch mehr Sachen über mich erzählen, mir fällt nur leider nicht viel zu mir ein.",
        "home.calculatingAge": "Berechnungen zur Bestimmung meines Alters laufen gerade im Hintergrund oder JavaScript ist deaktiviert.",
        "home.agePhrase": "Laut Berechnungen bin ich derzeit {age} Jahre alt.",
        "home.thingsIDid.title": "Sachen die ich mal so gemacht hab",
        "home.thingsIDid.text": "Irgendwer meinte mal ich hätte auch mal andere Sachen gemacht als diese Seite zu bauen. Weiter unten sind, wenn ich welche finde, Beispiele aufgelistet.",
        "home.cards.gge.title": "GGE-Vertretung",
        "home.cards.gge.text": "Die GGE-Vertretung ist eine App die ich mal gebaut hab. Sie kann die Vertretungen des Grashof Gymnasium Essen anzeigen.",
        "home.cards.thispage.title": "Diese Seite",
        "home.cards.thispage.text": "Ich meine, die muss ja auch irgendwo erwähnt werden. Diese Seite steht auch stellvertretend für die anderen Homepages die ich gebaut hab' hier.",
        "home.cards.things.title": "Spielereien",
        "home.cards.things.text": "Ich erstelle seit irgendwie immer aus Spaß kleinere Web-Apps, Userscripts, Android-Apps oder ganz andere Sachen. Ich hab' inzwischen schon alleine auf GitLab 80 Projekte rumliegen, dazu kommen noch welche auf GitHub und welche die ich nicht mal in eine Repo gepackt hab'. Solche Sachen erstellen macht aber irgendwie jeder der sich so für die Themen JavaScript, HTML, etc. interessiert. Bei mir machen diese Projekte aber gefühlt 90% aus, weil ich kaum bei Projekten von anderen mitmache, weil es fragt mich ja nie jemand und wieso sollte ich von mir aus fragen, ob ich bei Projekten mitmachen kann. Da kann ich mich höchstens total blamieren. Naja, vielleicht sollte ich das mal überdenken.",
        "home.otherthings.title": "Möchte ich sonst noch etwas sagen?",
        "home.otherthings.text": "Ja, sonst hätte ich schließlich diesen Abschnitt nicht eingefügt. Ich möchte darauf aufmerksam machen, dass ein Feature aus PplusSMC4 hier wieder sein Comeback hat. {terminalPhrase}",
        "home.terminalPhrase.disabled": "Das Terminal ist für alle Nutzer außer dich wieder verfügbar. Du kannst auch zu den anderen gehören, wenn du JavaScript aktivierst.",
        "home.terminalPhrase.mobile": "Das Terminal ist wieder aufrufbar. Da du auf einem Mobilgerät bist, kannst du das Terminal nur mit dem Button weiter unten öffnen und nicht per Tastenkombination",
        "home.terminalPhrase.desktop": "Das Terminal ist durch das Drücken von {keyCombo} oder durch den Button weiter unten wieder aufrufbar. Dachte einfach es wäre vielleicht ein nettes Feature.",
        "home.otherthings.terminalToggle": "Terminal öffnen/schließen",
        "home.contactSection.title": "Du möchtest auch noch was sagen?",
        "home.contactSection.disabled": "Dann kontaktiere mich gerne über eine der Kontaktmöglichkeiten unten links.",
    },
    en: {
        "home.title": "Welcome to PplusS",
        "home.version": "v6",
        "home.aboutMe.title": "About me",
        "home.aboutMe.text": "Hey, I'm Philipp. {agePhrase} Here I could write more things about myself. Unfortunately I don't have much to say about myself.",
        "home.calculatingAge": "Calculation to determine my age are currently running in the background or JavaScript is disabled.",
        "home.agePhrase": "According to calculations I am currently {age} years old.",
        "home.thingsIDid.title": "Things I've done so far",
        "home.thingsIDid.text": "Somebody once told me I once did other things, than building this website. Further down on this page you can find examples for this if I find some.",
        "home.cards.gge.title": "GGE-Vertretung",
        "home.cards.gge.text": "The GGE-Vertretung (GGE substitution plan) is an app that I once build. It can show the substitutions at the Grashof Gymnasium Essen.",
        "home.cards.thispage.title": "This page",
        "home.cards.thispage.text": "I mean it has to be mentioned somewhere. This page is also here to represent other webpages I build so far.",
        "home.cards.things.title": "Random code",
        "home.cards.things.text": "In the German version there is a paragraph here where I cry about that I'm never invited to projects by others and so on. I won't translate this.",
        "home.otherthings.title": "Do I want to say anything else?",
        "home.otherthings.text": "Yes. Otherwise I would not have added this paragraph. I want to make you aware that a feature from PplusSMC4 has its comeback here. {terminalPhrase}",
        "home.terminalPhrase.disabled": "The Terminal is available for all users except you. You can be one of the others if you enable JavaScript.",
        "home.terminalPhrase.mobile": "The Terminal is available again. Since you are on a mobile device you can only use the button below instead of a keycombo.",
        "home.terminalPhrase.desktop": "The Terminal is available again by pressing {keyCombo} or clicking the button below. I thought it might be a nice feature.",
        "home.otherthings.terminalToggle": "Open/Close Terminal",
        "home.contactSection.title": "Do you want to say anything else?",
        "home.contactSection.disabled": "Then contact me using one of the contact options in the bottom left.",
    },
};

const getTranslation = getLang(translations);

class Home extends React.Component<any> {

    eventBus: any = null;
    state: any = null;

    constructor(props: any) {
        super(props);

        this.eventBus = props.eventBus;

        this.toggleConsole = this.toggleConsole.bind(this);
        this.onBusEvent = this.onBusEvent.bind(this);

        this.eventBus.attach(this.onBusEvent);

        this.state = {dynamicData: {age: null, terminalPlatform: null, componentDidMount: false}, steamNotificationState: "hide"};
    }

    onBusEvent(msg: BusEvent) {
        if(msg.id === "HAS_CONSENT") {
            if(!msg.data) {
                this.eventBus.post({id: "STEAM_PROMPT", data: ["schade"]});
            } else {
                this.eventBus.post({id: "STEAM_PROMPT", data: ["cool danke", "du hast 5 minuten gewartet", "und auch noch auf zulassen geklickt", "hoffe das war es wert für dieses...", "\"easteregg\"", "(wenn man es so nennen kann)", "naja", "thx 4 playing, i guess", "p.s.:", "hoffe valve verklagt mich nicht", "bzw. google sperrt mich nicht", "weil ich ahme ja deren gui nach", "wie es jedem aufgefallen ist", "(hoffentlich)", "p.p.s.:", "folgt mir auf twitter, danke", "link ist unten links"]});
            }
        }
    }

    toggleConsole(e: SyntheticEvent) {
        e.preventDefault();
        this.eventBus.post({id: "TERMINAL_TOGGLE"});
    }

    componentDidMount() {

        var dynamicData: any = {};

        var birthday = [26, 8, 2003];
        var dateObj = new Date();
        var age = dateObj.getFullYear() - birthday[2];
        var hasHadBD = (dateObj.getMonth() >= birthday[1]) || (dateObj.getMonth() == (birthday[1] - 1) && dateObj.getDate() >= birthday[0]);
        if(!hasHadBD) age--;
        dynamicData.age = age.toString();

        var terminalPlatform = "desktop";
        if(navigator.userAgent.includes("Mac OS X")) {
            terminalPlatform = "mac";
        }
        if(/iPad|iPhone|iPod|Mobile|Android/.test(navigator.userAgent)) {
            terminalPlatform = "mobile";
        }
        dynamicData.terminalPlatform = terminalPlatform;

        dynamicData.componentDidMount = true;

        this.setState({dynamicData});

    }

    componentWillUnmount() {
        this.eventBus.detach(this.onBusEvent);
    }

    render() {

        const getString = getTranslation(this.props.lang);

        var agePhrase = this.state.dynamicData.age ? getString("home.agePhrase").replace("{age}", this.state.dynamicData.age) : getString("home.calculatingAge");
        var terminalPhrase;
        switch(this.state.dynamicData.terminalPlatform) {
            case "desktop":
            case "mac":
                let keyCombo = this.state.dynamicData.terminalPlatform === "mac" ? "⌥ + T" : "Alt + T";
                terminalPhrase = getString("home.terminalPhrase.desktop").replace("{keyCombo}", keyCombo);
                break;
            case "mobile":
                terminalPhrase = getString("home.terminalPhrase.mobile");
                break;
            default:
                terminalPhrase = getString("home.terminalPhrase.disabled");
                break;
        }

        return (
            <div className="app-root">
                <Head>
                    <title>PplusS</title>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="description" content="Willkommen bei PplusS! Dies ist meine Webseite auf der ich, naja Text stehen hab und so... Und ich verlinke meine Social Media-Accounts!"></meta>
                </Head>
                <div className="content-wrapper">
                    <PermissionPrompt eventBus={this.eventBus} />
                    <SteamNotification eventBus={this.eventBus} />
                    <LangSwitcher />
                    <header>
                        <div className="inner-title-wrapper">
                            <span className="header-title">{getString("home.title")}<span className="header-version">{getString("home.version")}</span></span>
                        </div>
                    </header>
                    <div className="paragraph">
                        <span className="paragraph-title">{getString("home.aboutMe.title")}</span>
                        <span className="paragraph-text">{getString("home.aboutMe.text").replace("{agePhrase}", agePhrase)}</span>
                    </div>
                    <div className="paragraph">
                        <span className="paragraph-title">{getString("home.thingsIDid.title")}</span>
                        <span className="paragraph-text">{getString("home.thingsIDid.text")}</span>
                        <div className="paragraph-cards">
                            <Card title={getString("home.cards.gge.title")} description={getString("home.cards.gge.text")} background="/assets/v6/cards/gge.webp" largeCard={false} />
                            <Card title={getString("home.cards.thispage.title")} description={getString("home.cards.thispage.text")} background="/assets/v6/cards/thispage.webp" largeCard={false} />
                            <Card title={getString("home.cards.things.title")} description={getString("home.cards.things.text")} background="/assets/v6/cards/randomcode.webp" largeCard={true} />
                        </div>
                    </div>
                    <div className="paragraph">
                        <span className="paragraph-title">{getString("home.otherthings.title")}</span>
                        <span className="paragraph-text">{getString("home.otherthings.text").replace("{terminalPhrase}", terminalPhrase)}</span>
                        <div className="paragraph-button">
                            {this.state.dynamicData.componentDidMount?
                                <div className="button button-primary" onClick={this.toggleConsole}>{getString("home.otherthings.terminalToggle")}</div>
                            :null}
                        </div>
                    </div>
                    <div className="paragraph">
                        <span className="paragraph-title">{getString("home.contactSection.title")}</span>
                        <span className="paragraph-text">{getString("home.contactSection.disabled")}</span>
                    </div>
                    <div className="footer">
                        <div className="social-links">
                            <a className="sociallink" href="https://twitter.com/PhilippIRL" target="_blank" rel="noopener"><img width="24" height="24" src="/assets/v6/socialmediaicons/twitter.svg" alt="Twitter" /></a>
                            <a className="sociallink" href="https://chaos.social/@philippirl" target="_blank" rel="me noopener"><img width="24" height="24" src="/assets/v6/socialmediaicons/mastodon.svg" alt="Mastodon" /></a>
                            <a className="sociallink" href="https://instagram.com/philipp_irl" target="_blank" rel="noopener"><img width="24" height="24" src="/assets/v6/socialmediaicons/instagram.svg" alt="Instagram" /></a>
                            <a className="sociallink" href="https://discord.gg/BRJBhJj" target="_blank" rel="noopener"><img width="24" height="24" src="/assets/v6/socialmediaicons/discord.svg" alt="Discord" /></a>
                            <a className="sociallink" href="https://t.me/philippirl" target="_blank" rel="noopener"><img width="24" height="24" src="/assets/v6/socialmediaicons/telegram.svg" alt="Telegram" /></a>
                            <a className="sociallink" href="https://www.snapchat.com/add/ppluss1" target="_blank" rel="noopener"><img width="24" height="24" src="/assets/v6/socialmediaicons/snapchat.svg" alt="Snapchat" /></a>
                            <a className="sociallink" href="https://twitch.tv/philipp_irl" target="_blank" rel="noopener"><img width="24" height="24" src="/assets/v6/socialmediaicons/twitch.svg" alt="Twitch" /></a>
                            <a className="sociallink" href="mailto:pplussinfo@gmail.com?subject=hey.&body=hi." rel="noopener"><img width="24" height="24" src="/assets/v6/socialmediaicons/email.svg" alt="E-Mail" /></a>
                            <Link href="/socials">
                                <a className="sociallink" rel="noopener"><img width="24" height="24" src="/assets/v6/socialmediaicons/more.svg" alt="..." /></a>
                            </Link>
                        </div>
                        <div></div>
                    </div>
                </div>
                <style jsx>{`                

                    .paragraph-cards {
                        margin-top: 20px;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        flex-wrap: wrap;
                    }

                    a {
                        color: white;
                        text-decoration: underline;
                    }

                    .sociallink {
                        width: 32px;
                        height: 32px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: .2s;
                        margin: 2px;
                    }

                    .sociallink:hover {
                        transform: scale(1.2);
                    }

                    .sociallink img {
                        width: 24px;
                        height: 24px;
                        fill: white;
                    }

                    .footer {
                        display: flex;
                        justify-content: space-between;
                        width: 100vw;
                        align-items: center;
                    }

                    .social-links {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        margin-top: 25px;
                        margin-bottom: 25px;
                        align-self: flex-start;
                        margin-left: 25px;
                        margin-right: 25px;
                        animation: social-links-in 1s;
                    }

                    @keyframes social-links-in {
                        from { opacity: 0; transform: translateY(-25px) }
                        to { opacity: 1; }
                    }
                
                    header {
                        height: 300px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .inner-title-wrapper {
                        display: flex;
                    }

                    .header-title {
                        margin: 0;
                        text-align: center;
                        display: inline;
                        font-size: 32px;
                        font-weight: bold;
                        animation: title-in 1s;
                        margin-left: 25px;
                        margin-right: 25px;
                    }

                    @keyframes title-in {
                        from { opacity: 0; transform: translateY(25px) }
                        to { opacity: 1; }
                    }

                    .header-version {
                        font-size: 16px;
                        color: gray;
                        position: relative;
                        bottom: -3px;
                    }

                    .paragraph {
                        display: flex;
                        flex-direction: column;
                        margin-left: 20px;
                        margin-right: 20px;
                        width: 100%;
                        max-width: 850px;
                        justify-content: flex-start;
                        margin-bottom: 50px;
                    }

                    .paragraph-title {
                        display: inline-block;
                        font-weight: bold;
                        font-size: 28px;
                        animation: paragraph-title-in 1s;
                        margin-bottom: 10px;
                        margin-left: 20px;
                        magin-right: 20px;
                    }

                    .paragraph-text {
                        font-size: 16px;
                        animation: paragraph-text-in 1s;
                        margin-left: 20px;
                        margin-right: 20px;
                    }

                    @keyframes paragraph-title-in {
                        from { opacity: 0; transform: translateX(-25px) }
                        to { opacity: 1; }
                    }

                    @keyframes paragraph-text-in {
                        from { opacity: 0; transform: translateX(25px) }
                        to { opacity: 1; }
                    }

                    @media only screen and (min-width: 1000px)  {
                        .paragraph-title {
                            margin-left: -75px;
                        }
                    }

                    .content-wrapper {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        overflow-x: hidden;
                    }

                    .button {
                        padding: 10px;
                        min-width: 75px;
                        font-weight: bold;
                        border: 2px solid #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 10px;
                        margin-bottom: 0;
                        border-radius: 7px;
                        transition: .2s;
                        cursor: pointer;
                        text-align: center;
                    }

                    .button-primary, .button:hover {
                        color: #000;
                        background-color: #fff;
                    }

                    .button-primary:hover {
                        color: #fff;
                        background-color: transparent;
                    }

                    .paragraph-button {
                        display: flex;
                        justify-content: center;
                        animation: paragraph-text-in 1s;
                    }

                    .more-text {
                        font-size: 24px;
                        letter-spacing: 1px;
                        transition: letter-spacing .5s;
                        cursor: pointer;
                        animation: fadein 1s;
                    }

                    .more-text:hover {
                        letter-spacing: 5px;
                    }

                    @keyframes fadein {
                        from {opacity: 0}
                        to {opacity: 1}
                    }

                    .language-select {
                        background: transparent;
                        color: #fff;
                        margin: 25px;
                        font-size: 18px;
                        border: 0;
                        outline: 0;
                        padding: 0;
                    }

                    .language-select option {
                        background-color: #222;
                    }

                `}</style>
            </div>
        )
    }
}

export default withRouter(Home);