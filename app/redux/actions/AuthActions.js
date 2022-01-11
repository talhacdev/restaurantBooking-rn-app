import {LOGIN, UPDATE_CART, LOGOUT} from '../types';

export const Login = payload => ({
  type: LOGIN,
  payload,
});

export const Logout = payload => ({
  type: LOGOUT,
  payload,
});

export const UpdateCart = payload => ({
  type: UPDATE_CART,
  payload,
});
