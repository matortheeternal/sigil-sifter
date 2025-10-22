import { KeyConflictError } from './customErrors.js';

const keywords = {};

export function registerKeyword(keywordClass) {
    for (const key of keywordClass.keys) {
        if (keywords.hasOwnProperty(key))
            throw new KeyConflictError(key, keywords, keywordClass);
        keywords[key] = keywordClass;
    }
}

export function getKeywordClass(str) {
    return keywords[str];
}

export function hasKeywordClass(str) {
    return keywords.hasOwnProperty(str);
}
