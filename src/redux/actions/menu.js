export default {
    changeMenu(pathname) {
        return {
            type: "CHANGE_MENU",
            payload: {
                pathname
            }
        }
    }
}