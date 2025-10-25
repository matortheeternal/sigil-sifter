const rarityGroups = [{
    index: 0,
    char: 'C',
    name: 'Common',
}, {
    index: 1,
    char: 'U',
    name: 'Uncommon',
}, {
    index: 2,
    char: 'R',
    name: 'Rare'
}, {
    index: 3,
    char: 'M',
    name: 'Mythic'
}, {
    index: 3,
    char: 'S',
    name: 'Special'
}, {
    index: 4,
    char: 'B',
    name: 'Bonus'
}];

rarityGroups.forEach(g => {
    g.matches = [g.char.toLowerCase(), g.name.toLowerCase()];
});

export function getRarityGroup(value) {
    const lcValue = value.toLowerCase();
    return rarityGroups.find(g => g.matches.includes(lcValue));
}
