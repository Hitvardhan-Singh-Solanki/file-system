import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './dropdown.scss';
import { toggleModal, deleteFile } from '../../actions';
import FileInfo from '../Popups/FileInfo';
import { FOLDER_TYPE } from '../../utils/constant';

const Dropdown = props => {
  const workerOptionsClasses = classNames('worker-opts', {
    'display-none': false,
  });

  const showFileInfo = e => {
    if (e) e.preventDefault();
    props.toggleModalLocal(true, <FileInfo {...props} />);
  };

  const navigateToFile = e => {
    e.preventDefault();
    e.stopPropagation();
    if (props.type === FOLDER_TYPE)
      props.history.push(props.path, { id: props.id });
    else showFileInfo();
  };

  const deleteFile = e => {
    e.preventDefault();
    e.stopPropagation();
    props.deleteFileLocal(props.id);
  };

  return (
    <div className={workerOptionsClasses}>
      <ul>
        <li onClick={navigateToFile}>Open</li>
        <li onClick={showFileInfo}>Info</li>
        <li onClick={deleteFile}>Delete</li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleModalLocal(state, content) {
    dispatch(toggleModal(state, content));
  },
  deleteFileLocal(fileId) {
    dispatch(deleteFile(fileId));
  },
});

export default connect(null, mapDispatchToProps)(withRouter(Dropdown));
