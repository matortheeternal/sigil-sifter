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
    const OriginalIsKeyword = sifter.keywords.is;
    const filteredExpressions = OriginalIsKeyword.supportedExpressions.filter(
        k => !isExpressionsToRemove.includes(k.name)
    );

    class PatchedIsKeyword extends OriginalIsKeyword {
        static get supportedExpressions() {
            return filteredExpressions;
        }
    }

    sifter.keywords.is = PatchedIsKeyword;
}

export default function register(sifter) {
    removeUnusedKeywords(sifter);
    patchIsKeyword(sifter);
    sifter.addKeywords([Template]);
    sifter.setInputAdapter(CardMagicianCard);
}
