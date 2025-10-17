import { getKeywordClass, hasKeywordClass } from '../keywordRegistry.js';
import Parser from './Parser.js';

export default class KeywordFilterParser extends Parser {
    static match(str) {
        const m = str.match(/^\s*(\w+)/);
        if (m && hasKeywordClass(m[1]))
            return m;
    }

    static parse(match, str) {
        return new KeywordFilterParser(match, str);
    }

    constructor(match, str) {
        super(match, str);
        this.keywordStr = match[1];
    }

    apply(filters) {
        const KeywordClass = getKeywordClass(this.keywordStr);
        this.keywordTester = KeywordClass.parse(this.remainingStr);
        this.remainingStr = this.keywordTester.remainingStr;
        filters.push(this);
    }

    test(obj) {
        return this.keywordTester.test(obj);
    }
}
