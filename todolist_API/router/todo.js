const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const todolist_func = require('../router_fun/todo')
const todolist_Schema = require('../schema/todo')
router.get('/todolist',todolist_func.gettodolist)
router.patch('/isupl',expressJoi(todolist_Schema.setUpload),todolist_func.setUpload)
router.post('/addtodo',expressJoi(todolist_Schema.settodo),todolist_func.addtodolist)
router.patch('/cagtodo', expressJoi(todolist_Schema.cagdeltodo),todolist_func.cagtodolist)
router.delete('/deltodo',expressJoi(todolist_Schema.cagdeltodo),todolist_func.deltodolist)

module.exports = router
