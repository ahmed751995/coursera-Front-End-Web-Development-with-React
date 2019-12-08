import { PROMOTIONS } from '../shared/promotions';

export const Promotions = (state = PROMOTIONS, action) => {
    switch (action.type) {
    default:
	console.log('promotion called');
        return state;
      }
};
