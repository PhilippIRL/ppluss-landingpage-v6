import React from "react";
import { availableLangs } from "../scripts/Lang";

export default class Terminal extends React.Component {

    timeoutId = -1;
    prefix = "# ";
    terminalBrandString = "PplusS Landing Page v6";
    touchStartY = 0;
    eventBus = null;

    constructor(props) {
        super(props);

        this.keyHandler = this.keyHandler.bind(this);
        this.startResize = this.startResize.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
        this.typingHandler = this.typingHandler.bind(this);
        this.println = this.println.bind(this);
        this.onCommand = this.onCommand.bind(this);
        this.toggleConsole = this.toggleConsole.bind(this);
        this.focusInput = this.focusInput.bind(this);
        this.onBusEvent = this.onBusEvent.bind(this);

        this.eventBus = props.eventBus;
        this.eventBus.attach(this.onBusEvent);

        this.state = {visible: false, anim: null, resizing: false, height: 400, typingText: "", lines: [this.terminalBrandString,""]};
    }

    onBusEvent(msg) {
        if(msg.id === "TERMINAL_TOGGLE") {
            this.toggleConsole();
        }
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
            case "startx":
                this.println("Das hier ist nicht PplusSMC 4");
                return;
            case "testing":
                window.location.href = "https://ppluss.de/hub.html";
                return;
            case "more":
                this.eventBus.post({id: "GOTO", data: "/more"});;
                return;
            case "home":
                this.eventBus.post({id: "GOTO", data: "/"});
                return;
            case "lang":
            case "langs":
                if(args[0]) {
                    if(availableLangs.includes(args[0])) {
                        this.eventBus.post({id: "LANG", data: args[0]});
                    } else {
                        this.println("Invalid language");
                    }
                } else {
                    this.println("Available languages: " + availableLangs.join(", "))
                    this.println("Please note that the terminal will always be in English")
                }
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
        this.focusInput();
    }

    focusInput() {
        if(this.inputRef) {
            this.inputRef.current.focus();
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
        } else {
            this.setState({anim: "out"});
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.setState({visible: false, anim: null});
            }, 500);
        }
    }

    println(text="") {
        var lines = this.state.lines;
        lines.push(text);
        this.setState({lines});
    } 

    typingHandler(e) {
        var typingText = null;

        if(e.type === "change") {
            typingText = e.target.value;
        } else if(e.type === "submit") {
            e.preventDefault();

            typingText = this.state.typingText;

            this.println(this.prefix + typingText);
            var args = typingText.split(" ");
            var command = args.shift();
            this.onCommand(command, args);

            typingText = "";
            if(this.inputRef) this.inputRef.current.value = "";
        }

        this.setState({typingText});
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
        window.removeEventListener("touchmove", this.resizeHandler, {passive: false});
        window.removeEventListener("touchend", this.resizeHandler);
        window.removeEventListener("keyup", this.typingHandler);

        this.eventBus.detach(this.onBusEvent);
    }

    resizeHandler(e) {
        if(e.type === "mouseup" || e.type === "touchend") {
            window.removeEventListener("mousemove", this.resizeHandler);
            window.removeEventListener("mouseup", this.resizeHandler);
            window.removeEventListener("selectstart", this.resizeHandler);
            window.removeEventListener("touchmove", this.resizeHandler, {passive: false});
            window.removeEventListener("touchend", this.resizeHandler);
        } else if(e.type === "mousemove" || e.type === "touchmove") {
            var height = this.state.height;
            if(e.type === "mousemove") {
                height -= e.movementY;
            } else if(e.type === "touchmove") {
                height -= (e.touches[0].screenY - this.touchStartY);
                this.touchStartY = e.touches[0].screenY;
            }
            if(height < 200) {
                height = 200;
            } else if(height > (window.innerHeight - 50)) {
                height = window.innerHeight - 50;
            }
            this.setState({height});
            if(e.cancelable) {
                e.preventDefault();
            }
        } else if(e.type === "selectstart") {
            e.preventDefault();
        }
    }

    startResize(e) {
        this.setState({resizing: true});
        window.addEventListener("mousemove", this.resizeHandler);
        window.addEventListener("mouseup", this.resizeHandler);
        window.addEventListener("selectstart", this.resizeHandler);
        window.addEventListener("touchmove", this.resizeHandler, {passive: false});
        window.addEventListener("touchend", this.resizeHandler);
        if(e.type === "touchstart") {
            this.touchStartY = e.touches[0].screenY;
        }
    }

    render() {
        this.bottomRef = null;
        this.inputRef = null;
        this.keyboardOpenerRef = null;

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

        var inputRef = React.createRef();
        this.inputRef = inputRef;

        return (
            <div className={className} style={{height: height + "px"}} onClick={this.focusInput}>
                <style jsx>{`

                    .terminal {
                        position: fixed;
                        bottom: 0px;
                        width: calc(100vw - 20px);
                        left: 10px;
                        right: 10px;
                        height: 400px;
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
                            transform: translateY(100%);
                        }
                        to {
                            transform: translateY(0px);
                        }
                    }

                    .terminal-resize-area {
                        min-height: 50px;
                        width: 100%;
                        cursor: ns-resize;
                        touch-action: none;
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
                        animation: cursorBlinking 1.5s;
                        animation-iteration-count: infinite;
                    }

                    @keyframes cursorBlinking {
                        0% { opacity: 0; }
                        49.999% { opacity: 0; }
                        50% { opacity: 1; }
                        100% { opacity: 1; }
                    }

                    .text-input {
                        position: fixed;
                        top: 100vh;
                        left: 0;
                        font-size: 16px !important;
                        border: none;
                        outline: none;
                    }

                `}</style>
                <div className="terminal-resize-area" onMouseDown={this.startResize} onTouchStart={this.startResize}></div>
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
                <form className="input-form" onSubmit={this.typingHandler}>
                    <input ref={inputRef} onChange={this.typingHandler} type="text" className="text-input" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"></input>
                </form>
            </div>
        )
    }
}