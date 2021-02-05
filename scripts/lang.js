import de from "./lang/de";
import en from "./lang/en";

var langs = {de,en};

export const availableLangs = Object.keys(langs);

export function getLang(langId) {
    let lang = langs[langId];
    return {
        lang,
        langId,
        getString: id => {
            return lang[id] || id;
        },
    };
}