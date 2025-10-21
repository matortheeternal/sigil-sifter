import ColorKeyword from './ColorKeyword.js';

export default class ColorIdentityKeyword extends ColorKeyword {
    static match(str) {
        return str === 'identity' || str === 'id';
    }

    test(card) {
        const colors = card.colorIdentity.map(c => c.toLowerCase());
        return this.operator.testValue(colors, this.expression);
    }
}
