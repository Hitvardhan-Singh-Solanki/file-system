import * as actions from './../actions';
import folderStructure from '../assets/data.json';

const initState = {
  folderStructure,
  currentPath: {
    pathname: '/',
    pathId: null,
    children: [],
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.CREATE:
      return {
        ...state,
        folderStructure: action.folderStructure,
        currentPath: {
          ...state.currentPath,
          children: state.currentPath.children
            ? [...state.currentPath.children, action.newChild]
            : [action.newChild],
        },
      };
    case actions.DELETE:
      return {
        ...state,
        folderStructure: action.folderStructure,
        currentPath: {
          ...state.currentPath,
          children: action.children,
        },
      };
    case actions.UPDATE_PATH:
      return {
        ...state,
        currentPath: action.currentPath,
      };
    default:
      return state;
  }
};
