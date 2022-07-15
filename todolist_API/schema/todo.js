const joi = require('joi')


const todo = joi.string().max(50).required()
const username = joi.string().required()
const id = joi.number().required()
const upload = joi.string().required()



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
        id
    }
}

exports.setUpload = {
    body:{
        username,
        upload
    }
}
