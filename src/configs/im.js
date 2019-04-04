const configs = {
  'static-qa2.lifesense.com': {
    imLoginInfo: {
      sdkAppID: '1400013676',
      appIDAt3rd: 'lxqa',
      accountType: '6992',
    },
    imOpts: {
      isAccessFormalEnv: true, // 是否访问正式环境下的后台接口，True-访问正式，False-访问测试环境默认访问正式环境接口，选填
      isLogOn: false // 是否开启控制台打印日志,True-开启;False-关闭，默认开启，选填
    },
    socket: '//websocket-qa2.lifesense.com/websocket/connect', // socket地址
    debug: (...msg) => console.log(...msg)
  },
  'static-qa.lifesense.com': {
    imLoginInfo: {
      sdkAppID: '1400013676',
      appIDAt3rd: 'lxqa',
      accountType: '6992',
    },
    imOpts: {
      isAccessFormalEnv: true, // 是否访问正式环境下的后台接口，True-访问正式，False-访问测试环境默认访问正式环境接口，选填
      isLogOn: false // 是否开启控制台打印日志,True-开启;False-关闭，默认开启，选填
    },
    socket: '//websocket-qa.lifesense.com/websocket/connect', // socket地址
    debug: (...msg) => console.log(...msg)
  },
  'doctor.lifesense.com': {
    imLoginInfo: {
      sdkAppID: '1400013334',
      appIDAt3rd: 'lifesense',
      accountType: '6871',
    },
    imOpts: {
      isAccessFormalEnv: true, // 是否访问正式环境下的后台接口，True-访问正式，False-访问测试环境默认访问正式环境接口，选填
      isLogOn: false // 是否开启控制台打印日志,True-开启;False-关闭，默认开启，选填
    },
    socket: '//websocket.lifesense.com/websocket/connect', // socket地址
    debug: () => {
    }
  },
  def: {
    imLoginInfo: {
      sdkAppID: '1400013334',
      appIDAt3rd: 'lifesense',
      accountType: '6871',
    },
    imOpts: {
      isAccessFormalEnv: true, // 是否访问正式环境下的后台接口，True-访问正式，False-访问测试环境默认访问正式环境接口，选填
      isLogOn: false // 是否开启控制台打印日志,True-开启;False-关闭，默认开启，选填
    },
    // imLoginInfo: {
    //   sdkAppID: '1400014768',
    //   appIDAt3rd: 'lifesense',
    //   accountType: '7487',
    // },
    // imOpts: {
    //   isAccessFormalEnv: true, // 是否访问正式环境下的后台接口，True-访问正式，False-访问测试环境默认访问正式环境接口，选填
    //   isLogOn: false // 是否开启控制台打印日志,True-开启;False-关闭，默认开启，选填
    // },
    socket: '//sports-dev.lifesense.com/websocket/connect', // socket地址
    debug: (...msg) => console.log(...msg)
  }
}

export default configs[window.location.hostname] || configs.def
