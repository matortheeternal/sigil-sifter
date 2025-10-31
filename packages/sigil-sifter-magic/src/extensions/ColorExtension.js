import defaultColors from '../data/colors.js';
import defaultGuilds from '../data/guilds.js';

export default class ColorExtension {
    constructor(data) {
        this.colors = data.colors || defaultColors;
        this.guilds = data.guilds || defaultGuilds;
    }

    resolveColors(str) {
        const allOptions = this.colors.concat(this.guilds);
        const colorByName = allOptions.find(c => c.expr.test(str));
        return colorByName
            ? colorByName.colorChars
            : [...new Set(str.toUpperCase().split(''))];
    }

    get colorNamesExpr() {
        const colorNames = this.colors.concat(this.guilds).map(c => c.name);
        return new RegExp(`^(${colorNames.join('|')})`, 'i');
    }
}
