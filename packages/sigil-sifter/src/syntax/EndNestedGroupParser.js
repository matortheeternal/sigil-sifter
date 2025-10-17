import Parser from './Parser.js';

export default class EndNestedGroupParser extends Parser {
    static match(str) {
        return str.match(/^\s*\)/);
    }

    static parse(match, str) {
        return new EndNestedGroupParser(match, str);
    }

    apply() {
        this.endGroup = true;
    }
}
