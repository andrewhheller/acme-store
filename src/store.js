import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger'
import thunk from 'redux-thunk';

import { schoolsReducer } from './reducers/schools';
import { studentsReducer } from './reducers/students';



// ### application global state data structure ### 
// {
//   schools: [],
//   students: []
// }

const reducer = combineReducers({
  schools: schoolsReducer,
  students: studentsReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
