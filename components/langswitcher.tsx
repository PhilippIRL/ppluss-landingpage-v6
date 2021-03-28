import React from "react";
import { availableLangs } from "../scripts/Lang";
import type EventBus from "../scripts/EventBus";
import styled, { css } from "styled-components";

const LangSwitcherRoot = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
`;

const UndecoratedLink = styled.a`
    text-decoration: none;
`;

const LanguageSwitcherLang: any = styled.span`
    margin-right: 5px;
    margin-left: 5px;
    color: #fff;
    text-decoration: none;
    ${(props: any) => props.current && css`
        font-weight: bold;
        :after {
            content: "-";
            position: absolute;
            font-weigth: bold;
            font-size: 24px;
            transform: translate(-16px, 3px)
        }
    `}
`;

export default function LangSwitcher({lang, eventBus}: {lang: "de", eventBus: EventBus}) {
    return (
        <LangSwitcherRoot>
            {availableLangs.map(curLang => {
                let current = curLang === lang;
                return (
                    <UndecoratedLink key={curLang} href="#" onClick={(e) => {
                        e.preventDefault();
                        eventBus.post({id: "LANG", data: curLang});
                    }}>
                        <LanguageSwitcherLang current={current}>{curLang.toUpperCase()}</LanguageSwitcherLang>
                    </UndecoratedLink>
                );
            })}
        </LangSwitcherRoot>
    )
}