import Artist from './keywords/Artist.js';
import CardType from './keywords/CardType.js';
import Color from './keywords/Color.js';
import ColorIdentity from './keywords/ColorIdentity.js';
import FlavorText from './keywords/FlavorText.js';
import KeywordAbility from './keywords/KeywordAbility.js';
import Name from './keywords/Name.js';
import Rarity from './keywords/Rarity.js';
import RulesText from './keywords/RulesText.js';
import Watermark from './keywords/Watermark.js';

export default function register(sifter) {
    sifter.addKeywords([
        Artist,
        CardType,
        Color,
        ColorIdentity,
        FlavorText,
        KeywordAbility,
        Rarity,
        RulesText,
        Watermark
    ]);

    sifter.setDefaultStringParser((operator, expression) => {
        return new Name(operator, expression);
    });
};
