const staticHost2ApiHost = () => {
    var mHost = window.location.hostname
    return {
        'localhost': 'http://dabai.24onlines.top/api-gateway/',
        'sp.dabaihome.com':'http://app.dabaihome.com/api-gateway/'
    }[mHost] || 'http://app.dabaihome.com/api-gateway/'
}

const config = {
    server: staticHost2ApiHost(),
    appType:3
}

export default config