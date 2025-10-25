export default class Item {
    constructor(obj) {
        this.item = obj;
    }

    get name() {
        return this.item.name;
    }

    get price() {
        return parseFloat(this.item.price.slice(1));
    }

    get sold() {
        return this.item.sold;
    }
}
