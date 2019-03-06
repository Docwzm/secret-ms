import request from '../utils/request'

//为用户新增方案
export function addProgram({ program_id, user_id, begin_time }) {
    return request({
        url: '/program/doctor/add_user_program',
        method: "post",
        data: {
            program_id,
            user_id,
            begin_time
        }
    })
}

//查询医生添加的方案
export function getProgramList({ program_type, category, patient_id }) {
    return request({
        url: '/program/doctor/list',
        method: "post",
        data: {
            program_type,
            category,
            patient_id
        }
    })
}