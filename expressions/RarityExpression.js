import StringExpression from './StringExpression.js';

const rarityGroups = [{
    char: 'B',
    name: 'Basic',
    aliases: ['Basic Land']
}, {
    char: 'C',
    name: 'Common',
}, {
    char: 'U',
    name: 'Uncommon',
}, {
    char: 'R',
    name: 'Rare'
}, {
    char: 'M',
    name: 'Mythic',
    aliases: ['Mythic Rare']
}, {
    char: 'S',
    name: 'Special'
}, {
    char: 'S',
    name: 'Masterpiece'
}];

rarityGroups.forEach((g, index) => {
    g.matches = Object.values(g).flat().map(s => s.toLowerCase());
    g.index = index;
});

function getRarityGroup(valueToMatch) {
    return rarityGroups.find(g => g.matches.includes(valueToMatch));
}

export default class RarityExpression extends StringExpression {
    static match(str) {
        const m = super.match(str);
        if (!m) return;
        if (!getRarityGroup(m[1])) return;
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
