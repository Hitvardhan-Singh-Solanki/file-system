import React from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import FileSystemContainer from './FileSystemContainer';
import Popup from './components/Popups';

const App = props => (
  <>
    <Router>
      <FileSystemContainer />
    </Router>
    <Popup>{props.modalContent}</Popup>
  </>
);

const mapStateToProps = state => ({
  modalContent: state.modal.content,
});

export default connect(mapStateToProps)(App);
