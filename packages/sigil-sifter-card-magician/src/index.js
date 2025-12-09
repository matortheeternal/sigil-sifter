import Template from './keywords/Template.js';
import CardMagicianCard from './CardMagicianCard.js';

const keywordsToRemove = [
    'BannedKeyword', 'FormatKeyword', 'GameKeyword', 'RestrictedKeyword',
    'SetKeyword', 'SetTypeKeyword'
];

const isExpressionsToRemove = [
    'BoosterExpression', 'PromoExpression', 'ReprintExpression',
    'ReservedExpression', 'SpotlightExpression'
];

function removeUnusedKeywords(sifter) {
    keywordsToRemove.forEach(key => {
        delete sifter.keywords[key];
    });
}

function patchIsKeyword(sifter) {
    const oldExprs = sifter.keywords.IsKeyword.supportedExpressions;
    const newExprs = oldExprs.filter(k => {
        return !isExpressionsToRemove.includes(k.name);
    });
    Object.defineProperty(sifter.keywords.IsKeyword, 'supportedExpressions', {
        configurable: true,
        enumerable: true,
        get: () => newExprs
    });
}

export default function register(sifter) {
    removeUnusedKeywords(sifter);
    patchIsKeyword(sifter);
    sifter.addKeywords([Template]);
    sifter.setInputAdapter(CardMagicianCard);
}
