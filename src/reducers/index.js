import { combineReducers } from 'redux';
import app from './appReducer';
import modal from './modalReducer';

export default combineReducers({ app, modal });
