const staticHost2ApiHost = () => {
    var mHost = window.location.hostname
    return {
        'localhost':'https://symy.powerionics.cn',
    }[mHost] || 'https://symy.powerionics.cn'
}

const config = {
    server: staticHost2ApiHost(),
    appType:1
}

export default config