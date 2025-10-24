export default class Node {
    constructor(sifter, match = null, str = null) {
        this.sifter = sifter;
        if (!match) return;
        this.remainingStr = str.slice(match[0].length).trimLeft();
    }

    apply(filters) {
        filters.push(this);
    }
}
