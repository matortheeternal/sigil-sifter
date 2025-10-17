const color = (char, name) => ({ char, name });
const colorCombo = (name, colors) => ({name, colors});

const colors = [
    color('W', 'White'),
    color('U', 'Blue'),
    color('B', 'Black'),
    color('R', 'Red'),
    color('G', 'Green'),
    color('C', 'Colorless'),
];

const colorMap = new Map(colors.map(c => [c.char, c.name]));

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
const colorNamesExpr = new RegExp(`^(${colorNames.join('|')})`, 'i');

function getColors(str) {
    const allOptions = colors.concat(colorCombos);
    const colorByName = allOptions.find(c => c.name === str);
    return colorByName
        ? colorByName.char || colorByName.colors.split('')
        : [...new Set(str.toUpperCase())];
}

export default class ColorExpression {
    static match(str) {
        return str.match(/^([wubrgc]+)/i)
            || str.match(colorNamesExpr);
    }

    static parse(match, str) {
        return new ColorExpression(match, str);
    }

    constructor(match, str) {
        this.value = match[1];
        this.colors = getColors(this.value);
        if (this.colors.includes('C') && this.colors.length > 1)
            throw new Error('A card cannot be both colorless and colored.');
        this.remainingStr = str.slice(match[0].length);
    }

    equals(val) {
        return val.length === this.colors.length
            && val.every(c => this.colors.includes(c));
    }

    greaterThan(val) {
        return val.length > this.colors.length
            && this.colors.every(c => val.includes(c));
    }

    lessThan(val) {
        return val.length < this.colors.length
            && val.every(c => this.colors.includes(c));
    }
}
