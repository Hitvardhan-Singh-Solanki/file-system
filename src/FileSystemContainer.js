import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import FolderTree from './components/FolderTree';
import Explorer from './components/Explorer';
import './FileSystemContainer.scss';

const FileSystemContainer = props => {
  return (
    <div className={'container'}>
      <FolderTree {...props} />
      <Route path="*" component={Explorer} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    children: state.app.children,
  };
};

export default connect(mapStateToProps)(FileSystemContainer);
