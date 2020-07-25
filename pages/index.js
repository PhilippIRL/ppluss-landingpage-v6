import Head from "next/head";
import React from "react";
import Terminal from "../components/Terminal";
import PermissionPrompt from "../components/PermissionPrompt";
import SteamNotification from "../components/SteamNotification";

export default class Home extends React.Component {

    terminalControl = null;
    steamNotificationControl = null;

    constructor(props) {
        super(props);

        this.setTerminalControl = this.setTerminalControl.bind(this);
        this.toggleConsole = this.toggleConsole.bind(this);
        this.hasAnnoyanceConsent = this.hasAnnoyanceConsent.bind(this);
        this.setSteamNotificationControl = this.setSteamNotificationControl.bind(this);

        this.state = {dynamicData: {age: null, terminalPlatform: null, componentDidMount: false}, steamNotificationState: "hide"};
    }

    setSteamNotificationControl(control) {
        this.steamNotificationControl = control;
    }

    hasAnnoyanceConsent(value) {
        if(!value) {
            if(this.steamNotificationControl) {
                this.steamNotificationControl(["schade"]);
            }
        } else {
            if(this.steamNotificationControl) {
                this.steamNotificationControl(["cool danke", "du hast 5 minuten gewartet", "und auch noch auf zulassen geklickt", "hoffe das war es wert für dieses...", "\"easteregg\"", "(wenn man es so nennen kann)", "naja", "thx 4 playing, i guess", "p.s.:", "hoffe valve verklagt mich nicht", "bzw. google sperrt mich nicht", "weil ich ahme ja deren gui nach", "wie es jedem aufgefallen ist", "(hoffentlich)", "p.p.s.:", "folgt mir auf twitter, danke", "link ist unten links"]);
            }
        }
        
    }

    setTerminalControl(terminalControl) {
        this.terminalControl = terminalControl;
    }

