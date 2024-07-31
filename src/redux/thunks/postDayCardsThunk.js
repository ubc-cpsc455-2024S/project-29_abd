import { postDayCards } from '../actions/dayCardsActions';
import store from '../store';

const dayCards = store.getState().dayCards;
store.dispatch(postDayCards(dayCards));
