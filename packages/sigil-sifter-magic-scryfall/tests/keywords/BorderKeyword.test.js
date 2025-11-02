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

describe('Border keyword', () => {
    it('matches black-bordered cards', () => {
        const res = sifter.filter(cards, 'border:black');
        expectCardNames(res, [
            'Doubling Season',
            'Serra Angel',
            'Balance',
            'Smothering Tithe',
            'Tarmogoyf',
        ]);
        expectNotCardNames(res, ['Tariff', 'Knight of the Kitchen Sink', 'Inspirit, Flagship Vessel']);
    });

    it('matches white-bordered cards', () => {
        const res = sifter.filter(cards, 'border:white');
        expectCardNames(res, ['Tariff']);
        expectNotCardNames(res, ['Knight of the Kitchen Sink', 'Doubling Season']);
    });

    it('matches silver-bordered cards', () => {
        const res = sifter.filter(cards, 'border:silver');
        expectCardNames(res, ['Knight of the Kitchen Sink']);
        expectNotCardNames(res, ['Tariff', 'Doubling Season']);
    });

    it('matches borderless cards', () => {
        const res = sifter.filter(cards, 'border:borderless');
        expectCardNames(res, ['Inspirit, Flagship Vessel']);
        expectNotCardNames(res, ['Knight of the Kitchen Sink', 'Tariff']);
    });

    it('is case insensitive', () => {
        const res1 = sifter.filter(cards, 'border:black');
        const res2 = sifter.filter(cards, 'BORDER:BLACK');
        expect(res1).toEqual(res2);
    });

    it('supports both : and = operators', () => {
        const res1 = sifter.filter(cards, 'border:black');
        const res2 = sifter.filter(cards, 'border=black');
        expect(res1).toEqual(res2);
    });

    it('returns an empty array for unknown border types', () => {
        const res = sifter.filter(cards, 'border:rainbow');
        expect(res.length).toEqual(0);
    });
});
