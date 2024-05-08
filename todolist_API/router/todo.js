const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const todolist_func = require('../router_fun/todo')
const todolist_Schema = require('../schema/todo')
const ExecuteFuncData = require("../Implement/ExecuteFunctionData");
router.use(async (req,res,next) => {
    const username = req.auth.username
    if (!username) return res.cc('未登录！参数异常!', 401)
    const SelectUserDataSql = `select * from ev_users where username=?`
    const SelectUserData = await ExecuteFuncData(SelectUserDataSql, username)
    if(SelectUserData.length === 0) return res.cc('用户不存在',404)
    next()
})
router.get('/todolist',todolist_func.gettodolist)
router.post('/addtodo',expressJoi(todolist_Schema.settodo),todolist_func.addtodolist)
router.patch('/cagtodo', expressJoi(todolist_Schema.cagdeltodo),todolist_func.cagtodolist)
router.patch('/Setting',expressJoi(todolist_Schema.setSetting),todolist_func.setSetting)
router.post('/histodo',expressJoi(todolist_Schema.getHistodo),todolist_func.getHistodo)

module.exports = router
