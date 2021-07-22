import React from "react";
import EventBus from "../scripts/EventBus";
import Terminal from "../components/Terminal";
import { withRouter } from "next/router";
import { defaultLang, getLanguagePreference, saveLanguagePreference } from "../scripts/Lang";
import { createGlobalStyle, keyframes } from "styled-components";
import Head from "next/head";
import { LangContext, EventBusContext } from "../scripts/Contexts";

import type { BusEvent } from "../scripts/EventBus";
import parseHash from "../scripts/hashparser";

const GlobalStyle = createGlobalStyle`

    html {
        overflow-x: hidden;
    }

    body {
        margin: 0;
        background: linear-gradient(153deg, rgba(34,34,34,1) 0%, rgba(20,20,20,1) 100%);
        min-height: 100vh;
        font-family: "Nunito", sans-serif;
        color: #fff;
    }

    .app-root {
        min-height: 100vh;
    }

    body::-webkit-scrollbar {
        width: 0.4em;
    }
    
    body::-webkit-scrollbar-track {
        background-color: #151515;
    }

    body::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #bbb;
    }
`;

const LowerCaseSpeech = createGlobalStyle`
    * {
        text-transform: lowercase;
    }
`;

class App extends React.Component<any> {

    eventBus: EventBus;
    state = {lang: defaultLang, lowerCaseSpeech: false};

    constructor(props: any) {
        super(props);

        this.onBusEvent = this.onBusEvent.bind(this);

        this.eventBus = new EventBus();
        this.eventBus.attach(this.onBusEvent);
    }

    componentDidMount() {
        let languagePreference = getLanguagePreference();
        this.setState({lang: languagePreference});
        let hash = parseHash();

        if(hash.term !== undefined) {
            this.eventBus.post({id: "TERMINAL_FORCE"});
        }

        if(hash.perm !== undefined) {
            this.eventBus.post({id: "FORCE_PERM_PROMPT"});
        }

        if(hash.prmt) {
            let data = hash.prmt.split(",");
            this.eventBus.post({id: "STEAM_PROMPT", data});
        }

        if(hash.forcecommand !== undefined) {
            this.eventBus.post({id: "TERMINAL_FORCE_COMMAND", data: hash.forcecommand});
        }

        if(hash.modal && (hash.modal === "impressum" || hash.modal === "datenschutz")) {
            if(window.location.pathname === "/") {
                this.props.router.push("/contact");
            }
        }

        window.location.hash = "";
    }

    onBusEvent(e: BusEvent) {
        if(e.id === "GOTO" && e.data) {
            this.props.router.push(e.data);
        } else if(e.id === "LANG" && e.data) {
            saveLanguagePreference(e.data);
            this.setState({lang:e.data});
        } else if(e.id === "LOWERCASE_SET") {
            this.setState({lowerCaseSpeech: e.data as boolean})
        } else if(e.id === "LOWERCASE_TOGGLE") {
            this.setState({lowerCaseSpeech: !this.state.lowerCaseSpeech})
        }
    }
    
    componentWillUnmount() {
        this.eventBus.detach(this.onBusEvent);
    }

    render() {
        return (
            <LangContext.Provider value={this.state.lang}>
                <EventBusContext.Provider value={this.eventBus}>
                    <Head>
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" />
                        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
                        <link rel="manifest" href="/manifest.json"/>
                    </Head>
                    <GlobalStyle />
                    {this.state.lowerCaseSpeech ? <LowerCaseSpeech /> : null}
                    <this.props.Component {...this.props.pageProps} eventBus={this.eventBus} lang={this.state.lang} />
                    <Terminal eventBus={this.eventBus} />
                </EventBusContext.Provider>
            </LangContext.Provider>
        );
    }
}

export default withRouter(App);
