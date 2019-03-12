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



export function checkProgram({ patientId, type }) {
    return request({
        url: '/rpmprogram_service/program/doctor/user_program',
        method: "get",
        params: {
            patientId,
            type,
        }
    })
}

export function getProgram(programId) {
    return request({
        url: '/rpmprogram_service/program/doctor/program_info',
        method: "get",
        params: {
            programId
        }
    })
    // let type = 1;
    // let data = {}
    // if (type == 1) {
    //     data = {
    //         id: 2,
    //         type: 1,
    //         name: "修改的方案名称",
    //         list: [
    //             {

    //                 id: 2,
    //                 name: "节点2修改",
    //                 site: 1,
    //                 content: "CT、OT、XT",
    //                 planTime: 7,
    //                 num: 2,
    //                 programId: 2,
    //                 deleted: 0,
    //                 timeType: 1,
    //                 created: 1552101578000,
    //                 updated: 1552118131000
    //             },
    //             {

    //                 id: 1,
    //                 name: "节点1修改",
    //                 site: 1,
    //                 content: "CT、OT、XT",
    //                 planTime: 7,
    //                 num: 1,
    //                 programId: 2,
    //                 deleted: 0,
    //                 timeType: 1,
    //                 created: 1552101578000,
    //                 updated: 1552118131000
    //             }

    //         ]
    //     }
    // } else {
    //     data = {
    //         proName: 'test1',
    //         list: [
    //             {
    //                 type: 1,
    //                 num: 2,
    //                 frequencyKey: 1,
    //                 frequencyValue: 1
    //             },
    //             {
    //                 type: 1,
    //                 num: 1,
    //                 frequencyKey: 1,
    //                 frequencyValue: 2
    //             },
    //             {
    //                 type: 1,
    //                 num: 3,
    //                 frequencyKey: 1,
    //                 frequencyValue: 3
    //             }
    //         ]
    //     }
    // }
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve({
    //             data
    //         })
    //     }, 200)
    // })

}



