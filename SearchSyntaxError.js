export default class SearchSyntaxError extends Error {
    constructor(msg, context) {
        const nextSegment = context.slice(0, context.indexOf(' '));
        super(`${msg} < ${nextSegment} >`)
    }
}
