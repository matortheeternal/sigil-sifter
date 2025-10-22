export function expectCardNames(cards, expectedNames) {
    const actualNames = cards.map(c => c.name);
    for (const name of expectedNames)
        expect(actualNames).toContain(name);
}

export function printArray(items) {
    console.log('[' + items.map(c => `'${c.name}'`).join(', ') + ']');
}
