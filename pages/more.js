import React from "react";
import Head from "next/head";
import Header from "../components/info/header";

export default class More extends React.Component {
    render() {
        return (
            <div className="app-root">
                <Head>
                    <title>Andere Sachen</title>
                </Head>
                <Header />
                <style jsx>{`

                    .app-root {
                        display: flex;
                        flex-direction: column;
                    }

                    .content-wrapper {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-grow: 1;
                    }

                    .placeholder {
                        margin: 10px;
                        text-align: center;
                    }
                `}</style>
                <div className="content-wrapper">
                    <span className="placeholder">hi. wie bist du hier hin gekom-... äh, egal. also hier ist noch nichts... die links oben rechts gehen übrigens auch noch nicht.</span>
                </div>
            </div>
        )
    }
}