const staticHost2ApiHost = () => {
    var mHost = window.location.hostname
    return {
        'localhost':'',
    }[mHost] || ''
}

const config = {
    server: staticHost2ApiHost(),
    appType:1
}

export default config