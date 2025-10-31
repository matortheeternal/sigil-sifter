import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/fixtures.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames } from '../helpers.js';

describe('Produces keyword', () => {
    let sifter;

    beforeAll(() => {
        sifter = new Sifter();
        Magic(sifter, ScryfallCard);
    });

    it('matches single color exactly with =', () => {
        const res = sifter.filter(cards, 'produces=W');
        expect(res).toEqual([]);
        const res2 = sifter.filter(cards, 'produces=G');
        expectCardNames(res2, [
            'Llanowar Elves', 'The Great Henge',
            'Gaea\'s Cradle', 'Dryad Arbor'
        ]);
    });

    it('does not match when extra colors are present (=)', () => {
        const res = sifter.filter(cards, 'produces=R');
        expectCardNames(res, ['Seething Song']);
    });

    it('matches not equal (!=)', () => {
        const res = sifter.filter(cards, 'produces!=G');
        expect(res.find(c => c.name === 'Llanowar Elves')).toBeUndefined();
        expect(res.find(c => c.name === 'Seething Song')).toBeDefined();
    });

    it('matches multiple colors exactly with =', () => {
        const res = sifter.filter(cards, 'produces=GR');
        expectCardNames(res, ['Domri, Anarch of Bolas', 'Savage Ventmaw']);
    });

    it('greaterThan (>) requires superset', () => {
        const res = sifter.filter(cards, 'produces>G');
        expectCardNames(res, [
            'Domri, Anarch of Bolas', 'Savage Ventmaw', // GR
            'Birds of Paradise', 'Deathrite Shaman', 'Mirari\'s Wake',
            'Black Lotus', 'Jegantha, the Wellspring', 'City of Brass',
            'Timeless Lotus'
        ]);
    });

    it('lessThan (<) requires strict subset', () => {
        const res = sifter.filter(cards, 'produces<GR');
        expectCardNames(res, ['Llanowar Elves', 'Seething Song']);
    });

    it('greaterThanOrEqual works correctly (>=)', () => {
        const res = sifter.filter(cards, 'produces>=GR');
        expectCardNames(res, [
            'Domri, Anarch of Bolas', 'Savage Ventmaw',
            'Birds of Paradise', 'Jegantha, the Wellspring',
            'City of Brass', 'Timeless Lotus', 'Mirari\'s Wake'
        ]);
    });

    it('lessThanOrEqual works correctly (<=)', () => {
        const res = sifter.filter(cards, 'produces<=GR');
        expectCardNames(res, [
            'Llanowar Elves', 'Seething Song',
            'Domri, Anarch of Bolas', 'Savage Ventmaw'
        ]);
    });

    it('includes (:) behaves like >=', () => {
        const res1 = sifter.filter(cards, 'produces:G');
        const res2 = sifter.filter(cards, 'produces>=G');
        expect(res1).toEqual(res2);
        expectCardNames(res1, [
            'Llanowar Elves', 'The Great Henge', 'Gaea\'s Cradle', 'Dryad Arbor',
            'Domri, Anarch of Bolas', 'Savage Ventmaw', 'Birds of Paradise',
            'Deathrite Shaman', 'Mirari\'s Wake', 'Black Lotus',
            'Jegantha, the Wellspring', 'City of Brass', 'Timeless Lotus'
        ]);
    });

    it('matches colorless producers (C)', () => {
        const res = sifter.filter(cards, 'produces=C');
        expectCardNames(res, ['Sol Ring']);
    });

    it('matches mixed colorless + colors', () => {
        const res = sifter.filter(cards, 'produces>=C');
        expectCardNames(res, ['Sol Ring', 'Talisman of Creativity']);
    });

    it('handles five-color producers', () => {
        const res = sifter.filter(cards, 'produces=WUBRG');
        expectCardNames(res, [
            'Birds of Paradise',
            'Deathrite Shaman',
            'Mirari\'s Wake',
            'Black Lotus',
            'Jegantha, the Wellspring',
            'City of Brass',
            'Timeless Lotus'
        ]);
    });
});
