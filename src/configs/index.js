const staticHost2ApiHost = () => {
    var mHost = window.location.hostname
    return {
        'localhost': '',
        'sp.dabaihome.com':''
    }[mHost] || ''
}

const config = {
    server: staticHost2ApiHost(),
    appType:3
}

export default config