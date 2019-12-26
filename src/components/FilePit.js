import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import File from './File';
import { toggleModal } from '../actions';
import CreateNewFile from './Popups/CreateNewFile';
import fileIcon from './../assets/icons/file.png';
import folderIcon from './../assets/icons/folder.png';
import newFileIcon from './../assets/icons/newfile.png';
import { FOLDER_TYPE } from '../utils/constant';

const FilePit = props => {
  const [files, setFiles] = useState(props.children);
  useEffect(() => {
    const children = props.children?.map(child => {
      child.selected = false;
      child.extension = child.name.split('.')[1];
      child.icon = child.type === FOLDER_TYPE ? folderIcon : fileIcon;
      child.showPopUp = false;
      return child;
    });
    setFiles(children);
  }, [props.children]);

  useEffect(() => {
    if (props.isNoneSelected) {
      const filesNew = files?.map(file => {
        file.selected = false;
        file.showPopUp = false;
        return file;
      });
      if (filesNew) setFiles([...filesNew]);
    }
  }, [props.isNoneSelected]);

  const addNewFile = () => {
    props.toggleModalLocal(true, <CreateNewFile />);
  };

  const changeSelection = fileId => {
    const filesNew = files.map(file => {
      if (file.id === fileId) {
        file.selected = true;
      } else {
        file.selected = false;
      }
      return file;
    });
    setFiles([...filesNew]);
    props.markSomeSelected();
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
    props.markSomeSelected();
  };

  return (
    <div className={'file-pit'}>
      {files?.map(file => (
        <File
          key={file.id}
          {...file}
          changeSelection={changeSelection}
          setShowDropdown={setShowDropdown}
        />
      ))}
      <div className={'file-container'}>
        <button onClick={addNewFile}>
          <img src={newFileIcon} alt="addnew" srcSet="" />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  selectedFile: state.app.selected,
  children: state.app.currentPath.children,
});

const mapDispatchToProps = dispatch => ({
  toggleModalLocal(state, content) {
    dispatch(toggleModal(state, content));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilePit);
