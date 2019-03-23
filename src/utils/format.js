import Group from "antd/lib/input/Group";

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
            item.totalSleep = +(item.totalSleep / 60).toFixed(1)
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
            pressure: +(totalDiastolicPressure / times).toFixed(1) || null,
            type: "舒张压"
        }, {
            day: dayArray[i],
            pressure: +(totalSystolicPressure / times).toFixed(1) || null,
            type: "收缩压"
        })
    }
    return formatArray
}


/**
 * 格式化血糖
 * @param {*} bloodSugarData 
 * @param {*} dayArray 
 */
const formatBloodSugarData = (bloodSugarData, dayArray) => {
    let dayArrayFormat = dayArray.map(item => item.replace('/', '-'))
    let formatArray = []
    for (let i in dayArrayFormat) {
        let beforeMeal = 0;
        let afterMeal = 0;
        let beforeTimes = 0;
        let afterTimes = 0
        for (let j in bloodSugarData) {
            if (bloodSugarData[j].measurementDate.indexOf(dayArrayFormat[i]) >= 0) {
                if (+bloodSugarData[j].mealPeroid === 12) {
                    //餐前血糖
                    beforeMeal += bloodSugarData[j].glucoseConcentration;
                    beforeTimes++
                }
                if (+bloodSugarData[j].mealPeroid === 13) {
                    //餐后血糖
                    afterMeal += bloodSugarData[j].glucoseConcentration;
                    afterTimes++
                }
            }
        }
        formatArray.push({
            day: dayArrayFormat[i],
            glucoseConcentration: +(beforeMeal / beforeTimes).toFixed(1) || null,
            mealPeroid: '餐前血糖'
        }, {
            day: dayArrayFormat[i],
            glucoseConcentration: +(afterMeal / afterTimes).toFixed(1) || null,
            mealPeroid: '餐后血糖'
        })
    }
    return formatArray
}

/**
 * 有氧能力、步数格式化
 * @param {*} pedometerData 
 * @param {*} dayArray 
 */
const formatPedometerData = (pedometerData, dayArray) => {
    let dayArrayFormat = dayArray.map(item => item.replace('/', '-'))
    let formatArray = []
    for (let i in dayArrayFormat) {
        let steps = 0
        let pedometer = 0
        for (let j in pedometerData) {
            if (pedometerData[j].measurementTime.indexOf(dayArrayFormat[i]) >= 0) {
                steps = pedometerData[j].step;
                let aerList = pedometerData[j].aerobicsTimeList || []
                if (aerList && aerList.length > 0) {
                    for (let x in aerList) {
                        pedometer += +(aerList[x].exetimeIf + aerList[x].exetimeCpm * 2) //中等强度时长+高等强度时长*2
                    }
                }
            }
        }
        formatArray.push({
            day: dayArrayFormat[i],
            steps: steps,
            pedometer: pedometer
        })
    }

    let checkZero = formatArray.map(item => {
        if (item.steps === 0) item.steps = null;
        if (item.pedometer === 0) item.pedometer = null;
        return item
    })

    return checkZero
}


/**
 * 格式化睡眠表格数据
 * @param {*} sleepData 
 */
const formatSleepTable = (sleepData=[]) => {
    let dayArray = []
    let day = null
    for (let i in sleepData) {
        let awakeningTime = sleepData[i].awakeningTime.split(" ")[0]
        if (awakeningTime !== day) {
            dayArray.push(awakeningTime)
            day = awakeningTime
        }
    }
    console.log(dayArray)

    let formatData = []
    for (let i in dayArray) {
        let day = []
        for (let j in sleepData) {
            if (sleepData[j].awakeningTime.split(" ")[0].indexOf(dayArray[i]) >= 0) {
                day.push(sleepData[j])
            }
        }
        formatData.push({
            data: dayArray[i],
            day: day
        })
    }
    console.log(formatData)
}


export {
    formatSleepData,
    formatWeightData,
    formatBloodPressureData,
    formatBloodSugarData,
    formatPedometerData,
    formatSleepTable
}