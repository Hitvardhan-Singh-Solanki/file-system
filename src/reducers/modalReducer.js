import * as actions from './../actions';

const initState = {
  isModalOpen: false,
  content: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: action.payload,
        content: action.content,
      };
    case actions.MODAL_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};
