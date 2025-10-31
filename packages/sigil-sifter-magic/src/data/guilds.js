const colorCombo = (name, colors) => ({
    name,
    expr: new RegExp('^' + name + '$', 'i'),
    colorChars: colors.split('')
});

export default [
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
