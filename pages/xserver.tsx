import React, { RefObject } from 'react'
import Head from 'next/head'
import { getLang } from '../scripts/Lang'

const languageData = {
    de: {
        'xserver.wip': 'hier kommt vielleicht bald was hin',
    },
    en: {
        'xserver.wip': 'maybe there will be content here soon',
    },
}

const getTranslation = getLang(languageData)

export default class XServer extends React.Component<{lang: string}> {

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    t = (key: string) => '...'

    running = true
    canvasRef: RefObject<HTMLCanvasElement> | null = null

    constructor(props: {lang: string}) {
        super(props)

        this.canvasRef = React.createRef()

        this.draw = this.draw.bind(this)
    }

    componentDidMount() {
        window.requestAnimationFrame(this.draw)
    }

    componentWillUnmount() {
        this.running = false
    }

    draw() {
        let canvas = this.canvasRef?.current

        if(canvas) {

            if(canvas.height !== window.innerHeight) canvas.height = window.innerHeight
            if(canvas.width !== window.innerWidth) canvas.width = window.innerWidth
            
            let ctx = canvas.getContext('2d')

            if(ctx) {
                ctx.fillStyle = '#000'
                ctx.fillRect(0,0,canvas.width,canvas.height)
    
                ctx.fillStyle = '#fff'
                ctx.font = '24px Source Code Pro'
                ctx.fillText(this.t('xserver.wip'), 50, 50)
            }
        }

        if(this.running) window.requestAnimationFrame(this.draw)
    }

    render() {
        this.t = getTranslation(this.props.lang)
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
        )
    }
}
