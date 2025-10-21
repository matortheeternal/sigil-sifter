import AbilityKeyword from './keywords/AbilityKeyword.js';
import ArtistKeyword from './keywords/ArtistKeyword.js';
import CardTypeKeyword from './keywords/CardTypeKeyword.js';
import ColorKeyword from './keywords/ColorKeyword.js';
import ColorIdentityKeyword from './keywords/ColorIdentityKeyword.js';
import FlavorTextKeyword from './keywords/FlavorTextKeyword.js';
import LoyaltyKeyword from './keywords/LoyaltyKeyword.js';
import ManaValueKeyword from './keywords/ManaValueKeyword.js';
import NameKeyword from './keywords/NameKeyword.js';
import PowerKeyword from './keywords/PowerKeyword.js';
import RarityKeyword from './keywords/RarityKeyword.js';
import RulesTextKeyword from './keywords/RulesTextKeyword.js';
import ToughnessKeyword from './keywords/ToughnessKeyword.js';
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
        LoyaltyKeyword,
        ManaValueKeyword,
        NameKeyword,
        PowerKeyword,
        RarityKeyword,
        RulesTextKeyword,
        ToughnessKeyword,
        WatermarkKeyword,
    ]);

    sifter.setDefaultStringParser((operator, expression) => {
        return new NameKeyword(operator, expression);
    });

    sifter.setInputAdapter(Card);
};
