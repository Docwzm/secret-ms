export default function imInfo(state = {}, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, { config: action.payload.imConfig })
        case 'RECENTSESS':
            return Object.assign({}, state, { recentSess: action.payload.recentSess })
        case 'SELTOID':
            return Object.assign({}, state, { selToId: action.payload.selToId })
        case 'NEW_MSG':
            let historyMsg = state.historyMsg;
            historyMsg[state.selToId] = historyMsg[state.selToId].concat(action.payload.mess)
            return Object.assign({}, state, { historyMsg })
        default:
            return state
    }
}

