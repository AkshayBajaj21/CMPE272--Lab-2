import { combineReducers } from 'redux';
import userreducer from './userreducer';
import coursereducer from './coursereducer';
// import groupreducer from './groupreducer'
// import memberreducer from './memberreducer'

export default combineReducers({
    // filesreducer,
    userreducer,
    coursereducer
    // groupreducer,
    // memberreducer
})