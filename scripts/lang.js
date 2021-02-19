import en from "./lang/en";

var langs = {en};

export var availableLangs = Object.keys(langs);

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

export async function loadLang(langId) {
    let lang = await require("./lang/" + langId)
    langs[langId] = lang.default;
    availableLangs = Object.keys(langs);
}