const staticHost2ApiHost = () => {
    var mHost = window.location.hostname
    return {
        'localhost':'https://symy.powerionics.cn',
        'symy.powerionics.cn':'https://symy.powerionics.cn',
        'powerionics.vip':'https://powerionics.vip'
    }[mHost] || 'https://powerionics.vip'
}

const config = {
    server: staticHost2ApiHost(),
    appType:1
}

export default config