import Parser from './Parser.js';

export default class KeywordFilterParser extends Parser {
    static match(sifter, str) {
        const matchData = str.match(/^\s*(\w+)/);
        if (!matchData) return;
        const keywordName = matchData[1].toLowerCase();
        if (!sifter.hasKeywordClass(keywordName)) return;
        return matchData;
    }

    static parse(sifter, match, str) {
        const keywordStr = match[1].toLowerCase();
        const KeywordClass = sifter.getKeywordClass(keywordStr);
        return KeywordClass.parse(sifter, match, str);
    }
}
