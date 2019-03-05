import { createStore, applyMiddleware } from 'redux'
import state from './state'
import reducer from './reducer'
import thunk from 'redux-thunk';

const store = createStore(reducer, state, applyMiddleware(thunk))

export default store