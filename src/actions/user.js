import { SET_TOKEN, SET_LOGOUT } from '../types/user';
import { StoreData } from '../api/index';
import cookie from 'js-cookie';
const setToken = (payload) => {
  return {
    type: SET_TOKEN,
    payload,
  };
};
const setLogout = () => {
  return {
    type: SET_LOGOUT,
  };
};

export const UserAuth = (data) => {
  return (dispatch) => {
    return StoreData({ resource: data.resource, data: data.payload }).then(
      (res) => {
        if (res) {
          const { access_token } = res.data;
          cookie.set('token', access_token);
          dispatch(setToken(access_token));
        }
      }
    );
  };
};

export const logout = () => {
  return (dispatch) => {
    cookie.remove('token');
    dispatch(setLogout());
    window.location.reload();
  };
};
