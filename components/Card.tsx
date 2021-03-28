import React, { useRef, useState } from "react";
import styled, {keyframes} from "styled-components";

const cardAnim = keyframes`
    from { opacity: 0; transform: translateY(25px) }
    to { opacity: 1; }
`;

const CardDiv: any = styled.div`
    display: flex;
    min-height: 350px;
    width: 100vw;
    max-width: 350px;
    padding: 25px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;
    border-radius: 10px;
    background-blend-mode: multiply;
    margin: 10px;
    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.75);
    animation: ${cardAnim} 1s;
    transition: .2s;
    background-color: #666;
    background-size: 100% auto;
    will-change: transform, transition;
    transform-style: preserve-3d;
    ${(props: any) => props.largeCard ? `
        @media only screen and (min-width: 870px) {
            max-width: 770px;
        }
    ` : undefined}
`;

const CardTitle: any = styled.span`
    font-weight: bold;
    font-size: 24px;
`;

const CardText: any = styled.span`
    font-size: 18px;
`;

export default function Card({title, description, background, largeCard}: {title: string, description?: string, background: string, largeCard: boolean}) {

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

    let transform = hover ? `scale(1.05) perspective(1000px) rotateX(${vert*3}deg) rotateY(${-hor*3}deg)` : "";
    let transition = enableTransition ? ".2s" : "none";

    return (
        <CardDiv ref={ref} largeCard={largeCard} style={{backgroundImage: `url("${background}")`, transform, transition}} onMouseMove={(e: any) => setState({x: e.clientX, y: e.clientY, mouseHere: true})} onMouseLeave={(e: any) => setState({x: 0, y: 0, mouseHere: false})}>
            <CardTitle>{title}</CardTitle>
            <CardText>{description}</CardText>
        </CardDiv>
    );
}