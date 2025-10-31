const color = (id, name) => ({
    id,
    name,
    expr: new RegExp('^' + name + '$', 'i'),
    colorChars: [id]
});

export default [
    color('W', 'White'),
    color('U', 'Blue'),
    color('B', 'Black'),
    color('R', 'Red'),
    color('G', 'Green'),
    color('C', 'Colorless'),
];
