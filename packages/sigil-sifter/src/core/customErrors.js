export class NotImplementedError extends Error {
    constructor() {
        super();
        const sender = this.stack.split('\n')[2].replace(' at ', '');
        this.message = `The method ${sender} isn't implemented.`;
    }
}

export class SearchSyntaxError extends Error {
    constructor(msg, context) {
        const nextSegment = context.slice(0, context.indexOf(' '));
        super(`${msg} < ${nextSegment} >`)
    }
}

export class NoDefaultParserError extends Error {
    constructor(expression) {
        super(`No default parser configured, failed to parse ${expression.value}`);
    }
}
