export default class SetExtension {
    constructor(data) {
        this.sets = data.sets || [];
        this.sets.forEach(set => {
            if (set.expr) return;
            set.expr = new RegExp(`^(${set.name}|${set.code})$`, 'i');
        });
    }

    resolveSet(str) {
        return this.sets.find(set => set.expr.test(str));
    }
}
