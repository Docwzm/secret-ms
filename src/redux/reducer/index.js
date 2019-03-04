import { combineReducers } from 'redux'
import imConfig from './im'
import text from './user'

export default combineReducers({
  text,
  imConfig
})