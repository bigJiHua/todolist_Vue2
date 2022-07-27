const joi = require('joi')

const username = joi.string().min(3).max(15).required()
const password = joi.string().required()
const pic = joi.string().max(255)

exports.user_loginRouter = {
    body:{
        username,
        password
    }
}
exports.user_regUserRM = {
    body:{
        username,
        password,
        pic
    }
}
