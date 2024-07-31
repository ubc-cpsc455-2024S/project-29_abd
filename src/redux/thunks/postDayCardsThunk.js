import { postDayCards } from '../actions/dayCardsActions';
import store from '../store';

const dayCards = store.getState().dayCards;
store.dispatch(postDayCards(dayCards)).then(() => {
    console.log('Post Day Cards action dispatched successfully.');
}).catch((error) => {
    console.error('Error dispatching Post Day Cards action:', error);
});
