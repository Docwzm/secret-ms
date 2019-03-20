
export default function isInChat(state = '', action) {
    switch (action.type) {
        case 'SETCHATIN':
            return action.payload.data
        default:
            return state
    }
}

