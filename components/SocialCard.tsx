import React, { useEffect, useRef, useState } from "react";
import styled, {keyframes} from "styled-components";

const cardAnim = keyframes`
    from { opacity: 0; transform: scale(0.75) }
    to { opacity: 1; transform: scale(1) }
`;

const SocialCardDiv: any = styled.div`
    display: flex;
    min-height: ${(props: any) => props.sizeNumber}px;
    min-width: ${(props: any) => props.sizeNumber}px;
    max-height: ${(props: any) => props.sizeNumber}px;
    max-width: ${(props: any) => props.sizeNumber}px;
    padding: 25px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;
    border-radius: 10px;
    background-blend-mode: multiply;
    margin: 10px;
    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
    animation: ${cardAnim} .5s;
    transition: .2s;
    background-color: #666;
    background-size: 100% auto;
    will-change: transform, transition;
    transform-style: preserve-3d;
    overflow: hidden;
    background: linear-gradient(-45deg, rgba(0,0,0,1) -250%, ${props => props.color} 100%);
    @media (max-width: 400px) {
        justify-content: center;
        align-items: center;
    }
`;

const SocialCardTitle: any = styled.span`
    color: #fff;
    font-weight: bold;
    font-size: 24px;
    @media (max-width: 500px) {
        font-size: 20px;
    }
`;

const SocialCardText: any = styled.span`
    color: #fff;
    font-size: 18px;
    @media (max-width: 500px) {
        font-size: 16px;
    }
`;

const SocialCardIcon: any = styled.img`
    width: 75%;
    height: 75%;
    opacity: .4;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 400px) {
        opacity: .3;
        filter: blur(1px);
    }
`;

export default function SocialCard({title, description, color, size, icon}: {title: string, description?: string, color: string, size: number, icon: string}) {

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

    let transform = hover ? `scale(1.05) perspective(1000px) rotateX(${vert*3}deg) rotateY(${-hor*3}deg)` : null;
    let transition = enableTransition ? ".2s" : "none";

    return (
        <SocialCardDiv ref={ref} color={color} sizeNumber={size} style={{transform, transition}} onMouseMove={(e: any) => setState({x: e.clientX, y: e.clientY, mouseHere: true})} onMouseLeave={(e: any) => setState({x: 0, y: 0, mouseHere: false})}>
            <SocialCardTitle>{title}</SocialCardTitle>
            <SocialCardText>{description}</SocialCardText>
            <SocialCardIcon src={icon} />
        </SocialCardDiv>
    );
}