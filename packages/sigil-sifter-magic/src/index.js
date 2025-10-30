import AbilityKeyword from './keywords/AbilityKeyword.js';
import ArtistKeyword from './keywords/ArtistKeyword.js';
import CardTypeKeyword from './keywords/CardTypeKeyword.js';
import ColorKeyword from './keywords/ColorKeyword.js';
import ColorIdentityKeyword from './keywords/ColorIdentityKeyword.js';
import DevotionKeyword from './keywords/DevotionKeyword.js';
import FlavorTextKeyword from './keywords/FlavorTextKeyword.js';
import LoyaltyKeyword from './keywords/LoyaltyKeyword.js';
import ManaCostKeyword from './keywords/ManaCostKeyword.js';
import ManaValueKeyword from './keywords/ManaValueKeyword.js';
import NameKeyword from './keywords/NameKeyword.js';
import PowerKeyword from './keywords/PowerKeyword.js';
import ProducesKeyword from './keywords/ProducesKeyword.js';
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
        DevotionKeyword,
        FlavorTextKeyword,
        LoyaltyKeyword,
        ManaCostKeyword,
        ManaValueKeyword,
        NameKeyword,
        PowerKeyword,
        ProducesKeyword,
        RarityKeyword,
        RulesTextKeyword,
        ToughnessKeyword,
        WatermarkKeyword,
    ]);

    sifter.setBaseStringParser((sifter, operator, expression) => {
        const keyword = new NameKeyword(sifter);
        keyword.operator = operator;
        keyword.expression = expression;
        keyword.remainingStr = expression.remainingStr;
        return keyword;
    });

    sifter.setInputAdapter(Card);
};
