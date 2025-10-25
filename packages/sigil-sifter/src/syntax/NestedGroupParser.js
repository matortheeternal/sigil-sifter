import GroupParser from './GroupParser.js';
import Parser from './Parser.js';

export default class NestedGroupParser extends Parser {
    static match(sifter, str) {
        return str.match(/^\s*\(/);
    }

    static parse(sifter, match, str) {
        const remainingStr = str.slice(match[0].length);
        return GroupParser.parse(sifter, remainingStr, { nested: true });
    }
}
