const validChinese = (rule, value, callback) => {
    if (/[^\u4e00-\u9fa5]/.test(value)) {
        callback('输入有误，请输入中文');
    } else {
        callback();
    }
}

const validIntNumber = (rule, value, callback) => {
    if (/^0/.test(value)) {
        callback('输入有误，首位数字不应为0');
    } else if (/[^0-9]/.test(value)) {
        callback('输入有误，请输入整数');
    } else {
        callback();
    }
}

const validDoubleNumber = (rule, value, callback) => {
    if (/^0/.test(value)) {
        callback('输入有误，首位数字不应为0');
    } else if (/^[1-9]+((\.[0-9]+)|([0-9]*?))/.test(value)) {
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