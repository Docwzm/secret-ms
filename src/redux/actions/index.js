import imAction from './im'
import userAction from './user'
import menuAction from './menu'

export default {
    ...imAction,
    ...userAction,
    ...menuAction,
}