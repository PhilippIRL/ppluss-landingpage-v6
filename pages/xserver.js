import React from "react";
import Head from "next/head";

export default class XServer extends React.Component {
    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
        this.running = true;

        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        window.requestAnimationFrame(this.draw);
    }

    componentWillUnmount() {
        this.running = false;
    }

    draw() {
        let canvas = this.canvasRef.current;
        if(canvas) {

            if(canvas.height !== window.innerHeight) canvas.height = window.innerHeight;
            if(canvas.width !== window.innerWidth) canvas.width = window.innerWidth;
            
            let ctx = canvas.getContext("2d");

            ctx.fillStyle = "#000";
            ctx.fillRect(0,0,canvas.width,canvas.height);

            ctx.fillStyle = "#fff";
            ctx.font = "24px Source Code Pro";
            ctx.fillText("hier kommt evtl bald was hin", 50, 50);
        }
        if(this.running) window.requestAnimationFrame(this.draw);
    }

    render() {
        return (
            <div className="app-root">
                <Head>
                    <title>X server</title>
                    <style>{`
                        body {
                            overflow: hidden;
                        }
                    `}</style>
                </Head>
                <canvas ref={this.canvasRef} onContextMenu={e => e.preventDefault()}></canvas>
            </div>
        );
    }
}