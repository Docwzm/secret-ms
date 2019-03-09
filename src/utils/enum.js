const enumObj = {
    //随访计划时间类别
    timeCategory: [{
            key: 1,
            value: "首诊"
        },
        {
            key: 2,
            value: "就诊"
        },
        {
            key: 3,
            value: "出院"
        },
        {
            key: 4,
            value: "结束治疗"
        },
    ],
    //随访计划时间类型
    timeType: [{
        key: 1,
        value: "天"
    }, {
        key: 2,
        value: "周"
    }, {
        key: 3,
        value: "月"
    }],
    site: [{
        key: 1,
        value: "医院"
    }, {
        key: 2,
        value: "社康"
    }],

    //测量类型
    measurementType:[{
        key:1,
        value:"血糖"
    },{
        key:2,
        value:"血压"
    },{
        key:3,
        value:"体重"
    }]
}

const switchEnum = (id, arrayName) => {
    for (let i in enumObj[arrayName]) {
        if (parseInt(id) === enumObj[arrayName][i].key) {
            return enumObj[arrayName][i].value
        }
    }
}

export {
    enumObj,
    switchEnum
}