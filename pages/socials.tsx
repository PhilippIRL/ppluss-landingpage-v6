import { getLang } from "../scripts/Lang";
import Header from "../components/header";

const languageData = {
    de: {
        "socials.title": "Socials",
    },
    en: {
        "socials.title": "Socials",
    },
};

const getTranslation = getLang(languageData);

export default function socials({lang}: {lang: string}) {
    const t = getTranslation(lang);
    return (
        <div className="app-root">
            <Header lang={lang} />
            <h1>{t("socials.title")}</h1>
            <div className="socials">
                <span>WIP</span>
            </div>
            <style jsx>{`
                .app-root {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .socials {
                    display: grid;
                }
            `}</style>
        </div>
    );
}