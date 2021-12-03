import React from "react";
import styled, { css, keyframes } from "styled-components";
import type EventBus from "../scripts/EventBus";
import type { BusEvent } from "../scripts/EventBus";
import { availableLangs } from "../scripts/Lang";

const terminalInOut = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0px);
    }
`;

const terminalInOutMobile = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0px);
    }
`;

const TerminalRoot: any = styled.div`
    position: fixed;
    bottom: 10px;
    width: calc(100vw - 20px);
    max-width: 700px;
    left: 10px;
    height: 400px;
    background-color: #222222aa;
    font-family: 'VT323', monospace;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    backdrop-filter: blur(40px);
    font-size: 20px;
    user-select: none;
    @media (max-width: 600px) {
        width: 100vw;
        left: 0;
        bottom: 0;
        border-radius: 0;
        background-color: #222222;
        backdrop-filter: none;
    }
    ${({anim}: {anim: string}) => anim && css`
        animation: ${terminalInOut} .5s ${anim === "out" ? "reverse" : ""} forwards;
        @media (max-width: 600px) {
            animation: ${terminalInOutMobile} .5s ${anim === "out" ? "reverse" : ""} forwards;
        }
    `}
`;

const TerminalBar = styled.div`
    height: 35px;
    width: 100%;
    cursor: ns-resize;
    touch-action: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TerminalBarArea: any = styled.div`
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    ${(props: any) => props.at && css`
        ${props.at === "start" && "justify-content: flex-start;"}
        ${props.at === "center" && "justify-content: center;"}
        ${props.at === "end" && "justify-content: flex-end;"}
    `}
`;

const TerminalLines = styled.div`
    margin: 15px;
    margin-top: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
`;

const TerminalLine: any = styled.span`
    min-height: max-content;
    word-break: break-all;
    white-space: pre;
    ${({empty}: {empty: boolean}) => empty && css`
        min-height: 1em;
    `}
    @media (max-width: 500px) {
        font-size: 18px;
    }
`;

const cursorBlinking = keyframes`
    0% { opacity: 0; }
    49.999% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 1; }
`;

const TerminalCursor = styled.span`
    animation: ${cursorBlinking} 1.5s;
    animation-iteration-count: infinite;
    font-size: 16px;
`;

const HiddenInput = styled.input`
    position: fixed;
    top: 100vh;
    left: 0;
    font-size: 16px !important;
    border: none;
    outline: none;
`;

const TerminalCloseIcon = styled.svg`
    height: 25px;
    width: 25px;
    fill: #fff;
    cursor: pointer;
    margin-right: 10px;
`;

const TerminalResizeIndicator = styled.div`
    height: 4px;
    width: 40px;
    border-radius: 10px;
    background-color: #fff;
`;

const Hint = styled.span`
    color: #ccc;
