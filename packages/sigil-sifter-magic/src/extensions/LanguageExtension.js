import defaultLanguages from '../data/languages.js';

export default class LanguageExtension {
    constructor(data) {
        this.languages = data.languages || defaultLanguages;
    }

    resolveLanguage(str) {
        const lcStr = str.toLowerCase();
        return this.languages.find(lang => {
            return lang.acronyms.includes(lcStr)
                || lang.expr.test(str);
        });
    }
}
