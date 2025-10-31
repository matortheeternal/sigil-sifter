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

describe('has: keyword', () => {
    describe('watermark', () => {
        it('matches cards that have a watermark', () => {
            const res = sifter.filter(cards, 'has:watermark');
            expectCardNames(res, [
                'Gitaxian Probe', 'Deathrite Shaman', 'Dark Ritual', 'Void Rend',
                'Raffine, Scheming Seer', 'Crime // Punishment', 'Goblin Bombardment'
            ]);
            expectNotCardNames(res, ['Balance', 'Solemn Simulacrum']);
        });

        it('does not match cards without a watermark', () => {
            const res = sifter.filter(cards, '-has:watermark');
            expectNotCardNames(res, [
                'Gitaxian Probe', 'Deathrite Shaman', 'Dark Ritual', 'Void Rend',
                'Raffine, Scheming Seer', 'Crime // Punishment', 'Goblin Bombardment'
            ]);
        });
    });

    describe('indicator', () => {
        it('matches cards that have a color indicator', () => {
            const res = sifter.filter(cards, 'has:indicator');
            expectCardNames(res, [
                'Dryad Arbor', 'Rograkh, Son of Rohgahh', 'Pact of Negation'
            ]);
            expectNotCardNames(res, ['Aurelia, the Warleader', 'Felidar Retreat']);
        });

        it('does not match cards without an indicator', () => {
            const res = sifter.filter(cards, '-has:indicator');
            expectNotCardNames(res, [
                'Dryad Arbor', 'Rograkh, Son of Rohgahh', 'Pact of Negation'
            ]);
        });
    });
});
