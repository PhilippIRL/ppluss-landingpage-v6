import Head from "next/head";
import React from "react";

export default class Home extends React.Component {

    terminalControl = null;

    constructor(props) {
        super(props);

        this.setTerminalControl = this.setTerminalControl.bind(this);
        this.toggleConsole = this.toggleConsole.bind(this);
        this.contactButtonPress = this.contactButtonPress.bind(this);

        this.state = {dynamicData: {age: null, terminalPlatform: null}, contactState: {step: 0, medium: null, action: null, text: null}};
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

        this.setState({dynamicData});

    }

    contactButtonPress(data, e) {
        var contactState = this.state.contactState;
        switch(data) {
            case "step1_yes":
                contactState.step = 1;
                contactState.text = "Jetzt rein hypothetisch: Wenn du mich kontaktieren wollen würdest, welche Kommunikationsmöglichkeit wäre dir da am liebsten?";
                break;
            case "step1_no":
                contactState.step = -1;
                contactState.text = "Schade.";
                break;
            case "step2_discord":
                contactState.medium = "discord";
                contactState.action = "Discord öffnen";
                contactState.text = "Ja, dann lass die Hypothese doch vielleicht wahr werden?";
                contactState.step = 2;
                break;
            case "step2_telegram":
                contactState.medium = "telegram";
                contactState.action = "Telegram öffnen";
                contactState.text = "Ja, dann lass die Hypothese doch vielleicht wahr werden?";
                contactState.step = 2;
                break;
            case "step2_twitter":
                contactState.medium = "twitter";
                contactState.action = "Twitter öffnen";
                contactState.text = "Ja, dann lass die Hypothese doch vielleicht wahr werden?";
                contactState.step = 2;
                break;
            case "step2_mastodon":
                contactState.medium = "mastodon";
                contactState.action = "Mastodon öffnen";
                contactState.text = "Ja, dann lass die Hypothese doch vielleicht wahr werden?";
                contactState.step = 2;
                break;
            case "step2_email":
                contactState.medium = "email";
                contactState.action = "E-Mail verfassen";
                contactState.text = "Ja, dann lass die Hypothese doch vielleicht wahr werden?";
                contactState.step = 2;
                break;
            case "step2_instagram":
                contactState.medium = "instagram";
                contactState.action = "Instagram öffnen";
                contactState.text = "Ja, dann lass die Hypothese doch vielleicht wahr werden?";
                contactState.step = 2;
                break;
            case "step3_action":
                switch(contactState.medium) {
                    case "discord":
                        window.open("https://discord.gg/BRJBhJj");
                        break;
                    case "telegram":
                        window.open("https://t.me/philippirl");
                        break;
                    case "twitter":
                        window.open("https://twitter.com/messages/compose?recipient_id=3400004517");
                        break;
                    case "mastodon":
                        window.open("https://social.ppluss.de/@philipp");
                        break;
                    case "email":
                        window.location.href = "mailto:pplussinfo@gmail.com?subject=Hey!";
                        break;
                    case "instagram":
                        window.open("https://www.instagram.com/philipp_irl");
                        break;
                }
                return;
        }
        this.setState({contactState});
    }

