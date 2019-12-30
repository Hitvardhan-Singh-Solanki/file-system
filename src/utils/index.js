import moment from 'moment';

const constructFileName = (fileName, count) => {
  let [name, extension] = fileName.split('.');
  let currentCount = name[name.length - 1];
  name = isNaN(currentCount) ? name + count : name.slice(0, -1) + count;

  return {
    fileName: name + (extension ? `.${extension}` : ''),
    newCount: ++currentCount,
  };
};

const constructFilePath = (fileName, filePath) =>
  filePath.substring(0, filePath.lastIndexOf('/')) + `/${fileName}`;

const fileExistRename = (file, siblings, count = 1) => {
  if (!siblings.some(sib => sib.name === file.name && sib.type === file.type)) {
    siblings.push(file);
    return siblings;
  } else {
    const { fileName, newCount } = constructFileName(file.name, count);
    if (
      window.confirm(
        `The file name ${file.name} already exists you want to create ${fileName}?`
      )
    ) {
      file.name = fileName;
      file.path = constructFilePath(file.name, file.path);
      return fileExistRename(file, siblings, newCount);
    } else {
      return siblings;
    }
  }
};

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
    if (folderStructure.children) {
      folderStructure.children = fileExistRename(
        fileInformation,
        folderStructure.children
      );
    } else folderStructure.children = [fileInformation];
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
