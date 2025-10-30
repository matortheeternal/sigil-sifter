import ColorKeyword from './ColorKeyword.js';

export default class ColorIdentityKeyword extends ColorKeyword {
    static get keys() {
        return ['identity', 'id'];
    }

    test(card) {
        return this.operator.testValue(card.colorIdentity, this.expression);
    }
}
