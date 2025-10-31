import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';

const sifter = new Sifter();
Magic(sifter, ScryfallCard);

describe('Flavor Text keyword', () => {
    it('handles shorthand ft: and full flavor: the same', () => {
        const res1 = sifter.filter(cards, 'ft:"awestruck birds"');
        const res2 = sifter.filter(cards, 'flavor:"awestruck birds"');
        expect(res1).toEqual(res2);
        expectCardNames(res1, [
            'Wonder'
        ]);
    });

    it('matches quoted phrase inside flavor text', () => {
        const res = sifter.filter(cards, 'flavor:"Follow the light"');
        expectCardNames(res, [
            'Serra Angel'
        ]);
    });

    it('matches unquoted single word', () => {
        const res = sifter.filter(cards, 'ft:donation');
        expectCardNames(res, [
            'Smothering Tithe'
        ]);
    });

    it('matches regex, case insensitive', () => {
        const res1 = sifter.filter(cards, 'ft:/rakdos/');
        const res2 = sifter.filter(cards, 'ft:/RAKDOS/');
        expect(res1).toEqual(res2);
        expectCardNames(res1, [
            'Rakdos Charm',
            'Mayhem Devil'
        ]);
    });

    it('supports negation (-ft:)', () => {
        const res = sifter.filter(cards, '-flavor:all');
        expectNotCardNames(res, [
            'Sol Ring',
            'Nature\'s Claim',
            'Void Rend',
            'Gaea\'s Cradle',
            'Aura Shards',
            'Force of Will',
            'Primeval Titan',
            'Platinum Angel',
            'Ghostly Prison',
            'Tiamat',
            'Birgi, God of Storytelling // Harnfel, Horn of Bounty'
        ]);
    });

    it('matches cards with multiple flavor texts if any match', () => {
        const res = sifter.filter(cards, 'ft:"knight of Windgrace"');
        expectCardNames(res, [
            'Fell the Profane // Fell Mire'
        ]);
    });

    it('supports OR operator across flavor texts', () => {
        const res = sifter.filter(cards, 'ft:avacyn OR ft:helvault');
        expectCardNames(res, [
            'Griselbrand',
            'Anguished Unmaking'
        ]);
    });

    it('supports AND for multiple terms in flavor texts', () => {
        const res = sifter.filter(cards, 'ft:Kaldheim ft:tremble');
        expectCardNames(res, [
            'Birgi, God of Storytelling // Harnfel, Horn of Bounty'
        ]);
    });

    it('works with combination filters', () => {
        const res = sifter.filter(cards, 'ft:donation c=W');
        expectCardNames(res, [
            'Smothering Tithe'
        ]);
    });

    it('handles bogus flavor search gracefully', () => {
        const res = sifter.filter(cards, 'ft:"NotARealQuote"');
        expectCardNames(res, []);
    });
});
