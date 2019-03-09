import { combineReducers } from 'redux'
import imInfo from './im'
import text from './user'
import menu from './menu'

export default combineReducers({
  text,
  imInfo,
  menu
})