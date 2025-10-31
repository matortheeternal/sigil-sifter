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

describe('CollectorNumber keyword', () => {
    it('matches cards with exactollector number using : or =', () => {
        const res1 = sifter.filter(cards, 'number:4');
        const res2 = sifter.filter(cards, 'number=4');
        expectCardNames(res1, ['Black Lotus']);
        expect(res1).toEqual(res2);
    });

    it('matches cards with number greater than a value', () => {
        const res = sifter.filter(cards, 'number>900');
        expectCardNames(res, ['Mirari\'s Wake']);
    });

    it('matches cards with number less than a value', () => {
        const res = sifter.filter(cards, 'number<5');
        expectCardNames(res, [
            'Black Lotus', 'Sire of Seven Deaths',
            'Morophon, the Boundless', 'Balance'
        ]);
        expectNotCardNames(res, [
            'All That Glitters', 'Serra Angel', 'Caretaker\'s Talent'
        ]);
    });

    it('matches cards with number greater than or equal to a value', () => {
        const res = sifter.filter(cards, 'number>=665');
        expectCardNames(res, ['Savage Ventmaw', 'Mirari\'s Wake']);
    });

    it('matches cards with number less than or equal to a value', () => {
        const res = sifter.filter(cards, 'number<=4');
        expectCardNames(res, [
            'Black Lotus', 'Sire of Seven Deaths', 'Morophon, the Boundless'
        ]);
    });

    it('excludes cards with non-matching number using !=', () => {
        const res = sifter.filter(cards, 'number!=4');
        expectNotCardNames(res, ['Black Lotus']);
        expectCardNames(res, ['Balance', 'Doubling Season']);
    });

    it('is case insensitive and supports key alias cn', () => {
        const res1 = sifter.filter(cards, 'CN=4');
        const res2 = sifter.filter(cards, 'number=4');
        expect(res1).toEqual(res2);
    });

    it('works correctly when combined with set code', () => {
        const res = sifter.filter(cards, 'set:eoc number=121');
        expectCardNames(res, ['Mayhem Devil']);
        expectNotCardNames(res, ['Sheltering Ancient', 'Tatyova, Benthic Druid']);
    });
});
