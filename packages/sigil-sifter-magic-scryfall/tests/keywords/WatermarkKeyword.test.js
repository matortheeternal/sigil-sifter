import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import {expectCardNames, expectNotCardNames} from '../helpers.js';

const sifter = new Sifter();
Magic(sifter, ScryfallCard);

describe('Watermark keyword', () => {
    it('is case insensitive', () => {
        const res1 = sifter.filter(cards, 'watermark:golgari');
        const res2 = sifter.filter(cards, 'WATERMARK:GOLGARI');
        expect(res1).toEqual(res2);
        expectCardNames(res1, ['Deathrite Shaman', 'Crime // Punishment']);
    });

    it('supports multiple keywords', () => {
        const res = sifter.filter(cards, 'watermark:golgari watermark:orzhov');
        expectCardNames(res, ['Crime // Punishment']);
        expectNotCardNames(res, ['Deathrite Shaman']);
    });
});
