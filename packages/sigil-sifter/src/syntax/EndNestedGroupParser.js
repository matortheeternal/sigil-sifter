import Parser from './Parser.js';

export default class EndNestedGroupParser extends Parser {
    static match(sifter, str) {
        return str.match(/^\s*\)/);
    }

    static parse(sifter, match, str) {
        return new EndNestedGroupParser(sifter, match, str);
    }

    apply() {
        this.endGroup = true;
    }
}
