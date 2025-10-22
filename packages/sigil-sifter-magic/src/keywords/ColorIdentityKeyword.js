import ColorKeyword from './ColorKeyword.js';

export default class ColorIdentityKeyword extends ColorKeyword {
    static get keys() {
        return ['identity', 'id'];
    }

    test(card) {
        const colors = card.colorIdentity.map(c => c.toLowerCase());
        return this.operator.testValue(colors, this.expression);
    }
}
