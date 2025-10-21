import GroupParser from './GroupParser.js';
import Parser from './Parser.js';

export default class NestedGroupParser extends Parser {
    static match(str) {
        return str.match(/^\s*\(/);
    }

    static parse(match, str) {
        return new NestedGroupParser(match, str);
    }

    apply(filters) {
        const group = GroupParser.parse(this.remainingStr, true, true);
        this.remainingStr = group.remainingStr;
        const filter = group.filters.length > 1 ? group : group.filters[0];
        filters.push(filter);
    }
}
