
export default function imInfo(state = {}, action) {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload.imConfig)
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
            console.log('.////////////////')
            console.log(state)
            console.log(action.payload)
            if (action.payload.type == 1) {
                return Object.assign({}, state)
            }else{
                return Object.assign({}, state, { ...action.payload.data })
            }
            
        default:
            return state
    }
}

