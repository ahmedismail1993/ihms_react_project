const initial_state = {
  errors: {},
};

const errorsReducer = (state = initial_state, actions) => {
  switch (actions.type) {
    case 'SET_SERVER_ERRORS':
      return {
        ...state,
        errors: { ...actions.payload },
      };
      break;
    case 'CLEAR_SERVER_ERRORS':
      return {
        errors: {},
      };
      break;
    default:
      return state;
  }
};

export default errorsReducer;
