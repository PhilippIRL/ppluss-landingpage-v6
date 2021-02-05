import "../styles/global.css";
import React from "react";
import EventBus from "../scripts/EventBus";
import Terminal from "../components/Terminal";
import { withRouter } from "next/router";
import { getLang } from "../scripts/lang";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.onBusEvent = this.onBusEvent.bind(this);

        this.eventBus = new EventBus();
        this.eventBus.attach(this.onBusEvent);

        let lang = "en";
        if(typeof navigator !== "undefined" && navigator.language) {
            if(navigator.language.startsWith("de")) {
                lang = "de";
            }
        }

        this.state = {lang};
    }

    onBusEvent(e) {
        if(e.id === "GOTO" && e.data) {
            this.props.router.push(e.data);
        } else if(e.id === "LANG" && e.data) {
            this.setState({lang:e.data});
        }
    }
    
    componentWillUnmount() {
        this.eventBus.detach(this.onBusEvent);
    }

    render() {
        return (
            <>
                <this.props.Component {...this.props.pageProps} eventBus={this.eventBus} lang={getLang(this.state.lang)} langId={this.state.lang} />
                <Terminal eventBus={this.eventBus} />
            </>
        );
    }
}

export default withRouter(App);
