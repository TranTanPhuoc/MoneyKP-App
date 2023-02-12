import { LOGIN_SUCCESS, RELOAD_IU } from '../saga/ActionTypes';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const reload_IU = (idIU) => ({
  type:RELOAD_IU,
  payload:idIU,
});