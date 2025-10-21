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
import MagicCard from './core/MagicCard.js';

export default function register(sifter, Card) {
    if (!Card)
        throw new Error('A valid Card class must be provided.');
    if (!(Card.prototype instanceof MagicCard))
        throw new Error('Card class must inherit from MagicCard');

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

    sifter.setInputAdapter(Card);
};
