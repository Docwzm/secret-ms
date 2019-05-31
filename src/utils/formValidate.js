//验证汉字
const validChinese = (rule, value, callback) => {
    if(!value){
        callback()
    }else if (/[^\u4e00-\u9fa5]/.test(value)) {
        callback('输入有误，请输入汉字');
    } else {
        callback();
    }
}

//验证整数
const validIntNumber = (rule, value, callback) => {
    if(!value){
        callback()
    }else if (/^0/.test(value)) {
        callback('输入有误，首位数字不应为0');
    } else if (/[^0-9]/.test(value)) {
        callback('输入有误，请输入整数');
    } else {
        callback();
    }
}

//验证整数+小数
const validDoubleNumber = (rule, value, callback) => {
    if(!value){
        callback()
    }else if (isNaN(Number(value))) {
        callback('输入有误，请输入数字');
    } else {
        callback();
    }
}

export {
    validChinese,
    validIntNumber,
    validDoubleNumber
}