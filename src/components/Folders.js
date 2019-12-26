import React from 'react';
import classNames from 'classnames';
import Accordion from './Accordian';
import dropdown from '../assets/icons/dropdown.svg';
import { withRouter } from 'react-router-dom';
import { FOLDER_TYPE } from '../utils/constant';

const Folders = props => {
  const navigateToFile = (e, ele) => {
    e.stopPropagation();
    e.preventDefault();
    props.history.push(ele.path, { id: ele.id });
  };

  const renderSubmenus = sub => {
    return sub.map(ele => {
      if (ele.type === FOLDER_TYPE) {
        return (
          <div onClick={e => navigateToFile(e, ele)} key={ele.id}>
            <Accordion
              title={ele.name}
              icon={ele.children?.length ? dropdown : ''}
            >
              {renderSubmenus(ele.children || [])}
            </Accordion>
          </div>
        );
      }
    });
  };

  const folderStructureClasses = classNames(
    'sub-structure',
    'custom-padding-20',
    { selected: props.selected }
  );

  return (
    <div className={folderStructureClasses}>
      {renderSubmenus(props.folderStructure)}
    </div>
  );
};

export default withRouter(Folders);
