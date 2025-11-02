import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';
import { SearchSyntaxError } from 'sigil-sifter/core';

let sifter;
beforeAll(() => {
    sifter = new Sifter();
    Magic(sifter, ScryfallCard);
});

describe('Game keyword', () => {
    it('matches cards available in paper', () => {
        const res = sifter.filter(cards, 'game:paper');
        expectCardNames(res, [
            'Doubling Season',
            'Nicol Bolas, Planeswalker',
            'Aurelia, the Warleader',
            'Felidar Retreat',
        ]);
        expectNotCardNames(res, ['Black Lotus', 'Mirror Universe']);
    });

    it('matches cards available in MTGO', () => {
        const res = sifter.filter(cards, 'game:mtgo');
        expectCardNames(res, [
            'Black Lotus',
            'Doubling Season',
            'Solemn Simulacrum',
            'Balance',
        ]);
        expectNotCardNames(res, ['Baldur\'s Gate Wilderness']);
    });

    it('matches cards available in Arena', () => {
        const res = sifter.filter(cards, 'game:arena');
        expectCardNames(res, [
            'Doubling Season',
            'Felidar Retreat',
            'Tatyova, Benthic Druid',
            'Shivan Dragon',
        ]);
        expectNotCardNames(res, ['Black Lotus', 'Griselbrand']);
    });

    it('is case insensitive', () => {
        const res1 = sifter.filter(cards, 'game:arena');
        const res2 = sifter.filter(cards, 'GAME:ARENA');
        expect(res1).toEqual(res2);
    });

    it('supports both = and : operators', () => {
        const res1 = sifter.filter(cards, 'game:mtgo');
        const res2 = sifter.filter(cards, 'game=mtgo');
        expect(res1).toEqual(res2);
    });

    it('throws SearchSyntaxError for unknown game types', () => {
        expect(() => sifter.filter(cards, 'game:playstation'))
            .toThrowError(SearchSyntaxError, /Unknown game/);
    });
});
