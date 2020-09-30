import cookie from 'js-cookie';

const initial_state = {
  token: cookie.get('token') || '',
};

const userReducer = (state = initial_state, actions) => {
  switch (actions.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: actions.payload,
      };
    case 'SET_LOGOUT':
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
};

export default userReducer;
