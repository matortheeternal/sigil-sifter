import MagicCard from './core/MagicCard.js';
import ColorExtension from './extensions/ColorExtension.js';
import GameExtension from './extensions/GameExtension.js';
import KeywordExtension from './extensions/KeywordExtension.js';
import LanguageExtension from './extensions/LanguageExtension.js';
import RarityExtension from './extensions/RarityExtension.js';
import SetExtension from './extensions/SetExtension.js';
import * as keywords from './keywords/index.js';

export default function register(sifter, Card, data = {}) {
    if (!Card)
        throw new Error('A valid Card class must be provided.');
    if (!(Card.prototype instanceof MagicCard))
        throw new Error('Card class must inherit from MagicCard');

    sifter.addKeywords(Object.values(keywords));

    sifter.setBaseStringParser((sifter, operator, expression) => {
        const keyword = new keywords.NameKeyword(sifter);
        keyword.operator = operator;
        keyword.expression = expression;
        keyword.remainingStr = expression.remainingStr;
        return keyword;
    });

    sifter.setInputAdapter(Card);

    sifter.extend(ColorExtension, data);
    sifter.extend(GameExtension, data);
    sifter.extend(KeywordExtension, data);
    sifter.extend(LanguageExtension, data);
    sifter.extend(SetExtension, data);
    sifter.extend(RarityExtension, data);
};
