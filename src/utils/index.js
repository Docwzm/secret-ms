/**
 * 设置根元素字体
 */
const setHtmlFonts = () => {
  var deviceWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (deviceWidth > 640) deviceWidth = 640;
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}

/**
 * 展开注册路由
 * @param {*} routesArray 
 * @param {*} parent 
 * @param {*} routes 
 */
const extendRoutes = (routesArray, parent = '', routes = []) => {
  for (let i in routesArray) {
    let parentPath = ""
    if (routesArray[i].children) {
      parentPath += routesArray[i].path
      extendRoutes(routesArray[i].children, parentPath, routes)
    }
    routes.push({
      path: parent + routesArray[i].path,
      component: routesArray[i].component
    })
  }
  return routes
}

/**
 * 获取queryString
 * @param {*} name 
 */
const getQueryString = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]);
  return null;
}

/**
 * 获取queryString 对象
 * @param {*} objStr //?id=1&name=1 
 */
const getQueryObject = (objStr) => {
  let obj = {};
  if(objStr){
    objStr.slice(1).split('&').map(item => {
      let arr = item.split('=');
      obj[arr[0]] = arr[1]
    })
  }
  return obj;
}

/**
 * 组装queryString
 * @param {*} queryObj 
 * @param {*} hash 
 */
const makeQueryString = (queryObj, hash = '') => {
  let queryString = ''
  for (let item in queryObj) {
    if (queryObj[item]) {
      queryString += `${item}=${queryObj[item]}&`
    }
  }
  queryString = "?" + queryString.replace(/(&*$)/g, "") + hash
  return queryString
}

/**
 * 本地储存
 * @param {*} key 
 * @param {*} value 
 */
const setLocal = (key, value) => {
  return window.localStorage.setItem(key, value)
}

/**
 * 获取本地储存
 * @param {*} key 
 */
const getLocal = (key) => {
  return window.localStorage.getItem(key)
}

/**
 * 移除某个本地储存
 * @param {*} key 
 */
const removeLocal = (key) => {
  return window.localStorage.removeItem(key)
}

/**
 * 设置cookie
 * @param {*} name 
 * @param {*} value 
 * @param {*} domain 
 * @param {*} path 
 */
const setCookie = (name, value, domain, path) => {
  var expire = new Date();
  var hour = 24;
  if (hour) {
    expire.setTime(expire.getTime() + 3600000 * hour);
  }
  document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + document.location.hostname + ";"));
  return true;
}

/**
 * 获取cookie
 * @param {*} name 
 */
const getCookie = (name) => {
  var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
    m = document.cookie.match(r);
  return (!m ? "" : m[1]);
}

/**
 * 删除cookie
 * @param {*} name 
 * @param {*} domain 
 * @param {*} path 
 */
const delCookie = (name, domain, path) => {
  document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + document.location.hostname + ";"));
}

/**
 * 格式化节点树
 * @param {*} children 
 * @param {*} options 
 */
const formatTree = (children, options = []) => {
  for (let i in children) {
    let child = {}
    if (children[i].children) {
      let innerChildren = []
      formatTree(children[i].children, innerChildren)
      child.children = innerChildren
    }
    child.label = children[i].name
    child.value = children[i].id
    options.push(child)
  }
  return options
}

/**
 * 展开节点keys
 * @param {*} children 
 * @param {*} keys 
 */
const extendsNodeKeys = (children, keys = []) => {
  for (let i in children) {
    keys.push(children[i].id)
    if (children[i].children) {
      extendsNodeKeys(children[i].children, keys)
    }
  }
  return keys
}

/**
 * 路由鉴权
 * @param {*} accessRouter 服务端返回的可用菜单
 * @param {*} localRouter 本地注册的菜单
 */
const filteRouter = (accessRouter, localRouter) => {
  let extendsTree = (treeArray = [], menuKey = []) => {
    treeArray.forEach(item => {
      menuKey.push(item.text)
      if (item.children && item.children.length > 0) {
        extendsTree(item.children, menuKey)
      }
    })
    return menuKey
  }
  let accessKeys = extendsTree(accessRouter)
  let filteTree = (localTree = [], newTree = []) => {
    localTree.forEach(item => {
      if (accessKeys.indexOf(item.key) >= 0) {
        if (item.children && item.children.length > 0) {
          filteTree(item.children)
        }
        newTree.push(item)
      }
    })
    return newTree
  }
  return filteTree(localRouter)
}

/**
 * 检查数组的某一项全为真
 * @param {*} array 
 * @param {*} key 
 * @param {*} value 
 */
const checkValuesAllTrue = (array, key, value) => {
  let result = true
  if (array instanceof Array && array.length > 0) {
    array.forEach(item => {
      if (item[key] !== value) result = false;
    })
  }
  return result
}

const parseTime = (time, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  let date = time;
  if (typeof time != "object") {
    date = new Date(time)
  }
  var o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 获取路由key
 * @param {*} pathname 
 */
const getRouterKey = (pathname) => {
  let reg = new RegExp(/^\/\w+/)
  let r = pathname.match(reg)[0].replace('/', '')
  return r;
}

/**
 * 输入某行数据
 * @param {*} array 
 * @param {*} num 
 * @param {*} name 
 * @param {*} value 
 */
const setArrayItem = (array, num, name, value) => {
  for (let i in array) {
    if (array[i].num === num) {
      array[i][name] = value
    }
  }
  return array;
}

//随机字符串（字母/数字/特殊符号）
const randomWord = (randomFlag = true, min = 6, max = 12) => {
  let str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
      'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
      'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      '-', '.', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', ':', '<', '>', '?'
    ];

  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min; // 任意长度
  }
  for (let i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

/**
 * 删除数组某项
 * @param {array} table 
 * @param {string} id 
 */
const deleteTableItem = (table, num) => {
  for (let i in table) {
    if (table[i].num === num) {
      table.splice(i, 1)
    }
  }
  for (let i = 0; i < table.length; i++) {
    table[i].num = i + 1
  }
  return table
}

/**
 * 倒计时
 * @param {*} time 
 * @param {*} cb 
 */
const countDown = (time, cb) => {
  var timer = null

  function _countDown() {
    if (time > 0) {
      cb(time--)
    } else {
      clearInterval(timer)
      cb(0)
    }
  }
  timer = setInterval(_countDown, 1000);
}


export {
  setHtmlFonts,
  extendRoutes,
  getQueryString,
  getQueryObject,
  makeQueryString,
  setLocal,
  getLocal,
  removeLocal,
  setCookie,
  getCookie,
  delCookie,
  formatTree,
  extendsNodeKeys,
  filteRouter,
  checkValuesAllTrue,
  parseTime,
  getRouterKey,
  setArrayItem,
  randomWord,
  deleteTableItem,
  countDown
}