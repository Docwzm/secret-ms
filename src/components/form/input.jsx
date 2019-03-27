
import React from 'react';
import { InputNumber, Input } from 'antd';


const MyInputNumber = (params) => {
    if (params.type == 'int') {
        return <InputNumber parser={value => {
            if (params.zero) {
                return value.replace(/[^0-9]*/g, '')
            } else {
                return isNaN(parseInt(value)) ? '' : parseInt(value)
            }
        }} />
    } else {
        return <InputNumber />
    }
}

const MyInput = (params) => {
    if (params.type == 'chinese') {
        return <Input onChange={e => {
            e.target.value = 1;
            // e.target.value.replace(/[\u4e00-\u9fa5]*/g,'')
        }}></Input>
    }
}

export {
    MyInputNumber,
    MyInput
}