import GroupParser from './GroupParser.js';
import { SearchSyntaxError } from '../core/customErrors.js';
import Parser from './Parser.js';

export default class OrParser extends Parser {
    static match(sifter, str) {
        return str.match(/^\s*or\s/i);
    }

    parseFirstGroup(filters) {
        return filters.length > 1
            ? new GroupParser(this.sifter, [...filters], '', { mode: 'AND' })
            : filters.pop()
    }

    parseSecondGroup() {
        const secondGroup = GroupParser.parse(this.sifter, this.remainingStr);
        this.remainingStr = secondGroup.remainingStr;
        return secondGroup.filters.length > 1
            ? secondGroup
            : secondGroup.filters[0];
    }

    apply(filters) {
        if (filters.length === 0)
            throw new SearchSyntaxError(`Invalid OR syntax at`, this.remainingStr);
        const firstGroup = this.parseFirstGroup(filters);
        const secondGroup = this.parseSecondGroup();
        const newGroup = new GroupParser(
            this.sifter,
            [firstGroup, secondGroup],
            secondGroup.remainingStr,
            { mode: 'OR' }
        );
        filters.splice(0, filters.length, newGroup);
    }
}
