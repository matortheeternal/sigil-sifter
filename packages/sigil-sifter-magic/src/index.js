import AbilityKeyword from './keywords/AbilityKeyword.js';
import ArtistKeyword from './keywords/ArtistKeyword.js';
import CardTypeKeyword from './keywords/CardTypeKeyword.js';
import ColorKeyword from './keywords/ColorKeyword.js';
import ColorIdentityKeyword from './keywords/ColorIdentityKeyword.js';
import FlavorTextKeyword from './keywords/FlavorTextKeyword.js';
import Name from './keywords/Name.js';
import ManaValueKeyword from './keywords/ManaValueKeyword.js';
import NameKeyword from './keywords/NameKeyword.js';
import Watermark from './keywords/Watermark.js';
import RarityKeyword from './keywords/RarityKeyword.js';
import RulesTextKeyword from './keywords/RulesTextKeyword.js';
import WatermarkKeyword from './keywords/WatermarkKeyword.js';
import MagicCard from './core/MagicCard.js';

export default function register(sifter, Card) {
    if (!Card)
        throw new Error('A valid Card class must be provided.');
    if (!(Card.prototype instanceof MagicCard))
        throw new Error('Card class must inherit from MagicCard');

    sifter.addKeywords([
        AbilityKeyword,
        ArtistKeyword,
        CardTypeKeyword,
        ColorKeyword,
        ColorIdentityKeyword,
        FlavorTextKeyword,
        Rarity,
        ManaValueKeyword,
        NameKeyword,
        RarityKeyword,
        RulesTextKeyword,
        WatermarkKeyword,
    ]);

    sifter.setDefaultStringParser((operator, expression) => {
        return new NameKeyword(operator, expression);
    });

    sifter.setInputAdapter(Card);
};
