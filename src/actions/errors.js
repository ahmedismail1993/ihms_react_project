import { CLEAR_SERVER_ERRORS, SET_SERVER_ERRORS } from '../types/errors';

export const setServerErrors = (payload) => {
  return {
    type: SET_SERVER_ERRORS,
    payload,
  };
};
export const clearServerErrors = () => {
  return {
    type: CLEAR_SERVER_ERRORS,
  };
};
