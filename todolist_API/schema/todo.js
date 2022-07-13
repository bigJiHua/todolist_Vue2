const joi = require('joi')


const todo = joi.string().max(50).required()
const username = joi.string().required()
const id = joi.number().required()


// 验证规则对象 - 发布文章
exports.settodo = {
    body:{
        username,
        todo
    }
}

exports.cagdeltodo = {
    body: {
        username,
        id
    }
}
