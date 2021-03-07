import React from "react";
import Head from "next/head";
import Header from "../components/info/header";
import { getLang } from "../scripts/Lang";

const languageData = {
    de: {
        "more.placeholder": "hi. wie bist du hier hin gekom-... äh, egal. also hier ist noch nichts... die links oben rechts gehen übrigens auch noch nicht.",
    },
    en: {
        "more.placeholder": "hi. how did you get her-... uh, doesn't matter. so there is nothing here yet... the links in the top right don't work either yet.",
    },
}

var getTranslation = getLang(languageData);

export default class More extends React.Component {
    render() {
        let t = getTranslation(this.props.lang);
        return (
            <div className="app-root">
                <Head>
                    <title>Andere Sachen</title>
                </Head>
                <Header lang={this.props.lang} />
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
                    <span className="placeholder">{t("more.placeholder")}</span>
                </div>
            </div>
        )
    }
}