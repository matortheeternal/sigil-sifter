import { StringExpression } from 'sigil-sifter/expressions';
import { getRarityGroup } from '../core/rarity.js';

export default class RarityExpression extends StringExpression {
    static match(str) {
        const m = super.match(str);
        if (!m || !getRarityGroup(m[1])) return;
        return m;
    }

    static parse(match, str) {
        return new RarityExpression(match, str);
    }

    constructor(match, str) {
        super(match, str);
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
