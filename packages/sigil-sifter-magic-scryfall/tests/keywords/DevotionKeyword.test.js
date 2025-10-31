import Sifter from 'sigil-sifter';
import Magic from '@sigil-sifter/magic';
import cards from '../fixtures/cards.json' with { type: 'json' };
import ScryfallCard from '../../src/ScryfallCard.js';
import { expectCardNames, expectNotCardNames } from '../helpers.js';
import {SearchSyntaxError} from 'sigil-sifter/core';

describe('Devotion keyword', () => {
    let sifter;

    beforeAll(() => {
        sifter = new Sifter();
        Magic(sifter, ScryfallCard);
    });

    describe('with single color symbols', () => {
        it ('excludes non-permanents', () => {
            const res = sifter.filter(cards, 'devotion:{r}');
            expectNotCardNames(res, [ 'Seething Song', 'Blasphemous Act']);
        });

        it('handles equality', () => {
            const res = sifter.filter(cards, 'devotion={b}');
            expectCardNames(res, [
                'Call the Spirit Dragons', 'Mayhem Devil',
                'Leyline of the Guildpact', 'Deathrite Shaman'
            ]);
        });

        it('handles greater than', () => {
            const res = sifter.filter(cards, 'devotion>G');
            expectCardNames(res, [
                'Primeval Titan', 'Rampaging Baloths', 'The Great Henge',
                'Leyline of the Guildpact'
            ]);
            expectNotCardNames(res, [
                'Domri, Anarch of Bolas', 'Birds of Paradise', 'Tiamat'
            ]);
        });

        it('handles less than', () => {
            const res = sifter.filter(cards, 'devotion<UU');
            expectCardNames(res, [
                'Atraxa, Praetors\' Voice', 'Raffine, Scheming Seer',
                'Midnight Clock', 'Leyline of the Guildpact',
                'Nicol Bolas, Planeswalker', 'Tatyova, Benthic Druid'
            ]);
            expectNotCardNames(res, ['Omniscience', 'Bident of Thassa']);
        });

        it('handles greater than or equal', () => {
            const res1 = sifter.filter(cards, 'devotion>={W}');
            const res2 = sifter.filter(cards, 'devotion:{W}');
            expect(res1).toEqual(res2);
            expectCardNames(res1, [
                'Shalai, Voice of Plenty', 'Teferi, Time Raveler',
                'Caretaker\'s Talent', 'Tiamat', 'Soul Warden',
                'Aurelia, the Warleader', 'Leyline of the Guildpact'
            ]);
        });

        it('handles less than or equal', () => {
            const res = sifter.filter(cards, 'devotion<={R}{R}');
            expectCardNames(res, [
                'Shivan Dragon', 'Leyline of the Guildpact',
                'Terror of the Peaks', 'Aurelia, the Warleader',
                'Nicol Bolas, Planeswalker',
                'Birgi, God of Storytelling // Harnfel, Horn of Bounty'
            ]);
        });

        it('throws with two or more different colors', () => {
            expect(() => sifter.filter(cards, 'devotion:{R}{W}')).toThrowError(
                SearchSyntaxError,
                'Devotion can only match single color and hybrid mana "{R}{W}"'
            );
        });
    });

    describe('with hybrid two-color symbols', () => {
        it('handles equality', () => {
            const res = sifter.filter(cards, 'DEVOTION=r/bb/r');
            expectCardNames(res, [
                'Liliana, Dreadhorde General', 'Nicol Bolas, Planeswalker',
                'Aurelia, the Warleader', 'Shivan Dragon', 'Terror of the Peaks',
                'Fell the Profane // Fell Mire'
            ]);
            expectNotCardNames(res, [
                'Leyline of the Guildpact', 'Korvold, Fae-Cursed King',
                'The Kami War // O-Kagachi Made Manifest'
            ]);
        });

        it('handles greater than', () => {
            const res = sifter.filter(cards, 'devotion>G/W');
            expectCardNames(res, [
                'Rampaging Baloths', 'Leyline of the Guildpact',
                'Serra Angel', 'Aurelia, the Warleader'
            ]);
            expectNotCardNames(res, [
                'Zacama, Primal Calamity', 'Call the Spirit Dragons',
                'Stoneforge Mystic', 'Llanowar Elves', 'Aura Shards'
            ]);
        });

        it('handles less than', () => {
            const res = sifter.filter(cards, 'devotion<G/WG/W');
            expectCardNames(res, [
                'Zacama, Primal Calamity', 'Call the Spirit Dragons',
                'Stoneforge Mystic', 'Llanowar Elves', 'Mirari\'s Wake'
            ]);
            expectNotCardNames(res, [
                'Rampaging Baloths', 'Serra Angel', 'Aurelia, the Warleader',
                'The Great Henge', 'Jolrael, Empress of Beasts'
            ]);
        });

        it('throws with more than one symbol type', () => {
            const invalidQueries = ['G/WG/R', '{G/W}{G}'];
            for (const q of invalidQueries) {
                expect(() => sifter.filter(cards, `devotion:${q}`))
                    .toThrowError(
                        SearchSyntaxError,
                        /Devotion can only match single color and hybrid mana/
                    );
            }
        });
    });

    describe('with hybrid three+ color symbols', () => {
        it('handles equality', () => {
            const res = sifter.filter(cards, 'devotion=G/W/U');
            expectCardNames(res, [
                'Atraxa, Praetors\' Voice', 'Raffine, Scheming Seer',
                'Llanowar Elves', 'Zacama, Primal Calamity',
                'Leyline of the Guildpact', 'Mirari\'s Wake'
            ]);
            expectNotCardNames(res, [
                'Rampaging Baloths', 'Serra Angel', 'Aurelia, the Warleader',
                'The Great Henge', 'Jolrael, Empress of Beasts'
            ]);
        });

        it('handles greater than', () => {
            const res = sifter.filter(cards, 'devotion>G/W/U/R');
            expectCardNames(res, [
                'Rampaging Baloths', 'Serra Angel', 'Aurelia, the Warleader',
                'The Great Henge', 'Jolrael, Empress of Beasts', 'Omniscience',
                'Shivan Dragon', 'Leyline of the Guildpact'
            ]);
            expectNotCardNames(res, [
                'Nicol Bolas, Planeswalker', 'Fell the Profane // Fell Mire',
                'Arena', 'Felidar Retreat', 'Deathrite Shaman',
                'Zacama, Primal Calamity', 'Griselbrand'
            ]);
        });

        it('handles less than', () => {
            const res = sifter.filter(cards, 'devotion<G/W/U/R/B');
            expectCardNames(res, [
                'Black Lotus', 'Sol Ring', 'Gaea\'s Cradle',
                'Mirror Universe', 'Morophon, the Boundless'
            ]);
            expectNotCardNames(res, [
                'Caretaker\'s Talent', 'Midnight Clock', 'Birds of Paradise',
                'Temur Ascendancy', 'Goblin Bombardment', 'Griselbrand'
            ])
        });
    });

    describe('other symbols', () => {
        it('throws', () => {
            const invalidQueries = ['2/G', 'I', '3', 'c', '{S}', 'X', 'H/R'];
            for (const q of invalidQueries) {
                expect(() => sifter.filter(cards, `devotion:${q}`))
                    .toThrowError(
                        SearchSyntaxError,
                        /Devotion can only match single color and hybrid mana/
                    );
            }
        });
    });
});
