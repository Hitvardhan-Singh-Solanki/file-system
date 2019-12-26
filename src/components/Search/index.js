import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import searchIcon from './../../assets/icons/search.svg';
import closeIcon from './../../assets/icons/close.svg';
import './Search.scss';
import { searchFileBasedOnName } from '../../utils';
import { FOLDER_TYPE } from '../../utils/constant';

const Search = props => {
  const [hideResult, setHideResults] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [localSearchString, setLocalSearchString] = useState('');

  const searchResultsClasses = classNames('search-results-container', {
    'display-none': hideResult,
  });

  const toggleResults = display => {
    setHideResults(display);
  };

  useEffect(() => {
    if (searchResults.length > 0 && localSearchString.length > 0) {
      toggleResults(false);
    } else {
      toggleResults(true);
    }
  }, [searchResults, localSearchString]);

  const handleSearch = e => {
    setLocalSearchString(e.target.value);
  };

  useEffect(() => {
    if (localSearchString.length > 2) {
      const searchResult = searchFileBasedOnName(
        localSearchString,
        props.folders
      );
      setSearchResults(searchResult);
    }
  }, [localSearchString, props.folders]);

  const resetState = () => {
    setHideResults(1);
    setLocalSearchString('');
    setSearchResults([]);
  };

  const navigateToFile = fileInfo => {
    if (fileInfo.type === FOLDER_TYPE)
      props.history.push(fileInfo.path, { id: fileInfo.id });
    else props.history.push(fileInfo.parentPath, { id: fileInfo.parentID });
    resetState();
  };

  const createSearchListElement = fileInformation => {
    return (
      <>
        <div>
          Name:{' '}
          <span className="list-element filename">{fileInformation.name}</span>
        </div>
        <div>
          Path:{' '}
          <span className="list-element path">{fileInformation.path}</span>
        </div>
      </>
    );
  };

  return (
    <div className="search-comp">
      <div className="search-container">
        <img src={searchIcon} alt="" srcSet="" height={15} width={15} />
        <input
          placeholder="Search for anything"
          onChange={handleSearch}
          value={localSearchString}
        />
        {searchResults.length > 0 && localSearchString.length > 0 && (
          <img
            src={closeIcon}
            alt="close"
            srcSet=""
            height={15}
            width={15}
            onClick={resetState}
          />
        )}
      </div>
      <div className={searchResultsClasses}>
        <ul>
          {searchResults.map(res => (
            <li key={res.id} onClick={() => navigateToFile(res)}>
              {createSearchListElement(res)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    folders: state.app.folderStructure,
  };
};

export default connect(mapStateToProps)(withRouter(Search));
