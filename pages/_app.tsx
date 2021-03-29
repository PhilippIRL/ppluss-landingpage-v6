import React from "react";
import EventBus from "../scripts/EventBus";
import Terminal from "../components/Terminal";
import { withRouter } from "next/router";
import { defaultLang, getLanguagePreference, saveLanguagePreference } from "../scripts/Lang";
import { createGlobalStyle } from "styled-components";
import Head from "next/head";

import type { BusEvent } from "../scripts/EventBus";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        background: linear-gradient(115deg, #303030 0%, #252525 100%);
        min-height: 100vh;
        font-family: "Nunito", sans-serif;
        color: #fff;
    }

    .app-root {
        min-height: 100vh;
    }
`;

class App extends React.Component<any> {

    eventBus: EventBus;
    state = {lang: defaultLang};

    constructor(props: any) {
        super(props);

        this.onBusEvent = this.onBusEvent.bind(this);

        this.eventBus = new EventBus();
        this.eventBus.attach(this.onBusEvent);
    }

    componentDidMount() {
        let languagePreference = getLanguagePreference();
        this.setState({lang: languagePreference});
    }

    onBusEvent(e: BusEvent) {
        if(e.id === "GOTO" && e.data) {
            this.props.router.push(e.data);
        } else if(e.id === "LANG" && e.data) {
            saveLanguagePreference(e.data);
            this.setState({lang:e.data});
        }
    }
    
    componentWillUnmount() {
        this.eventBus.detach(this.onBusEvent);
    }

    render() {
        return (
            <>
                <Head>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" />
                    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
                </Head>
                <GlobalStyle />
                <this.props.Component {...this.props.pageProps} eventBus={this.eventBus} lang={this.state.lang} />
                <Terminal eventBus={this.eventBus} />
            </>
        );
    }
}

export default withRouter(App);
