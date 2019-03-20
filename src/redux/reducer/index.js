import { combineReducers } from 'redux'
import imInfo from './im'
import isInChat from './chat'
import user from './user'
import menu from './menu'

export default combineReducers({
  imInfo,
  isInChat,
  menu,
  user
})