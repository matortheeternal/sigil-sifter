function parseSymbols(str) {
    const symbols = [];
    let remainingStr = str;
    while (remainingStr.length) {
        const symbol = ManaSymbol.parse(remainingStr);
        if (symbol) symbols.push(symbol);
        remainingStr = symbol
            ? symbol.remainingStr
            : remainingStr.slice(1);
    }
    return symbols;
}

export default class ManaCost {
    constructor(str) {
        this.symbols = parseSymbols(str);
    }

    contains(symbols) {
        const used = new Array(this.symbols.length).fill(false);
        for (const sym of symbols) {
            const found = this.symbols.some((s, i) => {
                if (used[i] || sym.match(s)) return false;
                used[i] = true;
                return true;
            });
            if (!found) return false;
        }
        return true;
    }
}
