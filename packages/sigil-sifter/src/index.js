import GroupParser from './syntax/GroupParser.js';
import {
    SearchSyntaxError, SearchLengthError,
    NoDefaultParserError, KeyConflictError
} from './core/customErrors.js';

const DEFAULT_CONFIG = {
    queryMaxLength: 1024
};

export default class SigilSifter {
    constructor(config = {}) {
        this.keywords = {};
        this.AdapterClass = null;
        this.config = { ...DEFAULT_CONFIG, ...config };
    }

    compile(filterStr) {
        if (filterStr.length > this.config.queryMaxLength)
            throw new SearchLengthError(filterStr, this.config.queryMaxLength);
        const compiled = GroupParser.parse(this, filterStr);
        const str = compiled.remainingStr;
        if (str.length)
            throw new SearchSyntaxError('Failed to parse', str);
        return compiled.filters.length > 1 ? compiled : compiled.filters[0];
    }

    filter(objects, filterStr) {
        const compiledFilter = this.compile(filterStr);
        return objects.filter(obj => {
            const testObj = this.AdapterClass
                ? new this.AdapterClass(obj)
                : obj;
            return compiledFilter.test(testObj)
        });
    }

    getKeywordClass(str) {
        return this.keywords[str];
    }

    addKeywords(keywords) {
        for (let keyword of keywords)
            this.registerKeyword(keyword);
    }

    registerKeyword(keywordClass) {
        for (const key of keywordClass.keys) {
            if (this.keywords.hasOwnProperty(key))
                throw new KeyConflictError(key, this.keywords, keywordClass);
            this.keywords[key] = keywordClass;
        }
    }

    parseString(sifter, OperatorClass, expression) {
        throw new NoDefaultParserError(expression);
    }

    setBaseStringParser(callback) {
        this.parseString = callback;
    }

    setInputAdapter(AdapterClass) {
        this.AdapterClass = AdapterClass;
    }
}
