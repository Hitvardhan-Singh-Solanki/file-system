import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions';
import closeIcon from './../../assets/icons/close.svg';
import './CreateNewFile.scss';
import './FileInfo.scss';
import { formattedDate } from '../../utils';

const FileInfoList = ({ name, createdBy, createdDate, size }) => {
  return (
    <div className="file-info-list">
      <div className="file-info-element">
        <p>Name</p>
        <p>{name}</p>
      </div>
      <div className="file-info-element">
        <p>Size</p>
        <p>{size}</p>
      </div>
      <div className="file-info-element">
        <p>Created by</p>
        <p>{createdBy}</p>
      </div>
      <div className="file-info-element">
        <p>Created date</p>
        <p>{formattedDate(createdDate)}</p>
      </div>
    </div>
  );
};

const CreateNewFile = props => {
  return (
    <div className="create-new-file">
      <p className="create-new-file-title">Create New</p>
      <div className={'file-info-image-container'}>
        <img src={props.icon} alt="" srcSet="" />
      </div>
      <FileInfoList
        id={props.id}
        name={props.name}
        createdBy={props.author}
        createdDate={props.createDate}
        size={props.size}
      />
      <button
        className={'close-modal-button'}
        onClick={() => props.toggleModalLocal(false)}
      >
        <img src={closeIcon} alt="closeModal" srcSet="" />
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleModalLocal(state, content) {
    dispatch(toggleModal(state, content));
  },
});

export default connect(null, mapDispatchToProps)(CreateNewFile);
