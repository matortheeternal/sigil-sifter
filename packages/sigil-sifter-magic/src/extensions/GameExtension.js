import defaultGames from '../data/games.js';

export default class GameExtension {
    constructor(data) {
        this.games = data.games || defaultGames;
        this.games.forEach(g => {
            if (g.expr) return;
            g.expr = new RegExp(`^${g.name}$`, 'i')
        });
    }

    resolveGame(value) {
        return this.games.find(g => g.expr.test(value));
    }
}
