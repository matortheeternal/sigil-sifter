import { StringExpression } from 'sigil-sifter/expressions';
import { getRarityGroup } from '../core/rarity.js';

export default class RarityExpression extends StringExpression {
    static match(sifter, str) {
        const m = super.match(str);
        if (!m || !getRarityGroup(m[1])) return;
        return m;
    }

    static parse(sifter, match, str) {
        return new RarityExpression(sifter, match, str);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.group = getRarityGroup(match[1]);
    }

    equals(val) {
        return this.group.name === val;
    }

    greaterThan(val) {
        const valGroup = getRarityGroup(val);
        return this.group.index > valGroup.index;
    }

    lessThan(val) {
        const valGroup = getRarityGroup(val);
        return this.group.index < valGroup.index;
    }
}
