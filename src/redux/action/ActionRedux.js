import { LOGIN_SUCCESS, RELOAD_IU, SEND_PHOTO_SUCCESS } from '../saga/ActionTypes';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const reload_IU = (idIU) => ({
  type: RELOAD_IU,
  payload: idIU,
});
export const send_Photo_Success = (money, note, date) => ({
  type: SEND_PHOTO_SUCCESS,
  payload: {
    money: money,
    note: note,
    date: date
  },
});