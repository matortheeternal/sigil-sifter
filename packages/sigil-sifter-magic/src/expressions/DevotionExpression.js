import {SearchSyntaxError} from 'sigil-sifter/core';
import ManaExpression from './ManaExpression.js';

const allowedSymbolTypes = [
    'coloredMana',
    'twoColorHybridMana',
    'threeColorHybridMana',
    'fourColorHybridMana',
    'fiveColorHybridMana'
];

function isAllowedColor(prevSymbol, sym) {
    const inputValue = sym.colors.sort().join('/');
    if (prevSymbol.length)
        return prevSymbol[0] === inputValue;
    prevSymbol.push(inputValue);
    return true;
}

export default class DevotionExpression extends ManaExpression {
    constructor(sifter, match, str) {
        super(sifter, match, str);
        let prevSymbol = [];
        const invalidInput = this.searchManaCost.symbols.some(sym => {
            return !allowedSymbolTypes.includes(sym.type)
                || !isAllowedColor(prevSymbol, sym);
        });
        if (invalidInput)
            throw new SearchSyntaxError(
                'Devotion can only match single color and hybrid mana',
                match[0]
            );
    }

    includes(val) {
        return this.greaterThan(val) || this.equals(val);
    }

    equals(val) {
        return this.searchManaCost.colors.some(c => {
            return val.getDevotionTo(c) === this.searchManaCost.getDevotionTo(c);
        });
    }

    greaterThan(val) {
        return this.searchManaCost.colors.some(c => {
            return val.getDevotionTo(c) > this.searchManaCost.getDevotionTo(c);
        });
    }

    lessThan(val) {
        return this.searchManaCost.colors.every(c => {
            return val.getDevotionTo(c) < this.searchManaCost.getDevotionTo(c);
        });
    }
}
