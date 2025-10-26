import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from './fixtures/fixtures.json' with { type: 'json' };
import ScryfallCard from '../src/ScryfallCard.js';
import {expectCardNames, expectNotCardNames} from './helpers.js';

const sifter = new Sifter();
Magic(sifter, ScryfallCard);

describe('default search', () => {
    it('searches by name', () => {
        const res1 = sifter.filter(cards, 'a');
        const res2 = sifter.filter(cards, 'name:a');
        expect(res1).toEqual(res2);
        expectCardNames(res1, [
            'Solemn Simulacrum', 'Doubling Season', 'Arena',
            'Tatyova, Benthic Druid', 'Nicol Bolas, Planeswalker',
        ]);
    });

    it('supports quoted strings', () => {
        const res = sifter.filter(cards, '", "');
        expectCardNames(res, [
            'Tatyova, Benthic Druid', 'Nicol Bolas, Planeswalker',
            'Aurelia, the Warleader', 'Zacama, Primal Calamity',
            'Ragavan, Nimble Pilferer', 'Inspirit, Flagship Vessel',
            'Liliana, Dreadhorde General', 'Oko, Thief of Crowns'
        ]);
    });

    it('supports exact matching', () => {
        const res2 = sifter.filter(cards, '!"All That Glitters"');
        expectCardNames(res2, ['All That Glitters']);
        const res1 = sifter.filter(cards, '!Wear');
        expectCardNames(res1, ['Wear // Tear']);
    });

    it('supports negation', () => {
        const res1 = sifter.filter(cards, '-"//"');
        const res2 = sifter.filter(cards, '-//');
        expect(res1).toEqual(res2);
        expectNotCardNames(res1, [
            'Wear // Tear', 'Trail // Error',
            'Fell the Profane // Fell Mire',
            'The Kami War // O-Kagachi Made Manifest',
        ]);
    });
});
