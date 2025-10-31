import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';

const sifter = new Sifter();
Magic(sifter, ScryfallCard);

describe('Artist keyword', () => {
    it('handles shorthand a: and full artist: the same', () => {
        const res1 = sifter.filter(cards, 'a:walker');
        const res2 = sifter.filter(cards, 'artist:walker');
        expect(res1).toEqual(res2);
        expectCardNames(res1, [
            'Balance', 'Llanowar Elves', 'Rancor', 'Damnation'
        ]);
    });

    it('matches quoted artist name', () => {
        const res = sifter.filter(cards, 'artist:"Greg Staples"');
        expectCardNames(res, ['Diabolic Tutor', 'Serra Angel']);
    });

    it('matches regex artist name, case insensitive', () => {
        const res1 = sifter.filter(cards, 'artist:/giancola/');
        const res2 = sifter.filter(cards, 'artist:/GIANCOLA/');
        expect(res1).toEqual(res2);
        expectCardNames(res1, ['Shivan Dragon', 'Force of Will']);
    });

    it('supports partial regex matches', () => {
        const res = sifter.filter(cards, 'a:/sve/'); // Svetlin Velinov
        expectCardNames(res, ['Abrupt Decay', 'Phyrexian Arena']);
    });

    it('supports negation (-artist:)', () => {
        const res = sifter.filter(cards, '-artist:"Kev Walker"');
        expectCardNames(res, ['Solemn Simulacrum', 'Doubling Season']);
        expectNotCardNames(res, ['Balance', 'Llanowar Elves', 'Rancor', 'Damnation']);
    });

    it('matches cards with multiple artists if any match', () => {
        const res = sifter.filter(cards, 'artist:"Yeong-Hao Han"');
        expectCardNames(res, [
            'Fell the Profane // Fell Mire', 'Time Vault', 'Bident of Thassa'
        ]);
    });

    it('works in combination with other filters', () => {
        const res = sifter.filter(cards, 'artist:"Jason Chan" c=U');
        expectCardNames(res, ['Omniscience', 'Pact of Negation']);
    });

    it('handles bogus artist gracefully', () => {
        const res = sifter.filter(cards, 'artist:NotARealPerson');
        expectCardNames(res, []);
    });

    it('supports OR operator across artists', () => {
        const res = sifter.filter(cards, 'artist:"Kev Walker" OR artist:"Greg Staples"');
        expectCardNames(res, [
            // Kev Walker
            'Balance', 'Llanowar Elves', 'Rancor', 'Damnation',
            // Greg Staples
            'Diabolic Tutor', 'Serra Angel'
        ]);
    });

    it('supports AND for multiple artists on the same card', () => {
        const res = sifter.filter(cards, 'a:"Ron Spears" a:"Wayne Reynolds"');
        expectCardNames(res, [
            'Trial // Error'
        ]);
    });
});
