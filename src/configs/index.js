const staticHost2ApiHost = () => {
    var mHost = window.location.hostname
    return {
        'localhost':'http://shequgouvip.com:18003',
    }[mHost] || 'http://shequgouvip.com:18003'
}

const config = {
    server: staticHost2ApiHost(),
    appType:1
}

export default config