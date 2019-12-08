import { LEADERS } from '../shared/leaders';

export const Leaders = (state = LEADERS, action) => {
    switch (action.type) {
    default:
	console.log('leaders called');
          return state;
      }
};