`;

interface TerminalProps {
    eventBus: EventBus,
}

export default class Terminal extends React.Component<TerminalProps> {

    timeoutId: any = -1;
    prefix = "# ";
    terminalBrandString = "PplusS Landing Page v6 (" + process.env.NEXT_PUBLIC_APP_VERSION + ")";
    touchStartY = 0;
    eventBus: any = null;
    bottomRef: any = null;
    inputRef: any = null;
    state: any = null;
    lastCommands: any = [];

    constructor(props: TerminalProps) {
        super(props);

        this.keyHandler = this.keyHandler.bind(this);
        this.startResize = this.startResize.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
        this.commandHander = this.commandHander.bind(this);
        this.println = this.println.bind(this);
        this.onCommand = this.onCommand.bind(this);
        this.toggleConsole = this.toggleConsole.bind(this);
        this.focusInput = this.focusInput.bind(this);
        this.onBusEvent = this.onBusEvent.bind(this);
        this.inputKeyHandler = this.inputKeyHandler.bind(this);
        this.type = this.type.bind(this);

        this.eventBus = props.eventBus;
        this.eventBus.attach(this.onBusEvent);

        this.state = {visible: false, anim: null, resizing: false, height: 400, typingText: "", lines: [this.terminalBrandString,""], forcedCommand: false};
    }

    onBusEvent(msg: BusEvent) {
        if(msg.id === "TERMINAL_TOGGLE") {
            this.toggleConsole();
        } else if(msg.id === "TERMINAL_FORCE") {
            this.setState({visible: true, anim: null});
        } else if(msg.id === "TERMINAL_FORCE_COMMAND") {
            this.setState({visible: true, anim: null, typingText: msg.data, forcedCommand: true});
        }
    }

    onCommand(command: string, args: string[]) {
        switch(command) {
            case "clear":
            case "cls":
                this.setState({lines: []});
                return;
            case "print":
            case "echo":
                let text = args.join(" ")
                if(text.includes("<script>")) {
                    this.println("no xss here lol")
                }
                this.println(text)
                return
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
            case "xserver":
                this.eventBus.post({id: "GOTO", data: "/xserver"});
                return;
            case "testing":
                window.location.href = "https://stuff.ppluss.de/hub.html";
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
            case "emptytest":
                this.println();
                this.println();
                this.println();
                this.println("Working?");
                this.println();
                this.println();
                this.println();
                return;
            case "socials":
                this.eventBus.post({id: "GOTO", data: "/socials"});
                return;
            case "help":
            case "commands":
                this.println("==============");
                this.println("   Commands   ");
                this.println("==============");
                this.println();
                this.println("home, socials, more: Directly jump to a page");
                //this.println("startx: Start the X-Server");
                this.println("echo: Just a normal echo command");
                this.println("ver: Version information");
                this.println("help: Show this message");
                this.println("clear: Clear the console");
                this.println("reload: Refresh the page");
                this.println("lang: Change the page language");
                this.println("exit: Close the console");
                return;
            case "host":
                if(args.length !== 1) {
                    this.println("host <ppluss | vercel | local>");
                    return;
                }
                let path = window.location.pathname + window.location.search + "#term";
                switch(args[0]) {
                    case "ppluss":
                        window.location.href = "https://ppluss.de" + path;
                        return;
                    case "vercel":
                        window.location.href = "https://vercel.ppluss.de" + path;
                        return;
                    case "local":
                        window.location.href = "http://localhost:3000" + path;
                        return;
                    default:
                        this.println("Error: Unknown host");
                        return;
                }
            case "newhome":
                this.eventBus.post({id: "GOTO", data: "/new"});;
                return;
            case "adri":
                this.println("<3");
                return;
            case "lowercase":
                this.eventBus.post({id: "LOWERCASE_TOGGLE"});
                this.println("UwU");
                return;
            case "command-not-found":
            default:
                this.println(command + ": command not found");
                return;
        }
    }

    componentDidUpdate() {
        if(this.bottomRef && this.bottomRef.current) {
            this.bottomRef.current.scrollIntoView();
        }
        this.focusInput();
    }

    focusInput() {
        if(this.inputRef && this.inputRef.current) {
            const field = this.inputRef.current;
            field.focus();
            field.selectionStart = field.selectionEnd = field.value.length;
        }
    }

    keyHandler(e: KeyboardEvent) {
        if(!e.shiftKey && !e.metaKey && !e.ctrlKey && e.altKey && e.code === "KeyT") {
            e.preventDefault();
            this.toggleConsole();
        }
        if(this.state.visible) {
            this.focusInput();
            if(!e.metaKey && !e.shiftKey && !e.altKey && e.ctrlKey && e.code === "KeyC") {
                e.preventDefault();
                this.println(this.prefix + this.state.typingText + "^C");
                this.setState({typingText: ""})
            } else if(!e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey && e.code === "Escape") {
                this.toggleConsole()
            }
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

    commandHander(e: any) {
        e.preventDefault();
        let typingText = this.state.typingText;

        this.println(this.prefix + typingText);
        this.lastCommands.push(typingText);
        this.upPresses = 0;

        let args = typingText.split(" ");
        let command = args.shift();
        this.onCommand(command, args);

        this.setState({typingText: "", forcedCommand: false});
    }

    upPresses = 0;
    lastCommand = "";

    inputKeyHandler(e: any) {
        if(e.code === "ArrowUp" || e.code === "ArrowDown") {
            if(this.upPresses == 0) {
                this.lastCommand = this.state.typingText;
            }

            if(e.code === "ArrowUp") {
                this.upPresses++;
            } else {
                this.upPresses--;
            }

            if(this.upPresses > this.lastCommands.length) {
                this.upPresses = this.lastCommands.length;
            }
            if(this.upPresses < 0) {
                this.upPresses = 0;
            }

            let text = this.upPresses === 0 ? this.lastCommand : this.lastCommands[this.lastCommands.length - this.upPresses];
            this.setState({typingText: text});
            
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.keyHandler);
        window.addEventListener("resize", this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyHandler);
        window.removeEventListener("resize", this.resizeHandler);
        
        // remove everything again just to be sure
        window.removeEventListener("mousemove", this.resizeHandler);
        window.removeEventListener("mouseup", this.resizeHandler);
        window.removeEventListener("selectstart", this.resizeHandler);
        window.removeEventListener("touchmove", this.resizeHandler);
        window.removeEventListener("touchend", this.resizeHandler);

        this.eventBus.detach(this.onBusEvent);
    }

    resizeHandler(e: any) {
        if(e.type === "mouseup" || e.type === "touchend") {
            window.removeEventListener("mousemove", this.resizeHandler);
            window.removeEventListener("mouseup", this.resizeHandler);
            window.removeEventListener("selectstart", this.resizeHandler);
            window.removeEventListener("touchmove", this.resizeHandler);
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
        } else if(this.state.visible && e.type === "resize") {
            if(this.state.height > window.innerHeight) {
                this.setState({height: window.innerHeight});
            }
        }
    }

    startResize(e: any) {
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

    type(e: any) {
        if(!this.state.forcedCommand) {
            this.setState({typingText: e.target.value})
        }
    }

    render() {
        if(!this.state.visible) {
            return null;
        }

        var height = this.state.height;

        var bottomRef = React.createRef();
        this.bottomRef = bottomRef;

        var inputRef = React.createRef();
        this.inputRef = inputRef;

        return (
            <TerminalRoot anim={this.state.anim} style={{height: height + "px"}} onClick={this.focusInput}>
                <TerminalBar onMouseDown={this.startResize} onTouchStart={this.startResize}>
                    <TerminalBarArea at="start"></TerminalBarArea>
                    <TerminalBarArea at="center">
                        <TerminalResizeIndicator />
                    </TerminalBarArea>
                    <TerminalBarArea at="end">
                        <TerminalCloseIcon viewBox="0 0 24 24" onClick={() => this.toggleConsole()}><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></TerminalCloseIcon>
                    </TerminalBarArea>
                </TerminalBar>
                <TerminalLines>
                    {this.state.lines.map((line: any, index: number) => (
                        <TerminalLine empty={line === ""} key={index}>{line}</TerminalLine>
                    ))}
                    <TerminalLine ref={bottomRef as any}>
                        {this.prefix}
                        {this.state.typingText}
                        <TerminalCursor>&#x2588;</TerminalCursor>
                    </TerminalLine>
                    {this.state.forcedCommand ? (
                        <>
                            <TerminalLine empty />
                            <TerminalLine>
                                <Hint>Press enter to execute</Hint>
                            </TerminalLine>
                        </>
                    ) : null}
                </TerminalLines>
                <form onSubmit={this.commandHander}>
                    <HiddenInput value={this.state.typingText} onChange={this.type} onKeyDown={this.inputKeyHandler} ref={inputRef as any} type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                </form>
            </TerminalRoot>
        )
    }
}