const color = (id, name) => ({
    id,
    name,
    expr: new RegExp(name, 'i'),
    colorChars: [id]
});

const colorCombo = (name, colors) => ({
    name,
    expr: new RegExp(name, 'i'),
    colorChars: colors.split('')
});

const colors = [
    color('W', 'White'),
    color('U', 'Blue'),
    color('B', 'Black'),
    color('R', 'Red'),
    color('G', 'Green'),
    color('C', 'Colorless'),
];

const colorCombos = [
    colorCombo('Azorius', 'WU'),
    colorCombo('Dimir', 'UB'),
    colorCombo('Rakdos', 'BR'),
    colorCombo('Gruul', 'RG'),
    colorCombo('Selesnya', 'WG'),
    colorCombo('Orzhov', 'WB'),
    colorCombo('Izzet', 'UR'),
    colorCombo('Golgari', 'BG'),
    colorCombo('Boros', 'WR'),
    colorCombo('Simic', 'UG'),
    colorCombo('Bant', 'WUG'),
    colorCombo('Esper', 'WUB'),
    colorCombo('Grixis', 'UBR'),
    colorCombo('Jund', 'BRG'),
    colorCombo('Naya', 'WRG'),
    colorCombo('Abzan', 'WBG'),
    colorCombo('Jeskai', 'WUR'),
    colorCombo('Sultai', 'UBG'),
    colorCombo('Mardu', 'WBR'),
    colorCombo('Temur', 'URG'),
    colorCombo('Chaos', 'UBRG'),
    colorCombo('Aggression', 'WBRG'),
    colorCombo('Altruism', 'WURG'),
    colorCombo('Growth', 'WUBG'),
    colorCombo('Artifice', 'WUBR'),
];

const colorNames = [...colors, ...colorCombos].map(c => c.name);
export const colorNamesExpr = new RegExp(`^(${colorNames.join('|')})`, 'i');

export function getColors(str) {
    const allOptions = colors.concat(colorCombos);
    const colorByName = allOptions.find(c => c.expr.test(str));
    return colorByName
        ? colorByName.colorChars
        : [...new Set(str.toUpperCase().split(''))];
}

export function matchColorNames(str) {
    return str.match(colorNamesExpr);
}
