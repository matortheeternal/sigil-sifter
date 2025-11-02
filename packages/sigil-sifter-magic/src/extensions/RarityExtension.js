import defaultRarities from '../data/rarities.js';

export default class RarityExtension {
    constructor(data) {
        this.rarities = data.rarities || defaultRarities;
        this.rarities.forEach(r => {
            if (r.expr) return;
            r.expr = new RegExp(`^(${r.char}|${r.name})$`, 'i')
        });
    }

    resolveRarity(value) {
        return this.rarities.find(r => r.expr.test(value));
    }

    get rarityExpr() {
        const namesAndChars = this.rarities.flatMap(r => [r.char, r.name]);
        return new RegExp(`^(${namesAndChars.join('|')})$`, 'i');
    }
}
