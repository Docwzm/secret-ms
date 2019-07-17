export default {
    setUser(data) {
        console.log(data)
        return {
            type: 'SET_USER',
            payload:{
                data
            }
        }
    }
}