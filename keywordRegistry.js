const keywords = [];

export function addKeywordClass(keywordClass) {
    keywords.push(keywordClass);
}

export function getKeywordClass(str) {
    return keywords.find(keywordClass => keywordClass.match(str));
}

export function hasKeywordClass(str) {
    return Boolean(getKeywordClass(str));
}
