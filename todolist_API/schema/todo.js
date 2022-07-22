const joi = require('joi')


const todo = joi.string().required()
const ctodo = joi.required()
const username = joi.string().required()
const id = joi.number().required()
const settings = joi.required()
const met = joi.required()



// 验证规则对象 - 要做的事
exports.settodo = {
    body:{
        username,
        todo
    }
}

exports.cagdeltodo = {
    body: {
        username,
        ctodo
    }
}

exports.setSetting = {
    body:{
        username,// 用户
        settings,// 设置值
        met // 设置项
    }
}
