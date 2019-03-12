export default function imInfo(state = {}, action) {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload.imConfig)
            return Object.assign({}, state, { config: action.payload.imConfig })
        case 'RECENTSESS':
            return Object.assign({}, state, { recentSess: action.payload.data })
        case 'SELTOID':
            return Object.assign({}, state, { selToId: action.payload.selToId })
        case 'HISTORY_MSG':
            return Object.assign({}, state, { historyMsg: action.payload.data })
        case 'FRIENDLIST':
            return Object.assign({}, state, { friendList: action.payload.data })
        default:
            return state
    }
}

