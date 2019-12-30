import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import File from './File';
import { toggleModal } from '../actions';
import CreateNewFile from './Popups/CreateNewFile';
import fileIcon from './../assets/icons/file.png';
import folderIcon from './../assets/icons/folder.png';
import newFileIcon from './../assets/icons/newfile.png';
import { FOLDER_TYPE } from '../utils/constant';

const FilePit = ({
  isNoneSelected,
  toggleModalLocal,
  markSomeSelected,
  currentPath,
}) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const childrenLocal = currentPath.children?.map(child => {
      child.selected = false;
      child.extension = child.name.split('.')[1];
      child.icon = child.type === FOLDER_TYPE ? folderIcon : fileIcon;
      child.showPopUp = false;
      return child;
    });
    setFiles(childrenLocal || []);
  }, [currentPath]);

  useEffect(() => {
    if (isNoneSelected) {
      const filesNew = files?.map(file => {
        file.selected = false;
        file.showPopUp = false;
        return file;
      });
      if (filesNew) setFiles([...filesNew]);
    }
  }, [isNoneSelected]);

  const addNewFile = () => {
    toggleModalLocal(true, <CreateNewFile />);
  };

  const setShowDropdown = fileId => {
    const filesNew = files.map(file => {
      if (file.id === fileId) {
        file.showPopUp = true;
      } else {
        file.showPopUp = false;
      }
      return file;
    });
    setFiles([...filesNew]);
    markSomeSelected();
  };

  return (
    <div className={'file-pit'}>
      {files?.map(file => (
        <File key={file.id} {...file} setShowDropdown={setShowDropdown} />
      ))}
      <div className={'file-container'}>
        <button onClick={addNewFile}>
          <img src={newFileIcon} alt="addnew" srcSet="" />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedFile: state.app.selected,
    currentPath: state.app.currentPath,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleModalLocal(state, content) {
    dispatch(toggleModal(state, content));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilePit);
