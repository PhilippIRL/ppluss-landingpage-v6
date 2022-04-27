import React, { useRef, useState } from "react";
import styled from "styled-components";

const SocialCardDiv = styled.div`
    display: flex;
    padding: 15px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    text-align: center;
    border-radius: 10px;
    background-blend-mode: multiply;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    transition: .2s;
    background-color: #666;
    background-size: 100% auto;
    will-change: transform, transition;
    transform-style: preserve-3d;
    overflow: hidden;
    background: #000;
    width: calc(50vw - 75px);
    height: calc(50vw - 75px);
    max-width: 400px;
    max-height: 400px;
    @media (max-width: 300px) {
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 400px) {
        width: calc(50vw - 60px);
        height: calc(50vw - 60px);
    }
    @media (max-width: 200px) {
        width: calc(50vw - 55px);
        height: calc(50vw - 55px);
    }
    @media (min-width: 600px) {
        width: calc(33vw - 60px);
        height: calc(33vw - 60px);
    }
    @media (min-width: 800px) {
        width: calc(25vw - 60px);
        height: calc(25vw - 60px);
    }
    @media (min-width: 1000px) {
        width: calc(20vw - 55px);
        height: calc(20vw - 55px);
    }
    @media (min-width: 1200px) {
        width: calc(16.66vw - 55px);
        height: calc(16.66vw - 55px);
    }
    position: relative;
`;

const SocialCardTitle: any = styled.span`
    color: #fff;
    font-weight: bold;
    font-size: 2.4rem;
    margin-left: 5px;
`;

const SocialCardText: any = styled.span`
    color: #fff;
    font-size: 1.6rem;
    margin-left: 5px;
`;

const SocialCardIcon: any = styled.img`
    width: 75%;
    height: 75%;
    opacity: .4;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 300px) {
        opacity: .3;
        filter: blur(3px);
    }
    -webkit-user-drag: none;
`;

export default function SocialCard({title, description, color, icon}: {title: string, description?: string, color: string, icon: string}) {

    const [state, setState] = useState({x: 0, y: 0, mouseHere: false});
    const ref = useRef(null);
    const [enableTransition, setEnableTransition] = useState(true);
    
    let vert = 0, hor = 0, hover = false;

    if(ref.current && (state.x != 0 || state.y != 0)) {
        let elem = (ref as any).current;
        let boundingBox = elem.getBoundingClientRect();
        hover = true;
        let x = (state.x - boundingBox.x) - (elem.clientWidth / 2);
        let y = (state.y - boundingBox.y) - (elem.clientHeight / 2);
        hor = (x / elem.clientWidth) * 2;
        vert = (y / elem.clientHeight) * 2;
        if(enableTransition) {
            setTimeout(() => setEnableTransition(false),200);
        }
    } else if(!state.mouseHere && !enableTransition) {
        setEnableTransition(true);
    }

    if(enableTransition) { // fixes transition performance issues
        vert = 0;
        hor = 0;
    }

    let transform = hover ? `scale(1.05) perspective(1000px) rotateX(${vert*4}deg) rotateY(${-hor*4}deg)` : undefined;
    let transition = enableTransition ? ".2s" : "none";

    return (
        <SocialCardDiv ref={ref} style={{transform, transition, background: `linear-gradient(-45deg, rgba(0,0,0,1) -250%, ${color} 100%)`}} onMouseMove={(e: any) => setState({x: e.clientX, y: e.clientY, mouseHere: true})} onMouseLeave={(e: any) => setState({x: 0, y: 0, mouseHere: false})}>
            <SocialCardTitle>{title}</SocialCardTitle>
            <SocialCardText>{description}</SocialCardText>
            <SocialCardIcon src={icon} />
        </SocialCardDiv>
    );
}