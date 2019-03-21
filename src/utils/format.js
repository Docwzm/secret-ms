/**
 * 格式化睡眠数据
 * @param {*} array  原始睡眠数据
 * @param {*} heartRateList  原始心率数据
 * @param {*} dayArray 时间范围
 */
const formatSleepData = (array, heartRateList, dayArray) => {
    let dayArrayFormat = dayArray.map(item => item.replace('/', '-'))
    let formatArray = []
    for (let i in dayArrayFormat) {
        let totalSleep = 0
        for (let j in array) {
            if (array[j].awakeningTime.indexOf(dayArrayFormat[i]) >= 0) {
                totalSleep += array[j].totalSleepTime
            }
        }
        formatArray.push({
            day: dayArrayFormat[i],
            totalSleep: totalSleep
        })
    }
    //混入心率数据
    for (let i in formatArray) {
        for (let j in heartRateList) {
            if (heartRateList[j].measurementDate.indexOf(formatArray[i].day) >= 0) {
                formatArray[i].heartRate = heartRateList[j].silentHeartRate
            }
        }
    }

    //图表显示不连续的线，把0替换成Null
    let checkZero = formatArray.map(item => {
        if (item.totalSleep === 0) {
            item.totalSleep = null
        } else {
            item.totalSleep = +(item.totalSleep / 60).toFixed(2)
        }
        if (!item.heartRate) {
            item.heartRate = null
        }
        return item
    })
    return checkZero
}


/**
 * 格式化体重数据
 * @param {*} weightData 
 * @param {*} dayArray 
 */
const formatWeightData = (weightData, dayArray) => {
    let dayArrayFormat = dayArray.map(item => item.replace('/', '-'))
    let formatArray = []
    for (let i in dayArrayFormat) {
        let totalWeight = 0
        let totalBmi = 0
        let times = 0
        for (let j in weightData) {
            if (weightData[j].measurementDate.indexOf(dayArrayFormat[i]) >= 0) {
                totalWeight += weightData[j].weight
                totalBmi += weightData[j].bmi
                times++
            }
        }

        formatArray.push({
            day: dayArrayFormat[i],
            weight: +(totalWeight / times).toFixed(1) || null,
            bmi: +(totalBmi / times).toFixed(1) || null
        })
    }
    return formatArray
}


/**
 * 格式化血压数据
 * @param {*} bloodPressureData 
 * @param {*} dayArray 
 */
const formatBloodPressureData = (bloodPressureData, dayArray) => {
    let dayArrayFormat = dayArray.map(item => item.replace('/', '-'))
    let formatArray = []
    for (let i in dayArrayFormat) {
        let totalDiastolicPressure = 0
        let totalSystolicPressure = 0
        let times = 0
        for (let j in bloodPressureData) {
            if (bloodPressureData[j].measurementDate.indexOf(dayArrayFormat[i]) >= 0) {
                totalDiastolicPressure += bloodPressureData[j].diastolicPressure
                totalSystolicPressure += bloodPressureData[j].systolicPressure
                times++
            }
        }
        formatArray.push({
            day: dayArray[i],
            diastolicPressure: +(totalDiastolicPressure / times).toFixed(1) || null,
            systolicPressure: +(totalSystolicPressure / times).toFixed(1) || null
        })
    }
    return formatArray
}


/**
 * 格式化血糖
 * @param {*} bloodSugarData 
 * @param {*} dayArray 
 */
const formatBloodSugarData = (bloodSugarData,dayArray) => {

}


export {
    formatSleepData,
    formatWeightData,
    formatBloodPressureData
}