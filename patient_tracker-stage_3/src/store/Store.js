import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import SLReducer from './reducers/SLReducer';
import CurrentStatus from './reducers/CurrentStatus';
import Patient from './reducers/patient'

const rootReducer = combineReducers({
    SLReducer,
    CurrentStatus,
    Patient
})

export default Store = createStore(rootReducer, undefined, compose(applyMiddleware(thunk), autoRehydrate()));