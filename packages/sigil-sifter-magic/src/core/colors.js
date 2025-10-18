const color = (char, name) => ({ name, char, colorChars: [char] });
const colorCombo = (name, colors) => ({name, colorChars: colors.split('')});

const colors = [
    color('w', 'white'),
    color('u', 'blue'),
    color('b', 'black'),
    color('r', 'red'),
    color('g', 'green'),
    color('c', 'colorless'),
];

const colorMap = new Map(colors.map(c => [c.char, c.name]));

const colorCombos = [
    colorCombo('azorius', 'wu'),
    colorCombo('dimir', 'ub'),
    colorCombo('rakdos', 'br'),
    colorCombo('gruul', 'rg'),
    colorCombo('selesnya', 'wg'),
    colorCombo('orzhov', 'wb'),
    colorCombo('izzet', 'ur'),
    colorCombo('golgari', 'bg'),
    colorCombo('boros', 'wr'),
    colorCombo('simic', 'ug'),
    colorCombo('bant', 'wug'),
    colorCombo('esper', 'wub'),
    colorCombo('grixis', 'ubr'),
    colorCombo('jund', 'brg'),
    colorCombo('naya', 'wrg'),
    colorCombo('abzan', 'wbg'),
    colorCombo('jeskai', 'wur'),
    colorCombo('sultai', 'ubg'),
    colorCombo('mardu', 'wbr'),
    colorCombo('temur', 'urg'),
    colorCombo('chaos', 'ubrg'),
    colorCombo('aggression', 'wbrg'),
    colorCombo('altruism', 'wurg'),
    colorCombo('growth', 'wubg'),
    colorCombo('artifice', 'wubr'),
];

const colorNames = [...colors, ...colorCombos].map(c => c.name);
export const colorNamesExpr = new RegExp(`^(${colorNames.join('|')})`, 'i');

export function getColors(str) {
    const allOptions = colors.concat(colorCombos);
    const colorByName = allOptions.find(c => c.name === str);
    return colorByName
        ? colorByName.colorChars
        : [...new Set(str.split(''))];
}

export function matchColorNames(str) {
    return str.match(colorNamesExpr);
}
