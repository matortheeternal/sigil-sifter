import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';

let sifter;
beforeAll(() => {
    sifter = new Sifter();
    Magic(sifter, ScryfallCard);
});

describe('Banned keyword', () => {
    it('matches cards banned in Modern', () => {
        const res = sifter.filter(cards, 'banned:modern');
        expectCardNames(res, [
            'Gitaxian Probe',
            'Deathrite Shaman',
            'Seething Song',
            'Oko, Thief of Crowns',
            'Uro, Titan of Nature\'s Wrath',
            'Jegantha, the Wellspring',
            'The One Ring'
        ]);
        expectNotCardNames(res, ['Black Lotus', 'Doubling Season']);
    });

    it('matches cards banned in Legacy', () => {
        const res = sifter.filter(cards, 'banned:legacy');
        expectCardNames(res, [
            'Balance',
            'Gitaxian Probe',
            'Deathrite Shaman',
            'Oko, Thief of Crowns',
            'Black Lotus',
            'Sol Ring',
            'Time Vault'
        ]);
        expectNotCardNames(res, ['Dark Ritual', 'Doubling Season']);
    });

    it('matches cards banned in Commander', () => {
        const res = sifter.filter(cards, 'banned:commander');
        expectCardNames(res, ['Balance', 'Black Lotus', 'Primeval Titan', 'Griselbrand', 'Time Vault']);
        expectNotCardNames(res, ['Tatyova, Benthic Druid', 'Doubling Season']);
    });

    it('matches cards banned in Historic', () => {
        const res = sifter.filter(cards, 'banned:historic');
        expectCardNames(res, [
            'Oko, Thief of Crowns',
            'Uro, Titan of Nature\'s Wrath',
            'Reanimate',
            'Swords to Plowshares',
            'Sneak Attack',
            'Lightning Bolt'
        ]);
        expectNotCardNames(res, ['Black Lotus', 'Balance']);
    });

    it('is case insensitive', () => {
        const res1 = sifter.filter(cards, 'banned:Modern');
        const res2 = sifter.filter(cards, 'BANNED:modern');
        expect(res1).toEqual(res2);
    });

    it('supports both = and : syntax', () => {
        const res1 = sifter.filter(cards, 'banned:modern');
        const res2 = sifter.filter(cards, 'banned=modern');
        expect(res1).toEqual(res2);
    });

    it('returns empty results for formats with no bans', () => {
        const res = sifter.filter(cards, 'banned:standard');
        expect(res.length).toBe(0);
    });
});
