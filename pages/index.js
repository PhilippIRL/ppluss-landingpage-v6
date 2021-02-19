import Head from "next/head";
import React from "react";
import Terminal from "../components/Terminal";
import EventBus from "../scripts/EventBus";
import LangSwitcher from "../components/langswitcher";
import { withRouter } from "next/router";
import dynamic from 'next/dynamic';

// race condition, but only if the script fails to load for like 5 minutes
const PermissionPrompt = dynamic(() => import('../components/PermissionPrompt'))
const SteamNotification = dynamic(() => import('../components/SteamNotification'))


class Home extends React.Component {

    eventBus = null;

    constructor(props) {
        super(props);

        this.eventBus = props.eventBus;

        this.toggleConsole = this.toggleConsole.bind(this);
        this.onBusEvent = this.onBusEvent.bind(this);

        this.eventBus.attach(this.onBusEvent);

        this.state = {dynamicData: {age: null, terminalPlatform: null, componentDidMount: false}, steamNotificationState: "hide"};
    }

    onBusEvent(msg) {
        if(msg.id === "HAS_CONSENT") {
            if(!msg.data) {
                this.eventBus.post({id: "STEAM_PROMPT", data: ["schade"]});
            } else {
                this.eventBus.post({id: "STEAM_PROMPT", data: ["cool danke", "du hast 5 minuten gewartet", "und auch noch auf zulassen geklickt", "hoffe das war es wert für dieses...", "\"easteregg\"", "(wenn man es so nennen kann)", "naja", "thx 4 playing, i guess", "p.s.:", "hoffe valve verklagt mich nicht", "bzw. google sperrt mich nicht", "weil ich ahme ja deren gui nach", "wie es jedem aufgefallen ist", "(hoffentlich)", "p.p.s.:", "folgt mir auf twitter, danke", "link ist unten links"]});
            }
        }
    }

    toggleConsole(e) {
        e.preventDefault();
        this.eventBus.post({id: "TERMINAL_TOGGLE"});
    }

