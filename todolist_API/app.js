/* 导入模块 */
const express = require('express')
const app = express()
const cors = require('cors')
const Joi = require('joi')
const { expressjwt: expressJWT } = require('express-jwt')
const config = require('./config')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.cc = function (err, status ) {
        if (status === '') {
            res.send({
                status : 206,
                message: err instanceof Error ? err.message : err,
            })
        } else {
            res.send({
                status : status,
                message: err instanceof Error ? err.message : err,
            })
        }
    }
    next()
})
app.use(
    expressJWT({
        secret: config.jwtSecretKey,
        algorithms: ['HS256'],
        //credentialsRequired: false
    }).unless({
        path: config.api
    })
)
const todo_router = require('./router/todo')
const Uers_router = require('./router/Users')
app.use('/todo/api',todo_router)// api 获取数据
app.use('/todo/my',Uers_router)// my 登录 注册

app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) return res.cc(err,404)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败,请登录',401)
    return res.cc(err,404)
})
//     监听项目端口，运行时要修改
app.listen(config.port, () => {
    console.log('server Open ' + config.port)
})
