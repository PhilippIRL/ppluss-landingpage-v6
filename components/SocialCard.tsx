import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useHoverListener } from '../scripts/hooks'

const SocialCardDiv = styled(motion.div)`
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
`

const SocialCardTitle: any = styled.span`
    color: #fff;
    font-weight: bold;
    font-size: 2.4rem;
    margin-left: 5px;
`

const SocialCardText: any = styled.span`
    color: #fff;
    font-size: 1.6rem;
    margin-left: 5px;
`

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
`

export default function SocialCard({title, description, color, icon}: {title: string, description?: string, color: string, icon: string}) {
    const [hovering, eventHandlers] = useHoverListener()

    return (
        <SocialCardDiv
            animate={{scale: hovering ? 1.15 : 1}}
            transition={{default: {duration: .01}}}
            {...eventHandlers}
            style={{
                background: `linear-gradient(-45deg, rgba(0,0,0,1) -250%, ${color} 100%)`,
                zIndex: hovering ? 10 : 1,
            }}
        >
            <SocialCardTitle>{title}</SocialCardTitle>
            <SocialCardText>{description}</SocialCardText>
            <SocialCardIcon src={icon} />
        </SocialCardDiv>
    )
}
