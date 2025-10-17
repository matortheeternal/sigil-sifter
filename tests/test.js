import { compile, filter } from '../index.js';

const cards = [{
    name: 'Squee, the Immortal',
    manaCost: '1RR',
    superType: 'Legendary Creature',
    subType: 'Goblin',
    colors: ['R'],
    power: '2',
    toughness: '1',
    rarity: 'Rare',
    illustrator: 'Svetlin Velinov'
}, {
    name: 'Niv-Mizzet, Parun',
    manaCost: 'UUURRR',
    superType: 'Legendary Creature',
    subType: 'Dragon Wizard',
    colors: ['R', 'B'],
    power: '5',
    toughness: '5',
    rarity: 'Rare',
    rulesText: [
        `This spell can't be countered.`,
        `Flying`,
        `Whenever you draw a card, ~ deals 1 damage to any target.`,
        `Whenever a player casts an instant or sorcery spell, you draw a card.`
    ].join('\n'),
    illustrator: 'Svetlin Velinov'
}, {
    name: 'Omniscience',
    manaCost: '7UUU',
    superType: 'Enchantment',
    subType: '',
    colors: ['B'],
    rarity: 'Mythic',
    rulesText:
        `You may cast spells from your hand without paying their ` +
        `mana costs.`,
    flavorText: [
        `“The things I once imagined would be my greatest achievements` +
        `were only the first steps toward a future I can only begin to fathom.”`,
        `—Jace Beleren`
    ].join('\n'),
    illustrator: 'Jason Chan'
}, {
    name: 'Multani, Maro-Sorcerer',
    manaCost: '4GG',
    superType: 'Legendary Creature',
    subType: 'Elemental',
    colors: ['G'],
    power: '*',
    toughness: '*',
    rarity: 'Rare',
    rulesText: [
        `Shroud`,
        `~’s power and toughness are each equal to the total ` +
        `number of cards in all players’ hands.`,
    ].join('\n'),
    flavorText: [
        `“To make peace with the forest, make peace with me.”`,
        `—Multani, to Urza`
    ].join('\n'),
    illustrator: 'Daren Bader'
}, {
    name: 'Murder',
    manaCost: '1BB',
    superType: 'Instant',
    subType: '',
    colors: ['B'],
    rarity: 'Common',
    rulesText: 'Destroy target creature.',
    flavorText: 'Razorkin have only one hobby.',
    illustrator: 'Domenico Cava'
}, {
    name: 'Titanoth Rex',
    manaCost: '7GG',
    superType: 'Creature',
    subType: 'Dinosaur Beast',
    colors: ['G'],
    rarity: 'Uncommon',
    rulesText: [
        'Trample',
        'Cycling 1G',
        'When you cycle ~, put a trample counter on target creature you control.'
    ].join('\n'),
    illustrator: 'Svetlin Velinov'
}, {
    name: 'Acrobatic Leap',
    manaCost: 'W',
    superType: 'Instant',
    colors: ['W'],
    rarity: 'Common',
    rulesText: 'Target creature gets +1/+3 and gains flying until end of turn. Untap it.',
    flavorText: 'As the cliff began to crumble, Wayta danced fearlessly across the tumbling stones, knowing Ajij would never let her fall.',
    illustrator: 'Fesbra'
}];

function printFilter(str) {
    const results = filter(cards, str);
    console.log(str, results.map(r => r.name));
}

printFilter('c=R');
printFilter('t:creature OR t:enchantment');
printFilter('o:/(trample|flying)/ (t:creature OR t:instant)');
