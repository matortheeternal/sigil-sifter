import GroupParser from './syntax/GroupParser.js';
import {
    SearchSyntaxError, NoDefaultParserError, KeyConflictError
} from './core/customErrors.js';

export default class SigilSifter {
    constructor() {
        this.keywords = {};
    }

    compile(filterStr) {
        const compiledFilter = GroupParser.parse(this, filterStr);
        if (compiledFilter.remainingStr.length)
            throw new SearchSyntaxError(
                'Could not find parser to parse',
                compiledFilter.remainingStr
            );
        return compiledFilter;
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

    hasKeywordClass(str) {
        return this.keywords.hasOwnProperty(str);
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
                throw new KeyConflictError(key, keywords, keywordClass);
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
