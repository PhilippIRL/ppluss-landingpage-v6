export const availableLangs = ["de","en"];

export function getLang(languageData) {
    return function getTranslation(lang) {
        return function getString(id) {
            return languageData[lang][id] || id;
        }
    }
}