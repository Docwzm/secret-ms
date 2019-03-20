import { combineReducers } from 'redux'
import imInfo from './im'
import user from './user'
import menu from './menu'

export default combineReducers({
  imInfo,
  menu,
  user
})