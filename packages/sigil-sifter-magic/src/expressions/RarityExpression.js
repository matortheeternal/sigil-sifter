import { StringExpression } from 'sigil-sifter/expressions';
import { getRarityGroup } from '../core/rarity.js';

export default class RarityExpression extends StringExpression {
    static match(sifter, str) {
        const matchData = super.match(sifter, str);
        if (!matchData || !getRarityGroup(matchData[1])) return;
        return matchData;
    }

    static parse(sifter, match, str) {
        return new RarityExpression(sifter, match, str);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.group = getRarityGroup(match[1]);
    }

    includes(val) {
        return this.equals(val);
    }

    equals(val) {
        return this.group.name.toLowerCase() === val;
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
