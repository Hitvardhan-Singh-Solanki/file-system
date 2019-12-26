import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import './Switch.scss';
import { FOLDER_TYPE, FILE_TYPE } from '../../utils/constant';

const Switch = ({ selectedType }) => {
  const [active, setActive] = useState(0);
  const [fileClassName, setFileClassName] = useState('');
  const [folderClassName, setFolderClassName] = useState('');

  useEffect(() => {
    const fileClassName = classnames({ active: active === 0 });
    const folderClassName = classnames({ active: active === 1 });
    setFileClassName(fileClassName);
    setFolderClassName(folderClassName);
    selectedType(active ? FOLDER_TYPE : FILE_TYPE);
  }, [active, selectedType]);

  return (
    <div className="switch-container">
      <div className={fileClassName} onClick={() => setActive(0)}>
        File
      </div>
      <div className={folderClassName} onClick={() => setActive(1)}>
        Folder
      </div>
    </div>
  );
};

export default Switch;
