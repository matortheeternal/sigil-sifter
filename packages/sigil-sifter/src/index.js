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
        return objects.filter(obj => compiledFilter.test(obj));
    }

    addKeywords(keywords) {
        for (let keyword of keywords)
            registerKeyword(keyword);
    }

    setDefaultStringParser(callback) {
        Parser.ParseDefault = callback;
    }
}

export const sifter = new SigilSifter();
