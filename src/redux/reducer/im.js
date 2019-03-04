export default function imLogin(state = {}, action) {
    switch (action.type) {
        case 'IM_LOGIN':
            return Object.assign({}, state, action.payload.imConfig)
        default:
            return state
    }
}