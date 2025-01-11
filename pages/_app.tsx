import React from 'react'
import EventBus from '../scripts/EventBus'
import Terminal from '../components/Terminal'
import { withRouter } from 'next/router'
import { defaultLang, getLanguagePreference, saveLanguagePreference } from '../scripts/Lang'
import styled, { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import { LangContext, EventBusContext } from '../scripts/Contexts'

import type { BusEvent } from '../scripts/EventBus'
import parseHash from '../scripts/hashparser'
import type { AppProps } from 'next/app'
import { initMsgSocket } from '../scripts/MessageSocket'

const GlobalStyle = createGlobalStyle`

    html {
        overflow-x: hidden;
        font-size: 75%;
        background-color: #090909;
    }

    body {
        margin: 0;
        background-color: #000;
        background: linear-gradient(100deg, #090909 0%, #000 100%);
        min-height: 100vh;
        font-family: Inter, sans-serif;
        color: #fff;
    }

    .app-root {
        min-height: 100vh;
    }

    body::-webkit-scrollbar {
        width: 0.6em;
    }
    
    body::-webkit-scrollbar-track {
        background-color: #151515;
    }

    body::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #bbb;
    }

    @media only screen and (max-width: 1200px) {
        html {
            font-size: 65%;
        }
    }

    @media only screen and (max-width: 1000px) {
        html {
            font-size: 55%;
        }
    }

`

const LowerCaseSpeech = createGlobalStyle`
    * {
        text-transform: lowercase;
    }
`

const NoScript = styled.noscript`
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: black;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 2rem;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
`

class App extends React.Component<AppProps> {

    eventBus: EventBus
    state = {lang: defaultLang, lowerCaseSpeech: false}

    constructor(props: AppProps) {
        super(props)

        this.onBusEvent = this.onBusEvent.bind(this)

        this.eventBus = new EventBus()
        this.eventBus.attach(this.onBusEvent)
    }

    componentDidMount() {
        this.setState({lang: getLanguagePreference()})

        let hash = parseHash()

        if(Object.prototype.hasOwnProperty.call(hash, 'term')) {
            this.eventBus.post({id: 'TERMINAL_FORCE'})
        }

        if(hash.forcecommand) {
            this.eventBus.post({id: 'TERMINAL_FORCE_COMMAND', data: hash.forcecommand})
        }

        if(hash.modal === 'impressum' || hash.modal === 'datenschutz') {
            if(window.location.pathname === '/') {
                this.props.router.push('/contact')
            }
        }

        if(window.location.hash !== '') {
            window.location.hash = ''
        }

        initMsgSocket()
    }

    onBusEvent(e: BusEvent) {
        const { id, data } = e

        switch(id) {
            case 'GOTO':
                this.props.router.push(data)
                break
            
            case 'LANG':
                if(data) {
                    saveLanguagePreference(e.data)
                    this.setState({ lang: e.data })
                }
                break

            case 'LOWERCASE_SET':
                this.setState({ lowerCaseSpeech: e.data as boolean })
                break

            case 'LOWERCASE_TOGGLE':
                this.setState({ lowerCaseSpeech: !this.state.lowerCaseSpeech })
                break
        }
    }
    
    componentWillUnmount() {
        this.eventBus.detach(this.onBusEvent)
    }

    render() {
        return (
            <LangContext.Provider value={this.state.lang}>
                <EventBusContext.Provider value={this.eventBus}>

                    <Head>
                        {/* eslint-disable */}
                        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap' />
                        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
                        {/* eslint-enable */}
                        <link rel="manifest" href="/manifest.json"/>
                    </Head>

                    <NoScript>
                        <h1>Sorry, but you need to enable Javascript to view this page.</h1>
                    </NoScript>

                    <this.props.Component {...this.props.pageProps} eventBus={this.eventBus} lang={this.state.lang} />

                    <GlobalStyle />
                    {this.state.lowerCaseSpeech ? <LowerCaseSpeech /> : null}
                    <Terminal eventBus={this.eventBus} />
                    
                </EventBusContext.Provider>
            </LangContext.Provider>
        )
    }
}

export default withRouter(App)
