import defaultGameFormats from '../data/gameFormats.js';

export default class FormatExtension {
    constructor(data) {
        this.gameFormats = data.gameFormats || defaultGameFormats;
        this.gameFormats.forEach(format => {
            if (format.expr) return;
            format.expr = new RegExp(`^${format.name}$`, 'i')
        });
    }

    resolveFormat(value) {
        return this.gameFormats.find(g => g.expr.test(value));
    }
}
