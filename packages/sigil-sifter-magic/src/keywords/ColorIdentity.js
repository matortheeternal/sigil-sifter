import Color from './Color.js';

export default class ColorIdentity extends Color {
    static match(str) {
        return str === 'identity' || str === 'id';
    }

    test(card) {
        const colors = card.colorIdentity.map(c => c.toLowerCase());
        return this.operator.testValue(colors, this.expression);
    }
}
