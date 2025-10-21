import GroupParser from './syntax/GroupParser.js';
import { SearchSyntaxError } from './core/index.js';
import { registerKeyword } from './core/keywordRegistry.js';
import Parser from './syntax/Parser.js';

class SigilSifter {
    compile(filterStr) {
        const compiledFilter = GroupParser.parse(filterStr);
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

    addKeywords(keywords) {
        for (let keyword of keywords)
            registerKeyword(keyword);
    }

    setDefaultStringParser(callback) {
        Parser.ParseDefault = callback;
    }

    setInputAdapter(AdapterClass) {
        this.AdapterClass = AdapterClass;
    }
}

export const sifter = new SigilSifter();
