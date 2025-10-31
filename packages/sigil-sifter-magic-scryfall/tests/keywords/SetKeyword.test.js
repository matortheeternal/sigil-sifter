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

describe('Set keyword', () => {
    it('matches by set code', () => {
        const res = sifter.filter(cards, 'set:fdn');
        expectCardNames(res, [
            'Aurelia, the Warleader',
            'Tatyova, Benthic Druid',
            'Felidar Retreat',
            'Liliana, Dreadhorde General',
            'Serra Angel',
            'Shivan Dragon',
            'Llanowar Elves',
            'Omniscience',
            'Phyrexian Arena',
            'Savage Ventmaw',
            'Muldrotha, the Gravetide',
            'Sire of Seven Deaths'
        ]);
        expectNotCardNames(res, ['Black Lotus', 'Abrupt Decay']);
    });

    it('matches by set name', () => {
        const res = sifter.filter(cards, 'set:Foundations');
        expectCardNames(res, [
            'Aurelia, the Warleader',
            'Tatyova, Benthic Druid',
            'Felidar Retreat'
        ]);
        expectNotCardNames(res, ['Gitaxian Probe', 'Balance']);
    });

    it('is case insensitive', () => {
        const res1 = sifter.filter(cards, 'SET:FDN');
        const res2 = sifter.filter(cards, 'set:fdn');
        const res3 = sifter.filter(cards, 'edition:"FOUNDATIONS"');
        expect(res1).toEqual(res2);
        expect(res2).toEqual(res3);
    });

    it('supports short keys (s and e)', () => {
        const res1 = sifter.filter(cards, 's:fdn');
        const res2 = sifter.filter(cards, 'e:"Foundations"');
        expect(res1).toEqual(res2);
        expectCardNames(res1, ['Aurelia, the Warleader', 'Felidar Retreat']);
    });

    it('treats : and = operators the same', () => {
        const res1 = sifter.filter(cards, 'set=fdn');
        const res2 = sifter.filter(cards, 'set:fdn');
        expect(res1).toEqual(res2);
        expectCardNames(res1, ['Serra Angel', 'Llanowar Elves']);
    });

    it('does not match unrelated sets', () => {
        const res = sifter.filter(cards, 'set:mh2');
        expectCardNames(res, [
            'Ragavan, Nimble Pilferer', 'Goblin Bombardment', 'Esper Sentinel'
        ]);
        expectNotCardNames(res, ['Aurelia, the Warleader', 'Felidar Retreat']);
    });

    it('matches both code and name correctly in mixed queries', () => {
        const res = sifter.filter(cards, 's:fdn OR e:"Modern Horizons 2"');
        expectCardNames(res, [
            'Aurelia, the Warleader',
            'Felidar Retreat',
            'Goblin Bombardment',
            'Esper Sentinel',
            'Ragavan, Nimble Pilferer'
        ]);
    });
});
