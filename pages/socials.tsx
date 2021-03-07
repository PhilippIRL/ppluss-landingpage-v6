import { getLang } from "../scripts/Lang";

const LanguageData = {
    de: {

    },
    en: {

    },
};

const getTranslation = getLang(LanguageData);

export default function socials({lang}) {
    const t = getTranslation(lang);
    return null;
}