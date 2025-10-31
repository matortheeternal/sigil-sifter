import { Keyword } from 'sigil-sifter/keywords';
import { IncludesOperator } from 'sigil-sifter/operators';
import DFCExpression from '../expressions/is/DFCExpression.js';
import FlipExpression from '../expressions/is/FlipExpression.js';
import FrenchVanillaExpression from '../expressions/is/FrenchVanillaExpression.js';
import HistoricExpression from '../expressions/is/HistoricExpression.js';
import HybridExpression from '../expressions/is/HybridExpression.js';
import LevelerExpression from '../expressions/is/LevelerExpression.js';
import MDFCExpression from '../expressions/is/MDFCExpression.js';
import MeldExpression from '../expressions/is/MeldExpression.js';
import ModalExpression from '../expressions/is/ModalExpression.js';
import PartyExpression from '../expressions/is/PartyExpression.js';
import PermanentExpression from '../expressions/is/PermanentExpression.js';
import PhyrexianExpression from '../expressions/is/PhyrexianExpression.js';
import SpellExpression from '../expressions/is/SpellExpression.js';
import SplitExpression from '../expressions/is/SplitExpression.js';
import TransformExpression from '../expressions/is/TransformExpression.js';
import VanillaExpression from '../expressions/is/VanillaExpression.js';

export default class IsKeyword extends Keyword {
    static get keys() {
        return ['is'];
    }

    static get supportedOperators() {
        return [IncludesOperator];
    }

    static get supportedExpressions() {
        return [
            DFCExpression, FlipExpression, FrenchVanillaExpression,
            HistoricExpression, HybridExpression, LevelerExpression,
            MDFCExpression, MeldExpression, ModalExpression,
            PartyExpression, PermanentExpression, PhyrexianExpression,
            SpellExpression, SplitExpression, TransformExpression,
            VanillaExpression
        ];
    }
}
