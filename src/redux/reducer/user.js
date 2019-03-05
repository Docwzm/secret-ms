export default function text(state = '', action) {
    switch (action.type) {
        case 'ADD_TODO':
            return action.payload.text
        default:
            return state
    }
}