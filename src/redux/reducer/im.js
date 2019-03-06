export default function imInfo(state = {}, action) {
    switch (action.type) {
        case 'LOGIN':
        console.log(action.payload.imConfig)
            return Object.assign({}, state, { config: action.payload.imConfig })
        case 'RECENTSESS':
            return Object.assign({}, state, { recentSess: action.payload.recentSess })
        case 'SELTOID':
            return Object.assign({}, state, { selToId: action.payload.selToId })
        case 'NEW_MSG':
            let newHistoryMsg = state.historyMsg;
            newHistoryMsg[state.selToId] = newHistoryMsg[state.selToId].concat(action.payload.mess)
            return Object.assign({}, state, { historyMsg: newHistoryMsg })
        case 'HISTORY_MSG':
            return Object.assign({}, state, { historyMsg:action.payload.data })
        case 'UPDATE_UNREADCOUNT':
            return Object.assign({}, state, { friendList:action.payload.data })
        case 'SEND_MSG':
            return Object.assign({}, state, { historyMsg:action.payload.data })
        default:
            return state
    }
}

