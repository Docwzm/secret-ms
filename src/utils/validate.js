/**
 * 验证手机号码
 * @param {*} phone 
 */
const isPhoneNumber = (phone) => {
  let result = false
  let reg = new RegExp(/^([1][3,4,5,6,7,8,9])\d{9}$/);
  let r = phone.match(reg)
  r ? result = true : result = false
  return result
}


export {
  isPhoneNumber
}