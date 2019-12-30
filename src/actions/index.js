import { store } from '../';
import {
  findChildrenOnId,
  pushNewChildToParent,
  deleteFileBasedOnId,
} from '../utils';

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const MODAL_CONTENT = 'MODAL_CONTENT';

export const CREATE = 'CREATE';
export const DELETE = 'DELETE';

export const UPDATE_PATH = 'UPDATE_PATH';

export const toggleModal = (state, content = '') => {
  return {
    type: TOGGLE_MODAL,
    payload: state,
    content,
  };
};

export const modalContent = content => {
  return {
    type: MODAL_CONTENT,
    payload: content,
  };
};

export const createFile = fileInformation => {
  const currentFolder = store.getState().app.folderStructure;
  const entire = pushNewChildToParent(fileInformation, currentFolder);
  const siblings = findChildrenOnId(fileInformation.parentID, entire);
  return {
    type: CREATE,
    folderStructure: entire,
    siblings,
  };
};

export const deleteFile = fileIdToDelete => {
  let {
    folderStructure,
    currentPath: { children },
  } = store.getState().app;
  if (children?.length > 0) {
    children = children.filter(child => child.id !== fileIdToDelete);
  }

  const newFolderStructure = deleteFileBasedOnId(
    fileIdToDelete,
    folderStructure,
    null
  );

  return {
    type: DELETE,
    folderStructure: newFolderStructure,
    children,
  };
};

export const updateCurrentPath = (updatedPath, pathId) => {
  const currentFolderStructure = store.getState().app.folderStructure;
  const nestedObj = findChildrenOnId(pathId, currentFolderStructure);
  return {
    type: UPDATE_PATH,
    currentPath: { pathname: updatedPath, pathId, children: nestedObj },
  };
};
