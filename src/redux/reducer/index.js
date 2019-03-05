import { combineReducers } from 'redux'
import imInfo from './im'
import text from './user'

export default combineReducers({
  text,
  imInfo
})