const staticHost2ApiHost = () => {
    var mHost = window.location.hostname
    return {
        'static-qa.lifesense.com': '//health-qa.lifesense.com',
        'sp.dabaihome.com':''
    }[mHost] || ''
}

const config = {
    server: staticHost2ApiHost(),
    appType:3
}

export default config