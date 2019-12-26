import React from 'react';
import classNames from 'classnames';
import Dropdown from './Dropdown';
import { withRouter } from 'react-router-dom';
import { FOLDER_TYPE } from '../utils/constant';

const File = props => {
  const fileContainerClasses = classNames('file-container', {
    'selected-file': props.selectedFile,
  });

  const selectFile = e => {
    e.preventDefault();
    e.stopPropagation();
    if (props.type === FOLDER_TYPE)
      props.history.push(props.path, { id: props.id });
  };

  const handleRightClick = (e, fileId) => {
    if (e.type === 'contextmenu') {
      e.preventDefault();
      props.setShowDropdown(fileId);
    }
  };

  return (
    <div
      className={fileContainerClasses}
      onDoubleClick={selectFile}
      onContextMenu={e => handleRightClick(e, props.id)}
    >
      <div className={'file-image-container'}>
        <img src={props.icon} alt="file" srcSet="" />
        <p className={'extension'}>{props.extension}</p>
      </div>
      <p>{props.name}</p>
      {props.showPopUp && <Dropdown {...props} />}
    </div>
  );
};

export default withRouter(File);
