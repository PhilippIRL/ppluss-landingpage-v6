export const availableLangs = ["de","en"];

type LanguageData = {
    [languageName: string]: {
        [key: string]: string,
    }
}

export function getLang(languageData: LanguageData) {
    return function getTranslation(languageName: string) {
        return function getString(key: string) {
            return languageData[languageName][key] || key;
        }
    }
}