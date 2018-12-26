import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const initialState = {
    leaders: LEADERS,
    promotions: PROMOTIONS,
    dishes: DISHES,
    comments: COMMENTS
};

export const Reducer = (state = initialState, action) => {
    return state;
};