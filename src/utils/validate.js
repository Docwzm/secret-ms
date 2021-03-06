/**
 * 验证手机号码
 * @param {*} phone
 */
const isPhoneNumber = phone => {
	let result = false;
	let reg = new RegExp(/^([1][2,3,4,5,6,7,8,9])\d{9}$/);
	let r = phone.match(reg);
	r ? (result = true) : (result = false);
	return result;
};

/**
 * 校验用户名
 * @param {*} name
 */
const isPersonName = name => {
	let result = false;
	if (name && name.length < 20) {
		result = true;
	}
	return result;
};

/**
 * 校验密码
 * @param {*} password
 */
const isPassword = password => {
	let result = false;
	if (password.length >= 6 && password.length < 16) {
		result = true;
	}
	return result;
};

/**
 * 是否包含全部的测量类型
 *
 */
const isMeasureTypeFull = tableData => {
	let results = true;
	let type = null;
	let typeArray = [];
	for (let i in tableData) {
		if (tableData[i].type !== type) {
			typeArray.push(tableData[i].type);
		}
	}
	if (typeArray.length < 3) {
		return false;
	}
	return results;
};

const isTwoNumber = number => {
	let results = false;
	if (!isNaN(number) && number.length <= 2) {
		results = true;
	}
	return results;
};

export {
	isPhoneNumber,
	isPersonName,
	isPassword,
	isMeasureTypeFull,
	isTwoNumber
};