    render() {

        var agePhrase = this.state.dynamicData.age ? `Laut Berechnungen bin ich derzeit ${this.state.dynamicData.age} Jahre alt.` : "Berechnungen zur Bestimmung meines Alters laufen gerade im Hintergrund oder JavaScript ist deaktiviert.";
        var terminalPhrase;
        switch(this.state.dynamicData.terminalPlatform) {
            case "desktop":
                terminalPhrase = "ist durch das Drücken von Alt + T wieder aufrufbar. Dachte einfach es wäre vielleicht ein nettes Feature.";
                break;
            case "mac":
                terminalPhrase = "ist durch das Drücken von ⌥ + T wieder aufrufbar. Dachte einfach es wäre vielleicht ein nettes Feature.";
                break;
            case "mobile":
                terminalPhrase = "ist auf Desktop-Geräten wieder aufrufbar. Mit deinem Mobilgerät ist es leider nicht kompatibel. Sorry. Du kannst trotzdem versuchen auf den Link \"Terminal\" weiter oben zu tippen, es wird aber leider keine Tastatur erscheinen. Wahrscheinlich fixe ich das in naher Zukunft.";
                break;
            default:
                terminalPhrase = "ist theoretisch durch das Drücken von Alt + T bzw. Option + T wieder aufrufbar. Bei dir aber wahrscheinlich nicht, weil du JavaScript deaktiviert hast.";
                break;
        }

        var contactElements = (
            <div className="paragraph-rich-content">
                <span className="rich-content-text">{this.state.contactState.text}</span>
                {this.state.contactState.step == 0 ?
                    <div className="rich-content-buttons">
                        <div className="button button-primary" onClick={(e) => this.contactButtonPress("step1_yes", e)}>Ja</div>
                        <div className="button" onClick={(e) => this.contactButtonPress("step1_no", e)}>Nein</div>
                    </div>
                : null}
                {this.state.contactState.step == 1 ?
                    <div className="rich-content-buttons">
                        <div className="button" onClick={(e) => this.contactButtonPress("step2_discord", e)}>Discord</div>
                        <div className="button" onClick={(e) => this.contactButtonPress("step2_telegram", e)}>Telegram</div>
                        <div className="button" onClick={(e) => this.contactButtonPress("step2_twitter", e)}>Twitter</div>
                        <div className="button" onClick={(e) => this.contactButtonPress("step2_mastodon", e)}>Mastodon</div>
                        <div className="button" onClick={(e) => this.contactButtonPress("step2_email", e)}>E-Mail</div>
                        <div className="button" onClick={(e) => this.contactButtonPress("step2_instagram", e)}>Instagram</div>
                    </div>
                : null}
                {this.state.contactState.step == 2 ?
                    <div className="rich-content-buttons">
                        <div className="button button-primary" onClick={(e) => this.contactButtonPress("step3_action", e)}>{this.state.contactState.action}</div>
                    </div>
                : null}
                <style jsx>{`
                    .rich-content-buttons {
                        display: flex;
                        justify-content: center;
                        margin: 10px;
                        flex-wrap: wrap;
                        margin-bottom: 0;
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

                    .paragraph-rich-content {
                        animation: paragraph-text-in 1s;
                        display: flex;
                        flex-direction: column;
                    }

                    .rich-content-text {
                        margin-left: 20px;
                        margin-right: 20px;
                    }

                    @keyframes paragraph-text-in {
                        from { opacity: 0; transform: translateX(25px) }
                        to { opacity: 1; }
                    }
                `}</style>
            </div>
        );

        return (
            <div className="app-root">
                <Head>
                    <title>PplusS</title>
                </Head>
                <div className="content-wrapper">
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
                        <span className="paragraph-title">Sachen die ich mal so gemacht hab'</span>
                        <span className="paragraph-text">Irgendwer meinte mal ich hätte auch mal andere Sachen gemacht als diese Seite zu bauen. Weiter unten sind, wenn ich welche finde, Beispiele aufgelistet. Desweiteren hab' ich wie jeder moderne Mensch auch noch Social Media-Accounts zu welchen sich die Links in der Fußzeile befinden.</span>
                        <div className="paragraph-cards">
                            <div className="card card-gge">
                                <span className="card-title">GGE-Vertretung</span>
                                <span className="card-description">Die GGE-Vertretung ist eine App die ich mal gebaut hab'. Sie kann die Vertretungen des Grashof Gymnasium Essen anzeigen.</span>
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
                        <span className="paragraph-text">Ja, sonst hätte ich schließlich diesen Abschnitt nicht eingefügt. Ich möchte darauf aufmerksam machen, dass ein Feature aus PplusSMC4 hier wieder sein Comeback hat. Das <a href="#" onClick={this.toggleConsole}>Terminal</a> {terminalPhrase}</span>
                    </div>
                    <div className="paragraph">
                        <span className="paragraph-title">Möchtest du auch noch was sagen?</span>
                        {contactElements}
                    </div>
                    <div className="social-links">
                        <a className="sociallink" href="https://twitter.com/PhilippIRL" target="_blank"><img src="/assets/v6/socialmediaicons/twitter.svg" alt="Twitter" /></a>
                        <a className="sociallink" href="https://twitter.com/ppscanary" target="_blank"><img src="/assets/v6/socialmediaicons/twitter.svg" alt="Twitter" /></a>
                        <a className="sociallink" href="https://youtube.com/PhilippPplusS" target="_blank"><img src="/assets/v6/socialmediaicons/youtube.svg" alt="YouTube" /></a>
                        <a className="sociallink" href="https://instagram.com/philipp_irl" target="_blank"><img src="/assets/v6/socialmediaicons/instagram.svg" alt="Instagram" /></a>
                        <a className="sociallink" href="https://discord.gg/BRJBhJj" target="_blank"><img src="/assets/v6/socialmediaicons/discord.svg" alt="Discord" /></a>
                        <a className="sociallink" href="https://open.spotify.com/user/pplussmc" target="_blank"><img src="/assets/v6/socialmediaicons/spotify.svg" alt="Spotify" /></a>
                        <a className="sociallink" href="https://tellonym.me/ppluss" target="_blank"><img src="/assets/v6/socialmediaicons/tellonym.png" alt="Tellonym" /></a>
                        <a className="sociallink" href="https://keybase.io/ppluss" target="_blank"><img src="/assets/v6/socialmediaicons/keybase.svg" alt="Keybase" /></a>
                        <a className="sociallink" href="https://t.me/philippirl" target="_blank"><img src="/assets/v6/socialmediaicons/telegram.svg" alt="Telegram" /></a>
                        <a className="sociallink" href="https://www.snapchat.com/add/ppluss1" target="_blank"><img src="/assets/v6/socialmediaicons/snapchat.svg" alt="Snapchat" /></a>
                        <a className="sociallink" href="https://twitch.tv/philipp_irl" target="_blank"><img src="/assets/v6/socialmediaicons/twitch.svg" alt="Twitch" /></a>
                        <a className="sociallink" href="https://social.ppluss.de/@philipp" target="_blank" rel="me"><img src="/assets/v6/socialmediaicons/mastodon.svg" alt="Mastodon" /></a>
                        <a className="sociallink" href="mailto:pplussinfo@gmail.com?subject=hey.&body=hi."><img src="/assets/v6/socialmediaicons/email.svg" alt="E-Mail" /></a>
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
                        /*background-repeat: no-repeat;*/
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

                `}</style>
            </div>
        )
    }
}

class Terminal extends React.Component {

    timeoutId = -1;
    prefix = "# ";
    terminalBrandString = "PplusS Landing Page v6";
    touchStartY = 0;

    constructor(props) {
        super(props);

        this.keyHandler = this.keyHandler.bind(this);
        this.startResize = this.startResize.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
        this.typingHandler = this.typingHandler.bind(this);
        this.println = this.println.bind(this);
        this.onCommand = this.onCommand.bind(this);
        this.toggleConsole = this.toggleConsole.bind(this);
        this.terminalControlFunction = this.terminalControlFunction.bind(this);

        if(props.setTerminalControl) {
            props.setTerminalControl(this.terminalControlFunction);
        }

        this.state = {visible: false, anim: null, resizing: false, height: 400, typingText: "", lines: [this.terminalBrandString,""]};
    }

    terminalControlFunction(command) {
        if(command === "toggle") {
            this.toggleConsole();
        }
    }

    onCommand(command, args) {
        switch(command) {
            case "clear":
            case "cls":
                this.setState({lines: []});
                return;
            case "print":
            case "echo":
                this.println(args.join(" "));
                return;
            case "reboot":
            case "reload":
            case "refresh":
                window.location.reload();
                return;
            case "exit":
            case "quit":
            case "close":
                this.toggleConsole();
                return;
            case "":
                return;
            case "ver":
            case "uname":
            case "lsb_release":
                this.println();
                this.println(this.terminalBrandString);
                this.println();
                return;
            case "startx":
                this.println("Das hier ist nicht PplusSMC 4");
                return;
            case "command-not-found":
            default:
                this.println(command + ": command not found");
                return;
        }
    }

    componentDidUpdate() {
        if(this.bottomRef) {
            this.bottomRef.current.scrollIntoView();
        }
    }

    keyHandler(e) {
        if(!e.shiftKey && !e.metaKey && !e.ctrlKey && e.altKey && e.code === "KeyT") {
            e.preventDefault();
            this.toggleConsole();
        }
    }

    toggleConsole() {
        if(!this.state.visible) {
            this.setState({visible: true, anim: "in"});
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.setState({anim: null});
            }, 500);
            window.addEventListener("keyup", this.typingHandler);
        } else {
            this.setState({anim: "out"});
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.setState({visible: false, anim: null});
            }, 500);
            window.removeEventListener("keyup", this.typingHandler);
        }
    }

    println(text="") {
        var lines = this.state.lines;
        lines.push(text);
        this.setState({lines});
    } 

    typingHandler(e) {
        if(!e.metaKey && !e.ctrlKey && !e.altKey) {
            var typingText = this.state.typingText;
            if(e.code === "Backspace") {
                typingText = typingText.substr(0, typingText.length - 1);
            } else if(e.code === "Enter") {
                this.println(this.prefix + typingText);

                var args = typingText.split(" ");
                var command = args.shift();
                this.onCommand(command, args);

                typingText = "";
            } else if(e.key.length === 1) {
                typingText += e.key;
            }
            this.setState({typingText})
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.keyHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyHandler);
        
        // remove everything again just to be sure
        window.removeEventListener("mousemove", this.resizeHandler);
        window.removeEventListener("mouseup", this.resizeHandler);
        window.removeEventListener("selectstart", this.resizeHandler);
        window.removeEventListener("touchmove", this.resizeHandler, {passive: false});
        window.removeEventListener("touchend", this.resizeHandler);
        window.removeEventListener("keyup", this.typingHandler);
    }

    resizeHandler(e) {
        if(e.type === "mouseup" || e.type === "touchend") {
            window.removeEventListener("mousemove", this.resizeHandler);
            window.removeEventListener("mouseup", this.resizeHandler);
            window.removeEventListener("selectstart", this.resizeHandler);
            window.removeEventListener("touchmove", this.resizeHandler, {passive: false});
            window.removeEventListener("touchend", this.resizeHandler);
        } else if(e.type === "mousemove" || e.type === "touchmove") {
            var height = this.state.height;
            if(e.type === "mousemove") {
                height -= e.movementY;
            } else if(e.type === "touchmove") {
                height -= (e.touches[0].screenY - this.touchStartY);
                this.touchStartY = e.touches[0].screenY;
            }
            if(height < 200) {
                height = 200;
            } else if(height > (window.innerHeight - 50)) {
                height = window.innerHeight - 50;
            }
            this.setState({height});
            if(e.cancelable) {
                e.preventDefault();
            }
        } else if(e.type === "selectstart") {
            e.preventDefault();
        }
    }

    startResize(e) {
        this.setState({resizing: true});
        window.addEventListener("mousemove", this.resizeHandler);
        window.addEventListener("mouseup", this.resizeHandler);
        window.addEventListener("selectstart", this.resizeHandler);
        window.addEventListener("touchmove", this.resizeHandler, {passive: false});
        window.addEventListener("touchend", this.resizeHandler);
        if(e.type === "touchstart") {
            this.touchStartY = e.touches[0].screenY;
        }
    }

    render() {
        this.bottomRef = null;
        this.keyboardOpenerRef = null;

        if(!this.state.visible) {
            return null;
        }

        var className = "terminal";
        var height = this.state.height;

        if(this.state.anim) {
            className += " anim-" + this.state.anim;
        }

        var bottomRef = React.createRef();
        this.bottomRef = bottomRef;

        return (
            <div className={className}>
                <style jsx>{`

                    .terminal {
                        position: fixed;
                        bottom: 0px;
                        width: calc(100vw - 20px);
                        left: 10px;
                        right: 10px;
                        height: ${height}px;
                        background-color: #111;
                        font-family: 'Source Code Pro', monospace;
                        border-top-right-radius: 50px;
                        border-top-left-radius: 50px;
                        display: flex;
                        flex-direction: column;
                        z-index: 1;
                    }

                    .terminal::before {
                        content: "  ";
                        position: absolute;
                        height: 5px;
                        width: 50px;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 15px;
                        border-radius: 10px;
                        background-color: #fff;
                        pointer-events: none;
                    }

                    .terminal.anim-in {
                        animation: terminalInOut .5s forwards;
                    }

                    .terminal.anim-out {
                        animation: terminalInOut .5s reverse forwards;
                    }

                    @keyframes terminalInOut {
                        from {
                            transform: translateY(${height}px);
                        }
                        to {
                            transform: translateY(0px);
                        }
                    }

                    .terminal-resize-area {
                        min-height: 50px;
                        width: 100%;
                        cursor: ns-resize;
                    }

                    .terminal-lines {
                        margin: 10px;
                        flex-grow: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        overflow-y: auto;
                        overflow-x: hidden;
                    }

                    .terminal-line {
                        min-height: max-content;
                        word-break: break-all;
                        white-space: pre;
                    }

                    .empty-terminal-line {
                        min-height: 1em;
                    }

                    .terminal-cursor {
                        color: transparent;
                        background-color: #fff;
                        animation: cursorBlinking 1.5s infinite;
                    }

                    @keyframes cursorBlinking {
                        0% { opacity: 0; }
                        49.999% { opacity: 0; }
                        50% { opacity: 1; }
                        100% { opacity: 1; }
                    }

                `}</style>
                <div className="terminal-resize-area" onMouseDown={this.startResize} onTouchStart={this.startResize}></div>
                <div className="terminal-lines" onFocus={this.focusInput}>
                    {this.state.lines.map((line, index) => (
                        <span className={line === "" ? "terminal-line empty-terminal-line" : "terminal-line"} key={index}>{line}</span>
                    ))}
                    <span ref={bottomRef} className="terminal-line">
                        {this.prefix}
                        {this.state.typingText}
                        <span className="terminal-cursor">&nbsp;</span>
                    </span>
                </div>
            </div>
        )
    }
}