
import myState from '../state'
export default function imInfo(state = {}, action) {
    switch (action.type) {
        case 'RESET':
            return myState.imInfo
        case 'LOGIN':
            return Object.assign({}, state, { config: action.payload.imConfig })
        case 'RECENTSESS':
            return Object.assign({}, state, { recentSess: action.payload.data })
        case 'UPDATE_RECENTSESS':
            let recentSess = state.recentSess
            recentSess.splice(action.payload.index, 1, action.payload.data)
            return Object.assign({}, state, { recentSess })
        case 'SELTOID':
            return Object.assign({}, state, { selToId: action.payload.selToId })
        case 'HISTORY_MSG':
            return Object.assign({}, state, { historyMsg: action.payload.data })
        case 'FRIENDLIST':
        console.log(action)
            return Object.assign({}, state, { friendList: action.payload.data })
        case 'NEWMSG':
            // let friendList = action.payload.friendList || state.friendList
            // let historyMsg = action.payload.historyMsg || state.historyMsg
            // let recentSess = action.payload.recentSess || state.recentSess
            return Object.assign({}, state, { ...action.payload })
        case 'LOADMESS':
            let friendList = action.payload.friendList || state.friendList
            let historyMsg = action.payload.historyMsg || state.historyMsg
            // let recentSess = action.payload.recentSess || state.recentSess
            return Object.assign({}, state, { historyMsg, friendList })
        case 'SETIMSTATE':
            if (action.payload.type == 1) {
                return { ...state }
            } else {
                return { ...state, ...action.payload.data }
            }

        default:
            return state
    }
}

