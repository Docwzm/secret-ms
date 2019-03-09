const staticHost2ApiHost = () => {
    var mHost = window.location.hostname
    return {
        'static-qa2.lifesense.com': '//health-qa2.lifesense.com',
        'static-qa.lifesense.com': '//health-qa.lifesense.com',
        'sp.dabaihome.com':''
    }[mHost] || ''
}

const config = {
    server: staticHost2ApiHost(),
    appType:1
}

export default config