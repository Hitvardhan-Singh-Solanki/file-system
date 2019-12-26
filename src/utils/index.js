import moment from 'moment';

export const formattedDate = dateString =>
  moment(dateString).format('DD[th] MMM, YYYY');

export const searchFileBasedOnName = (searchString, folders) => {
  let searchResults = [];
  if (folders.name.includes(searchString)) {
    searchResults.push({
      name: folders.name,
      id: folders.id,
      path: folders.path,
      type: folders.type,
      parentID: folders.parentID,
      parentPath: folders.parentPath,
    });
  }
  if (folders.children?.length > 0) {
    for (let i = 0; i < folders.children.length; ++i) {
      const ele = searchFileBasedOnName(searchString, folders.children[i]);
      if (ele?.length > 0) searchResults = [...searchResults, ...ele];
    }
  }
  return searchResults;
};

export const findChildrenOnId = (idToFind, folderStructure) => {
  if (folderStructure.id === idToFind) {
    return folderStructure.children;
  }

  if (folderStructure.children && folderStructure.children.length > 0) {
    for (let i = 0; i < folderStructure.children.length; ++i) {
      const ele = findChildrenOnId(idToFind, folderStructure.children[i]);
      if (ele) return ele;
    }
  }
};

export const pushNewChildToParent = (fileInformation, folderStructure) => {
  if (folderStructure.id === fileInformation.parentID) {
    if (folderStructure.children)
      folderStructure.children.push(fileInformation);
    else folderStructure.children = [fileInformation];
  } else {
    for (let i = 0; i < folderStructure.children?.length; ++i) {
      const ele = pushNewChildToParent(
        fileInformation,
        folderStructure.children[i]
      );
      if (ele) folderStructure.children[i] = ele;
    }
  }
  return folderStructure;
};

export const deleteFileBasedOnId = (
  fileId,
  folderStructure,
  parentFolderStructure
) => {
  if (folderStructure.id === fileId) {
    if (folderStructure.parentID && parentFolderStructure) {
      parentFolderStructure.children = parentFolderStructure.children.filter(
        child => child.id !== fileId
      );
    } else {
      folderStructure = {};
    }
  } else {
    for (let i = 0; i < folderStructure.children?.length; ++i) {
      deleteFileBasedOnId(fileId, folderStructure.children[i], folderStructure);
    }
  }
  return folderStructure;
};
