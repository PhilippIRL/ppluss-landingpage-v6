import React from "react";

export default class ContactForm extends React.Component {

    constructor(props) {
        super(props);
        this.contactButtonPress = this.contactButtonPress.bind(this);

        this.state = {contactState: {step: 0, medium: null, action: null, text: null}, loaded: false};
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

    componentDidMount() {
        this.setState({loaded: true});
    }

    render() {
        if(!this.state.loaded) {
            return (
                <div className="paragraph-rich-content">
                    <span className="rich-content-text">Du musst JavaScript aktivieren um diesen Abschnitt nutzen zu können.</span>
                    <style jsx>{`
    
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
        }
        return (
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
    }
}