import GroupParser from './syntax/GroupParser.js';
import {
    SearchSyntaxError, SearchLengthError, NoDefaultParserError,
    KeyConflictError, ExtensionCollisionError
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

    compile(query) {
        if (query.length > this.config.queryMaxLength)
            throw new SearchLengthError(query, this.config.queryMaxLength);
        const compiled = GroupParser.parse(this, query);
        const str = compiled.remainingStr;
        if (str.length)
            throw new SearchSyntaxError('Failed to parse', str);
        return compiled.filters.length > 1 ? compiled : compiled.filters[0];
    }

    filter(objects, query) {
        const compiledFilter = this.compile(query);
        return objects.filter(obj => {
            const testObj = this.AdapterClass
                ? new this.AdapterClass(this, obj)
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

    extend(Extension, ...args) {
        if (this.hasOwnProperty(Extension.name))
            throw new ExtensionCollisionError(Extension.name);
        this[Extension.name] = new Extension(...args);
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
