export default function imInfo(state = {}, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {config:action.payload.imConfig})
        case 'RECENTSESS':
            return Object.assign({}, state, {recentSess:action.payload.recentSess})
        case 'SELTOID':
            return Object.assign({}, state, {selToId:action.payload.selToId})
        default:
            return state
    }
}

