export default function menu(state={},action){
    switch(action.type){
        case "CHANGE_MENU":
            state.key = action.payload.pathname
            return state
        default:
            return state
    }
}