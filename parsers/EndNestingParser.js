import Parser from './Parser.js';

export default class EndNestingParser extends Parser {
    static match(str) {
        return str.match(/^\s*\)/);
    }

    static parse(match, str) {
        return new EndNestingParser(match, str);
    }

    apply() {
        this.endGroup = true;
    }
}
