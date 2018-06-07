import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import places from './reducers/places'
import thunk from 'redux-thunk'
import ui from './reducers/ui'
import auth from './reducers/auth'

const rootReducer = combineReducers({
  places,
  ui,
  auth
})

let composeEnhancers = compose

if(__DEV__) composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () =>  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default configureStore