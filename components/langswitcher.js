import React from "react";
import { availableLangs } from "../scripts/lang";

export default class LangSwitcher extends React.Component {

    constructor(props) {
        super(props);

        this.switchLanguage = this.switchLanguage.bind(this);
    }

    switchLanguage(e, lang) {
        e.preventDefault();

        this.props.eventBus.post({id: "LANG", data: lang})
    }

    render() {
        return (
            <div className="language-switcher">
                {availableLangs.map(lang => {
                    let current = this.props.lang.langId === lang;
                    return (
                        <a key={lang} className="language-switcher-link" href="#" onClick={e => this.switchLanguage(e, lang)}>
                            <span className={current ? "language-switcher-lang current" : "language-switcher-lang"}>{lang.toUpperCase()}</span>
                        </a>
                    );
                })}
                <style jsx>{`
                    .language-switcher {
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        display: flex;

                    }
                    
                    .language-switcher-link {
                        text-decoration: none;
                    }

                    .language-switcher-lang {
                        margin-right: 5px;
                        margin-left: 5px;
                        color: #fff;
                        text-decoration: none;
                    }

                    .language-switcher-lang.current {
                        font-weight: bold;
                    }

                    .language-switcher-lang.current::after {
                        content: "-";
                        position: absolute;
                        font-weigth: bold;
                        font-size: 24px;
                        transform: translate(-16px, 3px)
                    }
                `}</style>
            </div>
        )
    }
}