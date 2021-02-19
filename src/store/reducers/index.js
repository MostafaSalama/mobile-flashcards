import { combineReducers } from 'redux';
import decks from './decks';
import newDeckId from './newDeckId';

/**
 * main app reducer
 */
export default combineReducers({
    decks,
    newDeckId
});