const keywords = [];

export function registerKeyword(keywordClass) {
    keywords.push(keywordClass);
}

export function getKeywordClass(str) {
    return keywords.find(keywordClass => keywordClass.match(str));
}

export function hasKeywordClass(str) {
    return Boolean(getKeywordClass(str));
}
