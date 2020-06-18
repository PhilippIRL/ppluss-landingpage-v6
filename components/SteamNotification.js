import React from "react";

export default class SteamNotification extends React.Component {

    pendingMessages = [];
    intervalId = null;

    constructor(props) {
        super(props);

        this.displayMessage = this.displayMessage.bind(this);
        this.steamNotificationControl = this.steamNotificationControl.bind(this);
        this.nextMessage = this.nextMessage.bind(this);

        this.state = {display: "hide", message: null};
    }

    componentWillUnmount() {
        if(this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    componentDidMount() {
        if(this.props.setSteamNotificationControl) {
            this.props.setSteamNotificationControl(this.steamNotificationControl);
        }
    }

    nextMessage() {
        if(this.pendingMessages.length !== 0) {
            var message = this.pendingMessages.shift();
            this.displayMessage(message);
        } else {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    steamNotificationControl(messages) {
        this.pendingMessages = this.pendingMessages.concat(messages);
        if(!this.intervalId) {
            this.nextMessage();
            this.intervalId = setInterval(this.nextMessage, 4000);
        }
    }

    displayMessage(message) {
        this.setState({display: "normal", message})
        setTimeout(() => {
            this.setState({display: "fadeout"});
            setTimeout(() => {
                this.setState({display: "hide"});
            }, 250);
        }, 3000);
    }

    render() {
        if(this.state.display === "hide") {
            return null;
        }
        return (
            <div className={this.state.display === "fadeout" ? "fadeout steam-notification" : "steam-notification"}>
                <style jsx>{`
                    .steam-notification {
                        position: fixed;
                        right: 0;
                        bottom: 0;
                        height: 72px;
                        width: 238px;
                        background: linear-gradient(180deg, rgba(42,46,51,1) 0%, rgba(20,28,43,1) 75%);
                        border-top: 1px solid #121a2a;
                        border-left: 1px solid #121a2a;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        padding-left: 18px;
                        font-family: "Motiva Sans", "Arial", "Nunito", sans-serif;
                        animation: slidein .25s linear;
                    }

                    .fadeout {
                        animation: slideout .25s linear;
                        animation-fill-mode: forwards;
                    }

                    @keyframes slidein {
                        from {transform: translateY(100%);}
                        to {transform: translateY(0);}
                    }

                    @keyframes slideout {
                        from {transform: translateY(0);}
                        to {transform: translateY(100%);}
                    }

                    .avatar {
                        width: 32px;
                        height: 32px;
                        border: 2px solid #53a4c4;
                    }

                    .texts {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        margin-left: 9px;
                    }

                    .text {
                        font-size: 11px;
                        line-height: 14px;
                    }

                    .username {
                        color: #53a4c4;
                    }

                    .action {
                        color: gray;
                    }

                    .message {
                        color: #a8acb3;
                    }

                `}</style>
                <img className="avatar" src="https://ppluss.de/logo.png"></img>
                <div className="texts">
                    <span className="text username">Philipp</span>
                    <span className="text action">sagt:</span>
                    <span className="text message">{this.state.message}</span>
                </div>
            </div>
        );
    }
}