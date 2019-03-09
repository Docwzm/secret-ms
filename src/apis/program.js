import request from '../utils/request'


//为用户新增方案
export function addProgram({ programId, patientId, beginTime }) {
    return request({
        url: '/rpmprogram_service/program/doctor/add_user_program',
        method: "post",
        data: {
            programId,
            patientId,
            beginTime
        }
    })

    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve({
    //             code: 200
    //         })
    //     }, 200)
    // })
}

//查询医生添加的方案
export function getProgramList({ type, category }) {
    return request({
        url: '/rpmprogram_service/program/doctor/list',
        method: "post",
        data: {
            type,
            category,
        }
    })

    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         let data = [
    //             {
    //                 status: 1,
    //                 created: new Date().getTime(),
    //                 type,
    //                 id: '1_1',
    //                 name: '随访计划1'
    //             },
    //             {
    //                 status: 1,
    //                 created: new Date().getTime(),
    //                 type,
    //                 id: '1_2',
    //                 name: '随访计划2'
    //             }
    //         ]
    //         if (type == 2) {

    //             data = [
    //                 {
    //                     status: 1,
    //                     created: new Date().getTime(),
    //                     type,
    //                     id: '2_1',
    //                     name: '宣教内容1'
    //                 },
    //                 {
    //                     status: 1,
    //                     created: new Date().getTime(),
    //                     type,
    //                     id: '2_2',
    //                     name: '宣教内容2'
    //                 }
    //             ]

    //         } else if(type==3){

    //             data = [
    //                 {
    //                     status: 1,
    //                     created: new Date().getTime(),
    //                     type,
    //                     id: '3_1',
    //                     name: '测量计划1'
    //                 },
    //                 {
    //                     status: 1,
    //                     created: new Date().getTime(),
    //                     type,
    //                     id: '3_2',
    //                     name: '测量计划2'
    //                 }
    //             ]
    //         }
    //         resolve({
    //             data
    //         })
    //     }, 500)
    // })
}



export function checkProgram({ type, category }) {
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
            resolve({
                code: 200
            })
        }, 200)
    })

}

export function getProgram({ type, id }) {
    // return request({
    //     url: '/program/doctor/list',
    //     method: "post",
    //     data: {
    //         type,
    //         id,
    //     }
    // })
    let data = {}
    if(type==1){
        data = {
            proName:'test1',
            doctorName:'医生',
            list:[
                {
                    name:'test1',
                    time:1552102245388,
                    content:'content1',
                    address:'address1'
                },
                {
                    name:'test2',
                    time:1552102945388,
                    content:'content2',
                    address:'address2'
                },
                {
                    name:'test3',
                    time:1554102245388,
                    content:'content3',
                    address:'address3'
                }
            ]
        }
    }else{
        data = {
            proName:'test1',
            list:[
                {
                    name:'体重',
                    count:'一天一次',
                },
                {
                    name:'血压',
                    count:'一天一次',
                },
                {
                    name:'血压',
                    count:'一天一次',
                }
            ]
        }
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data
            })
        }, 200)
    })

}