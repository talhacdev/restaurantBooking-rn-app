import {LOGIN} from '../types';

const initialState = {
  user: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log('LOGIN is called: ', action.payload);
      return {
        ...state,
        user: [...action.payload],
        // user: {...action.payload},
      };

    default:
      return state;
  }
}
