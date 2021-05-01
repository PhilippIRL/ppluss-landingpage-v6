import React from "react";
import Head from "next/head";

export default class PermissionPrompt extends React.Component {

    timeoutId = null;
    eventBus = null;

    constructor(props) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
        this.eventBus = props.eventBus;

        this.onBusEvent = this.onBusEvent.bind(this);
        this.eventBus.attach(this.onBusEvent);

        this.state = {website: "Diese Webseite", display: false};
    } 

    onBusEvent(msg) {
        if(msg.id === "FORCE_PERM_PROMPT") {
            clearTimeout(this.timeoutId);
            this.setState({display: true});
        }
    }

    componentDidMount() {
        if(!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) { // if desktop
            this.setState({website: window.location.host});
            this.timeoutId = setTimeout(() => {
                this.setState({display: true});
            }, 5 * 60 * 1000);
        }
    }

    componentWillUnmount() {
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.eventBus.detach(this.onBusEvent);
    }

    onButtonClick(which, e) {
        this.setState({display: false});
        this.eventBus.post({id: "HAS_CONSENT", data: (which === "allow")});
    }

    render() {
        if(this.state.display) {
            return (
                <div className="prompt">
                    <Head>
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,300&display=swap"></link>
                        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                    </Head>
                    <style jsx>{`
    
                    .prompt {
                        width: 320px;
                        height: 130px;
                        position: fixed;
                        left: 109px;
                        top: 0;
                        background-color: #fff;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.5);
                        border-radius: 3px;
                        font-family: "Roboto";
                        animation: fadein .25s;
                        z-index: 100000;
                        cursor: default;
                        user-select: none;
                        color: #000;
                    }
                    
                    @keyframes fadein {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    .title {
                        position: absolute;
                        left: 16px;
                        top: 20px;
                        font-weight: 355;
                        font-size: 15px;
                    }
                    
                    .closebtn {
                        position: absolute;
                        top: 6px;
                        right: 5px;
                        color: #5f6368;
                        cursor: default;
                    }
                    
                    .closebtn .material-icons {
                        font-size: 20px;
                    }
                    
                    .permissionicon {
                        position: absolute;
                        left: 16px;
                        top: 47px;
                        color: #9aa0a6;
                    }
                    
                    .permissionicon .material-icons {
                        font-size: 20px;
                    }
                    
                    .permissiontext {
                        position: absolute;
                        left: 47px;
                        top: 51px;
                        font-size: 12px;
                        font-weight: 375;
                    }
                    
                    .button_container {
                        position: absolute;
                        bottom: 15px;
                        right: 15px;
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-end;
                        width: auto;
                    }
                    
                    .button {
                        font-size: 12px;
                        padding-top: 8px;
                        padding-bottom: 8px;
                        padding-left: 16px;
                        padding-right: 16px;
                        border: #dadce0 1px solid;
                        border-radius: 4px;
                        color: #1a73e8;
                        margin-left: 8px;
                        font-weight: 500;
                        user-select: none;
                        cursor: default;
                    }
                    
                    @media (prefers-color-scheme: dark) {
                        .prompt {
                            background-color: #292a2d;
                            color: #e8eaed;
                        }
                    
                        .closebtn {
                            color: #9aa0a6;
                        }
                    
                        .button {
                            border-color: #3c4043;
                            color: #8ab4f8;
                        }        
                    }
    
                    `}</style>
                    <span className="title">{this.state.website} möchte:</span>
                    <div className="closebtn" onClick={e => this.onButtonClick("close", e)}>
                        <i className="material-icons">close</i>
                    </div>
                    <div className="permissionicon">
                        <i className="material-icons">notifications_active</i>
                    </div>
                    <span className="permissiontext">Dir auf die Nerven gehen</span>
                    <div className="button_container">
                        <div className="button button_allow" onClick={e => this.onButtonClick("allow", e)}>Zulassen</div>
                        <div className="button button_block" onClick={e => this.onButtonClick("block", e)}>Blockieren</div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}