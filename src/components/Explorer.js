import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Navigator from './Navigator';
import FilePit from './FilePit';
import { updateCurrentPath } from '../actions';

const Explorer = props => {
  const [isNoneSelected, setIsNoneSelected] = useState(false);

  useEffect(() => {
    if (!props.location.state) {
      return props.history.push('/', {
        id: props.rootId,
      });
    }
    props.updateCurrentPathLocal(
      props.location.pathname,
      props.location.state?.id
    );
  }, [props.location]);

  const markNoneSelected = e => {
    e.preventDefault();
    setIsNoneSelected(true);
  };

  const markSomeSelected = () => {
    setIsNoneSelected(false);
  };

  return (
    <div className={'explorer custom-padding-20'} onClick={markNoneSelected}>
      <Navigator showView={props.location.pathname} />
      <FilePit
        isNoneSelected={isNoneSelected}
        markSomeSelected={markSomeSelected}
        showView={props.location.pathname}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  rootId: state.app.folderStructure.id,
});

const mapDispatchToProps = dispatch => ({
  updateCurrentPathLocal(pathname, id) {
    dispatch(updateCurrentPath(pathname, id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
