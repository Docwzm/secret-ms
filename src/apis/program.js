import request from '../utils/request'

//为用户新增方案
export function addProgram({ programId, patientId, beginTime }) {
    // return request({
    //     url: '/program/doctor/add_user_program',
    //     method: "post",
    //     data: {
    //         programId,
    //         patientId,
    //         beginTime
    //     }
    // })

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 200
            })
        }, 1000)
    })
}

//查询医生添加的方案
export function getProgramList({ type, category }) {
    // return request({
    //     url: '/program/doctor/list',
    //     method: "post",
    //     data: {
    //         type,
    //         category,
    //     }
    // })

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = [
                {
                    status: 1,
                    created: new Date().getTime(),
                    type,
                    id: '1_1',
                    name: '随访计划1'
                },
                {
                    status: 1,
                    created: new Date().getTime(),
                    type,
                    id: '1_2',
                    name: '随访计划2'
                }
            ]
            if (type == 2) {

                data = [
                    {
                        status: 1,
                        created: new Date().getTime(),
                        type,
                        id: '2_1',
                        name: '宣教内容1'
                    },
                    {
                        status: 1,
                        created: new Date().getTime(),
                        type,
                        id: '2_2',
                        name: '宣教内容2'
                    }
                ]

            } else {

                data = [
                    {
                        status: 1,
                        created: new Date().getTime(),
                        type,
                        id: '3_1',
                        name: '测量计划1'
                    },
                    {
                        status: 1,
                        created: new Date().getTime(),
                        type,
                        id: '3_2',
                        name: '测量计划2'
                    }
                ]
            }
            resolve({
                data
            })
        }, 500)
    })
}