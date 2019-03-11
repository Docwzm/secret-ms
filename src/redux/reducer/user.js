export default function text(state = '', action) {
    switch (action.type) {
        case 'SET_USER':
            return action.payload.data
        default:
            return state
    }
}