    componentDidMount() {

        var dynamicData = {};

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

        var agePhrase = this.state.dynamicData.age ? this.props.lang.getString("home.agePhrase").replace("{age}", this.state.dynamicData.age) : this.props.lang.getString("home.calculatingAge");
        var terminalPhrase;
        switch(this.state.dynamicData.terminalPlatform) {
            case "desktop":
            case "mac":
                let keyCombo = this.state.dynamicData.terminalPlatform === "mac" ? "⌥ + T" : "Alt + T";
                terminalPhrase = this.props.lang.getString("home.terminalPhrase.desktop").replace("{keyCombo}", keyCombo);
                break;
            case "mobile":
                terminalPhrase = this.props.lang.getString("home.terminalPhrase.mobile");
                break;
            default:
                terminalPhrase = this.props.lang.getString("home.terminalPhrase.disabled");
                break;
        }

        return (
            <div className="app-root">
                <Head>
                    <title>PplusS</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="description" content="Willkommen bei PplusS! Dies ist meine Webseite auf der ich, naja Text stehen hab und so... Und ich verlinke meine Social Media-Accounts!"></meta>
                </Head>
                <div className="content-wrapper">
                    {this.state.dynamicData.componentDidMount ? <>
                        <PermissionPrompt eventBus={this.eventBus} />
                        <SteamNotification eventBus={this.eventBus} />
                    </> : null}
                    <LangSwitcher eventBus={this.eventBus} lang={this.props.lang} />
                    <header>
                        <div className="inner-title-wrapper">
                            <span className="header-title">{this.props.lang.getString("home.title")}<span className="header-version">{this.props.lang.getString("home.version")}</span></span>
                        </div>
                    </header>
                    <div className="paragraph">
                        <span className="paragraph-title">{this.props.lang.getString("home.aboutMe.title")}</span>
                        <span className="paragraph-text">{this.props.lang.getString("home.aboutMe.text").replace("{agePhrase}", agePhrase)}</span>
                    </div>
                    <div className="paragraph">
                        <span className="paragraph-title">{this.props.lang.getString("home.thingsIDid.title")}</span>
                        <span className="paragraph-text">{this.props.lang.getString("home.thingsIDid.text")}</span>
                        <div className="paragraph-cards">
                            <div className="card card-gge">
                                <span className="card-title">{this.props.lang.getString("home.cards.gge.title")}</span>
                                <span className="card-description">{this.props.lang.getString("home.cards.gge.text")}</span>
                            </div>
                            <div className="card card-thispage">
                                <span className="card-title">{this.props.lang.getString("home.cards.thispage.title")}</span>
                                <span className="card-description">{this.props.lang.getString("home.cards.thispage.text")}</span>
                            </div>
                            <div className="card card-randomcode card-large">
                                <span className="card-title">{this.props.lang.getString("home.cards.things.title")}</span>
                                <span className="card-description">{this.props.lang.getString("home.cards.things.text")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="paragraph">
                        <span className="paragraph-title">{this.props.lang.getString("home.otherthings.title")}</span>
                        <span className="paragraph-text">{this.props.lang.getString("home.otherthings.text").replace("{terminalPhrase}", terminalPhrase)}</span>
                        <div className="paragraph-button">
                            {this.state.dynamicData.componentDidMount?
                                <div className="button button-primary" onClick={this.toggleConsole}>{this.props.lang.getString("home.otherthings.terminalToggle")}</div>
                            :null}
                        </div>
                    </div>
                    <div className="paragraph">
                        <span className="paragraph-title">{this.props.lang.getString("home.contactSection.title")}</span>
                        {/*<ContactForm />*/}
                        <span className="paragraph-text">{this.props.lang.getString("home.contactSection.disabled")}</span>
                    </div>
                    {/*<Link href="/more">
                        <div className="more-paragraph">
                            <span className="more-text">...</span>
                        </div>
                    </Link>*/}
                    <div className="footer">
                        <div className="social-links">
                            <a className="sociallink" href="https://twitter.com/PhilippIRL" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/twitter.svg" alt="Twitter" /></a>
                            <a className="sociallink" href="https://twitter.com/ppscanary" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/twitter.svg" alt="Twitter" /></a>
                            <a className="sociallink" href="https://youtube.com/PhilippPplusS" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/youtube.svg" alt="YouTube" /></a>
                            <a className="sociallink" href="https://instagram.com/philipp_irl" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/instagram.svg" alt="Instagram" /></a>
                            <a className="sociallink" href="https://discord.gg/BRJBhJj" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/discord.svg" alt="Discord" /></a>
                            <a className="sociallink" href="https://open.spotify.com/user/pplussmc" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/spotify.svg" alt="Spotify" /></a>
                            <a className="sociallink" href="https://tellonym.me/ppluss" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/tellonym_square.png" alt="Tellonym" /></a>
                            <a className="sociallink" href="https://keybase.io/ppluss" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/keybase.svg" alt="Keybase" /></a>
                            <a className="sociallink" href="https://t.me/philippirl" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/telegram.svg" alt="Telegram" /></a>
                            <a className="sociallink" href="https://www.snapchat.com/add/ppluss1" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/snapchat.svg" alt="Snapchat" /></a>
                            <a className="sociallink" href="https://twitch.tv/philipp_irl" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/twitch.svg" alt="Twitch" /></a>
                            <a className="sociallink" href="https://chaos.social/@philippirl" target="_blank" rel="me noopener"><img src="/assets/v6/socialmediaicons/mastodon.svg" alt="Mastodon" /></a>
                            <a className="sociallink" href="mailto:pplussinfo@gmail.com?subject=hey.&body=hi." rel="noopener"><img src="/assets/v6/socialmediaicons/email.svg" alt="E-Mail" /></a>
                        </div>
                        <div></div>
                        {/*<div className="language-switcher">
                            <select className="language-select">
                                <option name="de">Deutsch</option>
                                <option name="en">English</option>
                            </select>
                        </div>*/}
                    </div>
                </div>
                <style jsx>{`

                    .card {
                        display: flex;
                        min-height: 350px;
                        width: 100vw;
                        max-width: 350px;
                        padding: 25px;
                        flex-direction: column;
                        justify-content: flex-end;
                        align-items: flex-end;
                        text-align: right;
                        border-radius: 10px;
                        background-blend-mode: multiply;
                        margin: 10px;
                        box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
                        animation: card-in 1s;
                        transition: .2s;
                        background-color: #666;
                        background-size: 100% auto;
                    }

                    .card:hover {
                        transform: translateY(-10px);
                    }

                    @media only screen and (min-width: 870px)  {
                        .card-large {
                            max-width: 760px;
                        }
                    }
                    
                    .card-randomcode {
                        background-image: url("/assets/v6/cards/randomcode.png");
                    }

                    .card-gge {
                        background-image: url("/assets/v6/cards/gge.png");
                    }

                    .card-thispage {
                        background-image: url("/assets/v6/cards/thispage.png");
                    }

                    .card-title {
                        font-weight: bold;
                        font-size: 24px;
                    }

                    .card-description {
                        font-size: 18px;
                    }

                    @keyframes card-in {
                        from { opacity: 0; transform: translateY(25px) }
                        to { opacity: 1; }
                    }

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
                        transform: translateY(-10px);
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