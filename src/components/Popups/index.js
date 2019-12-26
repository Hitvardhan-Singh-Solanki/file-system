import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

const Popup = props => {
  const modalClasses = classNames('overlay', {
    'close-modal': !props.isModalOpen,
  });

  return (
    <div className={modalClasses}>
      <div className={'animate popup-content'}>{props.children}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  isModalOpen: state.modal.isModalOpen,
});

export default connect(mapStateToProps)(Popup);
