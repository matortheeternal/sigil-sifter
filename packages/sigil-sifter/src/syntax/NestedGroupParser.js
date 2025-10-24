import GroupParser from './GroupParser.js';
import Parser from './Parser.js';

export default class NestedGroupParser extends Parser {
    static match(sifter, str) {
        return str.match(/^\s*\(/);
    }

    static parse(sifter, match, str) {
        return new NestedGroupParser(sifter, match, str);
    }

    apply(filters) {
        const options = { nested: true };
        const group = GroupParser.parse(this.sifter, this.remainingStr, options);
        this.remainingStr = group.remainingStr;
        const filter = group.filters.length > 1 ? group : group.filters[0];
        filters.push(filter);
    }
}
