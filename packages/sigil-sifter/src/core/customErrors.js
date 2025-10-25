export class NotImplementedError extends Error {
    constructor() {
        super();
        this.message = `Method not implemented.`;
    }
}

export class SearchSyntaxError extends Error {
    constructor(msg, context) {
        super(`${msg} "${context}"`)
    }
}

export class SearchLengthError extends Error {
    constructor(str, maxLen) {
        super(
            `Provided search string has length ${str.length}, `+
            `which exceeds the maximum allowed length of ${maxLen}`
        );
    }
}

export class NoDefaultParserError extends Error {
    constructor(expression) {
        super(`No default parser configured, failed to parse ${expression.value}`);
    }
}

export class ParserDidNotParseError extends Error {
    constructor(parser) {
        super(`Parser ${parser.constructor.name} did not parse anything!`);
    }
}

export class KeyConflictError extends Error {
    constructor(key, keywords, keywordClass) {
        const kcName = keywordClass.name;
        const regName = keywords[key].name;
        super(`${key} for ${kcName} was already registered for ${regName}`);
        console.error(keywords);
    }
}
