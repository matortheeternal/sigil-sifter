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

export function getRarityGroup(valueToMatch) {
    return rarityGroups.find(g => g.matches.includes(valueToMatch));
}
