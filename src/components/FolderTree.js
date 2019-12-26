import React from 'react';
import { connect } from 'react-redux';
import Folders from './Folders';

import { withRouter, Link } from 'react-router-dom';

const FolderTree = props => {
  return (
    <div className={'folderTree'}>
      <Link
        className="custom-padding-20"
        to={{
          pathname: '/',
        }}
      >
        {props.folderStructure.name.toUpperCase()}
      </Link>
      <Folders folderStructure={props.folderStructure.children} />
    </div>
  );
};

const mapStateToProps = state => ({
  selected: state.app.selected,
  folderStructure: state.app.folderStructure,
});

export default connect(mapStateToProps)(withRouter(FolderTree));
