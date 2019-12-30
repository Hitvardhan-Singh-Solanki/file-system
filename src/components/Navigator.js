import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';
import backIcon from './../assets/icons/back.png';
import Search from './Search';
import { findParentIdByPathName } from '../utils';

const Navigator = props => {
  const setActivePath = path => {
    const holderArr = path.split('/');
    return holderArr.map((path, index) => {
      if (index === holderArr.length - 1) {
        return (
          <span style={{ color: 'black' }} key={uuid()}>
            {path}
          </span>
        );
      }
      return `${path} / `;
    });
  };

  return (
    <div className={'navigator-view'}>
      <div className="search-and-crumb">
        <img
          onClick={() => {
            const { parentID, parentPath } = findParentIdByPathName(
              props.currentPath,
              props.folderStructure
            );
            if (parentID && parentPath)
              props.history.push(parentPath, { id: parentID });
          }}
          src={backIcon}
          alt="back"
          srcSet=""
          height={25}
          width={25}
          className={'back-navigation'}
        />
        <div className="bread-crumbs">
          <p>{setActivePath(`root${props.currentPath}`)}</p>
        </div>
      </div>
      <Search />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentPath: state.app.currentPath.pathname,
    folderStructure: state.app.folderStructure,
  };
};

export default connect(mapStateToProps)(withRouter(Navigator));
