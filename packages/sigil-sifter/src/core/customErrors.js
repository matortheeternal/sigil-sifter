export class NotImplementedError extends Error {
    constructor() {
        super(`Method not implemented.`);
        this.name = 'NotImplementedError';
    }
}

export class SearchSyntaxError extends Error {
    constructor(msg, context) {
        super(`${msg} "${context}"`);
        this.name = 'SearchSyntaxError';
    }
}

export class SearchLengthError extends Error {
    constructor(str, maxLen) {
        super(
            `Provided search string has length ${str.length}, `+
            `which exceeds the maximum allowed length of ${maxLen}`
        );
        this.name = 'SearchLengthError';
    }
}

export class NoDefaultParserError extends Error {
    constructor(expression) {
        super(`No default parser configured, failed to parse "${expression.value}"`);
        this.name = 'NoDefaultParserError';
    }
}

export class KeyConflictError extends Error {
    constructor(key, keywords, keywordClass) {
        const kcName = keywordClass.name;
        const regName = keywords[key].name;
        super(`Key "${key}" for ${kcName} was already registered for ${regName}`);
        this.name = 'KeyConflictError';
    }
}

export class ExtensionCollisionError extends Error {
    constructor(name) {
        super(`Extension "${name}" already registered`);
        this.name = 'ExtensionCollisionError';
    }
}
