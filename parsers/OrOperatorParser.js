import GroupParser from './GroupParser.js';
import SearchSyntaxError from '../SearchSyntaxError.js';
import Parser from './Parser.js';

export default class OrOperatorParser extends Parser {
    static match(str, prevParser) {
        const m = str.match(/^\s*or\s/i);
        if (!m) return;
        if (!prevParser)
            throw new SearchSyntaxError(`Invalid OR syntax at`, str);
        if (prevParser.constructor === OrOperatorParser)
            throw new SearchSyntaxError(`Invalid syntax at`, str);
        return m;
    }

    static parse(match, str) {
        return new OrOperatorParser(match, str);
    }

    apply(filters) {
        const firstGroup = filters.length > 1
            ? new GroupParser(filters, null, { mode: 'AND' })
            : filters.pop();
        const secondGroup = GroupParser.parse(this.remainingStr, false);
        this.remainingStr = secondGroup.remainingStr;
        const filtersToGroup = [firstGroup, secondGroup];
        filters.push(new GroupParser(filtersToGroup, '', { mode: 'OR' }));
    }
}
