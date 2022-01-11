import {LOGIN, LOGOUT, UPDATE_CART} from '../types';

const initialState = {
  user: [],
  cart: [],
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

    case UPDATE_CART:
      console.log('UPDATE_CART is called: ', action.payload);
      return {
        ...state,
        cart: [...action.payload],
      };

    case LOGOUT:
      console.log('LOGOUT is called.');
      return {
        ...state,
        user: [],
      };

    default:
      return state;
  }
}
