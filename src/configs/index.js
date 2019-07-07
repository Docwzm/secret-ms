const staticHost2ApiHost = () => {
    var mHost = window.location.hostname
    return {
        'localhost':'http://meinvbingyue.vipgz1.idcfengye.com',
    }[mHost] || 'http://meinvbingyue.vipgz1.idcfengye.com'
}

const config = {
    server: staticHost2ApiHost(),
    wapHostName:'http://meinvbingyue.vipgz1.idcfengye.com',
    appType:1
}

export default config