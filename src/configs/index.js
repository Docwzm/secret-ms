const staticHost2ApiHost = () => {
    var mHost = window.location.hostname
    return {
        'localhost':'https://sports-qa2.lifesense.com',
        'static-qa2.lifesense.com': 'https://sports-qa2.lifesense.com',
        'static-qa.lifesense.com': 'https://sports-qa.lifesense.com',
        'doctor.lifesense.com':'https://doctor-api.lifesense.com',
        'cdn.lifesense.com':'https://doctor-api.lifesense.com',
    }[mHost] || ''
}

const config = {
    server: staticHost2ApiHost(),
    appType:1
}

export default config