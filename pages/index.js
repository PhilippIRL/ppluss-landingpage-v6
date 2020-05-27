import Head from "next/head";
import React from "react";

export default class Home extends React.Component {
    render() {
        return (
            <div className="app-root">
                <Head>
                    <title>PplusS</title>
                </Head>
                <div>
                    <Terminal />
                    <header>
                        <div className="inner-title-wrapper">
                            <span className="header-title">Willkommen bei PplusS<span className="header-version">v6</span></span>
                        </div>
                    </header>
                </div>
                <style jsx>{`
                
                    header {
                        height: 300px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .inner-title-wrapper {
                        display: flex;
                    }

                    .header-title {
                        margin: 0;
                        text-align: center;
                        display: inline;
                        font-size: 32px;
                    }

                    .header-version {
                        font-size: 16px;
                        color: gray;
                        position: relative;
                        bottom: -3px;
                    }

                `}</style>
            </div>
        )
    }
}

class Terminal extends React.Component {

    timeoutId = -1;
    prefix = "# ";
    terminalBrandString = "PplusS Landing Page v6";

    constructor(props) {
        super(props);

        this.keyHandler = this.keyHandler.bind(this);
        this.startResize = this.startResize.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
        this.typingHandler = this.typingHandler.bind(this);
        this.println = this.println.bind(this);
        this.onCommand = this.onCommand.bind(this);
        this.toggleConsole = this.toggleConsole.bind(this);

        this.state = {visible: false, anim: null, resizing: false, height: 400, typingText: "", lines: [this.terminalBrandString,""]};
    }

    onCommand(command, args) {
        switch(command) {
            case "clear":
            case "cls":
                this.setState({lines: []});
                return;
            case "print":
            case "echo":
                this.println(args.join(" "));
                return;
            case "reboot":
            case "reload":
            case "refresh":
                window.location.reload();
                return;
            case "exit":
            case "quit":
            case "close":
                this.toggleConsole();
                return;
            case "":
                return;
            case "ver":
            case "uname":
            case "lsb_release":
                this.println();
                this.println(this.terminalBrandString);
                this.println();
                return;
            case "command-not-found":
            default:
                this.println(command + ": command not found");
                return;
        }
    }

    componentDidUpdate() {
        if(this.bottomRef) {
            this.bottomRef.current.scrollIntoView();
        }
    }

    keyHandler(e) {
        if(!e.shiftKey && !e.metaKey && !e.ctrlKey && e.altKey && e.code === "KeyT") {
            e.preventDefault();
            this.toggleConsole();
        }
    }

    toggleConsole() {
        if(!this.state.visible) {
            this.setState({visible: true, anim: "in"});
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.setState({anim: null});
            }, 500);
            window.addEventListener("keyup", this.typingHandler);
        } else {
            this.setState({anim: "out"});
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.setState({visible: false, anim: null});
            }, 500);
            window.removeEventListener("keyup", this.typingHandler);
        }
    }

    println(text="") {
        var lines = this.state.lines;
        lines.push(text);
        this.setState({lines});
    } 

    typingHandler(e) {
        if(!e.metaKey && !e.ctrlKey && !e.altKey) {
            var typingText = this.state.typingText;
            if(e.code === "Backspace") {
                typingText = typingText.substr(0, typingText.length - 1);
            } else if(e.code === "Enter") {
                this.println(this.prefix + typingText);

                var args = typingText.split(" ");
                var command = args.shift();
                this.onCommand(command, args);

                typingText = "";
            } else if(e.key.length === 1) {
                typingText += e.key;
            }
            this.setState({typingText})
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.keyHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyHandler);
        
        // remove everything again just to be sure
        window.removeEventListener("mousemove", this.resizeHandler);
        window.removeEventListener("mouseup", this.resizeHandler);
        window.removeEventListener("selectstart", this.resizeHandler);
        window.removeEventListener("keyup", this.typingHandler);
    }

    resizeHandler(e) {
        if(e.type === "mouseup") {
            window.removeEventListener("mousemove", this.resizeHandler);
            window.removeEventListener("mouseup", this.resizeHandler);
            window.removeEventListener("selectstart", this.resizeHandler);
            return;
        } else if(e.type === "mousemove") {
            var height = this.state.height;
            height -= e.movementY;
            if(height < 200) {
                height = 200;
            } else if(height > (window.innerHeight - 50)) {
                height = window.innerHeight - 50;
            }
            this.setState({height});
        } else if(e.type === "selectstart") {
            e.preventDefault();
        }
    }

    startResize() {
        this.setState({resizing: true});
        window.addEventListener("mousemove", this.resizeHandler);
        window.addEventListener("mouseup", this.resizeHandler);
        window.addEventListener("selectstart", this.resizeHandler);
    }

    render() {
        this.bottomRef = null;
        if(!this.state.visible) {
            return null;
        }

        var className = "terminal";
        var height = this.state.height;

        if(this.state.anim) {
            className += " anim-" + this.state.anim;
        }

        var bottomRef = React.createRef();
        this.bottomRef = bottomRef;
        
        return (
            <div className={className}>
                <style jsx>{`

                    .terminal {
                        position: fixed;
                        bottom: 0px;
                        width: calc(100vw - 20px);
                        left: 10px;
                        right: 10px;
                        height: ${height}px;
                        background-color: #111;
                        font-family: 'Source Code Pro', monospace;
                        border-top-right-radius: 50px;
                        border-top-left-radius: 50px;
                        display: flex;
                        flex-direction: column;
                        z-index: 1;
                    }

                    .terminal::before {
                        content: "  ";
                        position: absolute;
                        height: 5px;
                        width: 50px;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 15px;
                        border-radius: 10px;
                        background-color: #fff;
                        pointer-events: none;
                    }

                    .terminal.anim-in {
                        animation: terminalInOut .5s forwards;
                    }

                    .terminal.anim-out {
                        animation: terminalInOut .5s reverse forwards;
                    }

                    @keyframes terminalInOut {
                        from {
                            transform: translateY(${height}px);
                        }
                        to {
                            transform: translateY(0px);
                        }
                    }

                    .terminal-resize-area {
                        height: 50px;
                        width: 100%;
                        cursor: ns-resize;
                    }

                    .terminal-lines {
                        margin: 10px;
                        flex-grow: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        overflow-y: auto;
                        overflow-x: hidden;
                    }

                    .terminal-line {
                        min-height: max-content;
                        word-break: break-all;
                        white-space: pre;
                    }

                    .empty-terminal-line {
                        min-height: 1em;
                    }

                    .terminal-cursor {
                        color: transparent;
                        background-color: #fff;
                        animation: cursorBlinking 1.5s infinite;
                    }

                    @keyframes cursorBlinking {
                        0% { opacity: 0; }
                        49.999% { opacity: 0; }
                        50% { opacity: 1; }
                        100% { opacity: 1; }
                    }

                `}</style>
                <div className="terminal-resize-area" onMouseDown={this.startResize}></div>
                <div className="terminal-lines">
                    {this.state.lines.map((line, index) => (
                        <span className={line === "" ? "terminal-line empty-terminal-line" : "terminal-line"} key={index}>{line}</span>
                    ))}
                    <span ref={bottomRef} className="terminal-line">
                        {this.prefix}
                        {this.state.typingText}
                        <span className="terminal-cursor">&nbsp;</span>
                    </span>
                </div>
            </div>
        )
    }
}