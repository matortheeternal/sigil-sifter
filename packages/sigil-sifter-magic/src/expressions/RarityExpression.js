import { StringExpression } from 'sigil-sifter/expressions';

export default class RarityExpression extends StringExpression {
    static match(sifter, str) {
        return str.match(sifter.RarityExtension.rarityExpr);
    }

    constructor(sifter, match, str) {
        super(sifter, match, str);
        this.rarity = sifter.RarityExtension.resolveRarity(this.value);
    }

    includes(val) {
        return this.equals(val);
    }

    equals(val) {
        return this.rarity.name.toLowerCase() === val;
    }

    greaterThan(val) {
        const valGroup = this.sifter.RarityExtension.resolveRarity(val);
        return this.rarity.index < valGroup.index;
    }

    lessThan(val) {
        const valGroup = this.sifter.RarityExtension.resolveRarity(val);
        return this.rarity.index > valGroup.index;
    }
}
