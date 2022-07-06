import React from 'react'
import { availableLangs } from '../scripts/Lang'
import type EventBus from '../scripts/EventBus'
import styled, { css } from 'styled-components'
import { useContext } from 'react'
import { EventBusContext, LangContext } from '../scripts/Contexts'

const LangSwitcherRoot = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
`

const UndecoratedLink = styled.a`
    text-decoration: none;
`

const LanguageSwitcherLang: any = styled.span`
    margin-right: 5px;
    margin-left: 5px;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    ${(props: any) => props.loaded === false && css`
        color: #444;
        background-color: #444;
        border-radius: 3px;
    `}
    ${(props: any) => props.current && props.loaded !== false && css`
        font-weight: bold;
        :after {
            content: "-";
            position: absolute;
            font-weight: bold;
            font-size: 30px;
            transform: translate(-17px, -1px)
        }
    `}
`

export default function LangSwitcher({loaded}: {loaded?: boolean}) {
    let lang = useContext(LangContext)
    let eventBus = useContext(EventBusContext)

    return (
        <LangSwitcherRoot>
            {availableLangs.map(curLang => {
                let current = curLang === lang
                return (
                    <UndecoratedLink key={curLang} href="#" onClick={(e) => {
                        e.preventDefault()
                        eventBus?.post({id: 'LANG', data: curLang})
                    }}>
                        <LanguageSwitcherLang loaded={loaded} current={current}>{curLang.toUpperCase()}</LanguageSwitcherLang>
                    </UndecoratedLink>
                )
            })}
        </LangSwitcherRoot>
    )
}
