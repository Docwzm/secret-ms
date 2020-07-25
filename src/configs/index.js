const staticHost2ApiHost = () => {
    var mHost = window.location.hostname
    return {
        'localhost':'https://symy.powerionics.cn',
        'symy.powerionics.cn':'https://symy.powerionics.cn',
        'www.powerionics.vip':'https://www.powerionics.vip'
    }[mHost] || 'https://www.powerionics.vip'
}

const config = {
    server: staticHost2ApiHost(),
    appType:1
}

export default config