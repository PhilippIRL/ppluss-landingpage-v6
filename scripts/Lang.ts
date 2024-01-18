export const availableLangs = ['en','de']
export const defaultLang = 'en'

const langStorageKey = 'pplussLandingpageLanguage'

type LanguageData = {
    [languageName: string]: {
        [key: string]: string,
    }
}

export type Translation = (key: string) => string

export function getLang(languageData: LanguageData) {
    return function getTranslation(languageName: string): Translation {
        return function getString(key: string) {
            return languageData[languageName][key] || key
        }
    }
}

export function getLanguagePreference(): string {
    if(typeof window !== 'undefined') {
        if(window.localStorage[langStorageKey]) {
            if(availableLangs.includes(window.localStorage[langStorageKey])) {
                return window.localStorage[langStorageKey]
            } else {
                delete window.localStorage[langStorageKey]
            }
        }
        if(window.navigator.languages) {
            let browserLang = defaultLang
            window.navigator.languages
                .map(lang => lang.substr(0,2))
                .some(lang => {
                    if(availableLangs.includes(lang)) {
                        browserLang = lang
                        return true
                    }
                })
            return browserLang
        }
    }
    return defaultLang
}

export function saveLanguagePreference(lang: string) {
    if(typeof window !== 'undefined') {
        window.localStorage[langStorageKey] = lang
        return true
    }
    return false
}
