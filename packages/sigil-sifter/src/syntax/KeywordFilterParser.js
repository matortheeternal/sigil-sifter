import Parser from './Parser.js';

function canMatchKeyword(sifter, str, matchData) {
    const keywordName = matchData[1].toLowerCase();
    const keywordClass = sifter.getKeywordClass(keywordName);
    if (!keywordClass) return;
    const opStr = str.slice(matchData[0].length);
    return keywordClass.supportedOperators
        .some(op => op.match(sifter, opStr));
}

export default class KeywordFilterParser extends Parser {
    static match(sifter, str) {
        const matchData = str.match(/^\s*(\w+)/);
        if (!matchData || !canMatchKeyword(sifter, str, matchData)) return;
        return matchData;
    }

    static parse(sifter, match, str) {
        const keywordStr = match[1].toLowerCase();
        const KeywordClass = sifter.getKeywordClass(keywordStr);
        return KeywordClass.parse(sifter, match, str);
    }
}