    toggleConsole(e) {
        e.preventDefault();
        if(this.terminalControl) {
            this.terminalControl("toggle");
        }
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

    render() {

        var agePhrase = this.state.dynamicData.age ? `Laut Berechnungen bin ich derzeit ${this.state.dynamicData.age} Jahre alt.` : "Berechnungen zur Bestimmung meines Alters laufen gerade im Hintergrund oder JavaScript ist deaktiviert.";
        var terminalPhrase;
        switch(this.state.dynamicData.terminalPlatform) {
            case "desktop":
            case "mac":
                terminalPhrase = "Das Terminal ist durch das Drücken von " + (this.state.dynamicData.terminalPlatform === "mac" ? "⌥ + T" : "Strg + T") + " oder durch den Button weiter unten wieder aufrufbar. Dachte einfach es wäre vielleicht ein nettes Feature.";
                break;
            case "mobile":
                terminalPhrase = "Das Terminal ist wieder aufrufbar. Da du auf einem Mobilgerät bist, kannst du das Terminal nur mit dem Button weiter unten öffnen und nicht per Tastenkombination";
                break;
            default:
                terminalPhrase = "Das Terminal ist für alle Nutzer außer dich wieder verfügbar. Du kannst auch zu den anderen gehören, wenn du JavaScript aktivierst.";
                break;
        }

        return (
            <div className="app-root">
                <Head>
                    <title>PplusS</title>
                    <link rel="dns-prefetch" href="https://fonts.googleapis.com"></link>
                    <meta name="description" content="Willkommen bei PplusS! Dies ist meine Webseite auf der ich, naja Text stehen hab und so... Und ich verlinke meine Social Media-Accounts!"></meta>
                </Head>
                <div className="content-wrapper">
                    <PermissionPrompt hasConsent={this.hasAnnoyanceConsent} />
                    <SteamNotification setSteamNotificationControl={this.setSteamNotificationControl} />
                    <Terminal setTerminalControl={this.setTerminalControl} />
                    <header>
                        <div className="inner-title-wrapper">
                            <span className="header-title">Willkommen bei PplusS<span className="header-version">v6</span></span>
                        </div>
                    </header>
                    <div className="paragraph">
                        <span className="paragraph-title">Über mich</span>
                        <span className="paragraph-text">Hey, ich bin Philipp. {agePhrase} Ich könnte jetzt hier noch mehr Sachen über mich erzählen, mir fällt nur leider nicht viel zu mir ein.</span>
                    </div>
                    <div className="paragraph">
                        <span className="paragraph-title">Sachen die ich mal so gemacht hab</span>
                        <span className="paragraph-text">Irgendwer meinte mal ich hätte auch mal andere Sachen gemacht als diese Seite zu bauen. Weiter unten sind, wenn ich welche finde, Beispiele aufgelistet. Desweiteren hab ich wie jeder moderne Mensch auch noch Social Media-Accounts zu welchen sich die Links in der Fußzeile befinden.</span>
                        <div className="paragraph-cards">
                            <div className="card card-gge">
                                <span className="card-title">GGE-Vertretung</span>
                                <span className="card-description">Die GGE-Vertretung ist eine App die ich mal gebaut hab. Sie kann die Vertretungen des Grashof Gymnasium Essen anzeigen.</span>
                            </div>
                            <div className="card card-thispage">
                                <span className="card-title">Diese Seite</span>
                                <span className="card-description">Ich meine, die muss ja auch irgendwo erwähnt werden. Diese Seite steht auch stellvertretend für die anderen Homepages die ich gebaut hab' hier.</span>
                            </div>
                            <div className="card card-randomcode card-large">
                                <span className="card-title">Spielereien</span>
                                <span className="card-description">Ich erstelle seit irgendwie immer aus Spaß kleinere Web-Apps, Userscripts, Android-Apps oder ganz andere Sachen. Ich hab' inzwischen schon alleine auf GitLab 80 Projekte rumliegen, dazu kommen noch welche auf GitHub und welche die ich nicht mal in eine Repo gepackt hab'. Solche Sachen erstellen macht aber irgendwie jeder der sich so für die Themen JavaScript, HTML, etc. interessiert. Bei mir machen diese Projekte aber gefühlt 90% aus, weil ich kaum bei Projekten von anderen mitmache, weil es fragt mich ja nie jemand und wieso sollte ich von mir aus fragen, ob ich bei Projekten mitmachen kann. Da kann ich mich höchstens total blamieren. Naja, vielleicht sollte ich das mal überdenken.</span>
                            </div>
                        </div>
                    </div>
                    <div className="paragraph">
                        <span className="paragraph-title">Möchte ich sonst noch etwas sagen?</span>
                        <span className="paragraph-text">Ja, sonst hätte ich schließlich diesen Abschnitt nicht eingefügt. Ich möchte darauf aufmerksam machen, dass ein Feature aus PplusSMC4 hier wieder sein Comeback hat. {terminalPhrase}</span>
                        <div className="paragraph-button">
                            {this.state.dynamicData.componentDidMount?
                                <div className="button button-primary" onClick={this.toggleConsole}>Terminal öffnen/schließen</div>
                            :null}
                        </div>
                    </div>
                    <div className="paragraph">
                        <span className="paragraph-title">Du möchtest auch noch was sagen?</span>
                        {/*<ContactForm />*/}
                        <span className="paragraph-text">Dann kontaktiere mich gerne über eine der Kontaktmöglichkeiten unten links.</span>
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
                            <a className="sociallink" href="https://tellonym.me/ppluss" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/tellonym.png" alt="Tellonym" /></a>
                            <a className="sociallink" href="https://keybase.io/ppluss" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/keybase.svg" alt="Keybase" /></a>
                            <a className="sociallink" href="https://t.me/philippirl" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/telegram.svg" alt="Telegram" /></a>
                            <a className="sociallink" href="https://www.snapchat.com/add/ppluss1" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/snapchat.svg" alt="Snapchat" /></a>
                            <a className="sociallink" href="https://twitch.tv/philipp_irl" target="_blank" rel="noopener"><img src="/assets/v6/socialmediaicons/twitch.svg" alt="Twitch" /></a>
                            <a className="sociallink" href="https://social.ppluss.de/@philipp" target="_blank" rel="me noopener"><img src="/assets/v6/socialmediaicons/mastodon.svg" alt="Mastodon" /></a>
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
                    }

                    .sociallink:hover {
                        transform: translateY(-10px);
                    }

                    .sociallink img {
                        width: 24px;
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
                        to { opacity: 1;  } 
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