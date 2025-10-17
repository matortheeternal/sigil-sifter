export default class Node {
    constructor(match, str) {
        if (!match) return;
        this.remainingStr = str.slice(match[0].length);
    }

    apply(filters) {
        filters.push(this);
    }
}
