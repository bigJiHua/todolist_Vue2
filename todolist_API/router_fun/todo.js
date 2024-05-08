const db = require('../database/db')
const config = require('../config')
const ExecuteFunc = require('../Implement/ExecuteFunction')
const ExecuteFuncData = require('../Implement/ExecuteFunctionData')
// 获取用户代办
exports.gettodolist = async (req,res) => {
    const user = req.query.user
    const SelectUserToDoListSql = `select * from ev_todo where username= ?`
    const SelectUserToDoList = await ExecuteFuncData(SelectUserToDoListSql,user)
    if(SelectUserToDoList.length === 0 ) return res.cc('空空如也',404)
    res.status(200).send({
        status: 200,
        data: SelectUserToDoList,
        message: '获取成功啦! 距离时间久的记得尽快完成噢!'
    })
}
// 设置是否上传云端
exports.setSetting = async (req,res) => {
    const user = req.body.username
    const data = {}
    if(req.body.met === 'upload') {
        data.upload = req.body.settings
    } else if(req.body.met === 'toChange') {
        data.toChange = req.body.settings
    }
    const UpdateUserDataSql = `update ev_users set ? where username=?`
    const UpdateUserData = await ExecuteFuncData(UpdateUserDataSql,[data,user])
    if(UpdateUserData.affectedRows !== 1) return res.cc('设置失败',404)
    const SelectUserDataTodoListSql = `select * from ev_todo where username=?`
    const SelectUserDataTodoList = await ExecuteFuncData(SelectUserDataTodoListSql,user)
    if(SelectUserDataTodoList.length === 0) return res.status(200).send({
        status: 200,
        message: '设置成功',
        length: config.row,
        data: []
    })
    res.status(200).send({
        status: 200,
        message: '设置成功',
        data: SelectUserDataTodoList
    })
}
// 添加事件
exports.addtodolist = async (req,res) => {
    const user = req.auth.username
    const data = {
        username: req.auth.username,
        todo: req.body.todo,
        finishi: 0,
        upcoming: 0,
        is_delete: 0,
        time: new Date().getTime()
    }
    const CheckUserisUploadSql = `Select upload from ev_users where username = ?`
    const CheckUserisUpload = await ExecuteFuncData(CheckUserisUploadSql, user)
    if (CheckUserisUpload.length === 1) {
        // 获取今日数据
        const SelectIsTodoListByTodaySql = `SELECT * FROM ev_todo WHERE username = ? AND finishi = 0 AND is_delete = 0 AND DATE(FROM_UNIXTIME(time / 1000)) = CURDATE()`
        const SelectIsTodoListByToday = await ExecuteFuncData(SelectIsTodoListByTodaySql,user)
        if (SelectIsTodoListByToday.length < config.row) {
            //插入数据
            const InsetUserTodoDataSql = `insert into ev_todo set ?`
            const InsetUserTodoData = await ExecuteFuncData(InsetUserTodoDataSql, data)
            if (InsetUserTodoData.affectedRows !== 1) return res.cc('添加失败啦，记住代办刷新一下重新添加吧!')
        }else {
            res.cc('代办列表已经满了嗷! 先去把未完成的代办加快速度哟！', 404)
        }
    } else {
        return res.cc('用户未打开上传云端，请开通后再试吧')
    }
    res.status(200).send({
        status: 200,
        message: '添加成功,记得及时完成噢！'
    })
}
// 更改所作
exports.cagtodolist = (req,res) => {
    const username = req.auth.username
    const todo = JSON.parse(req.body.ctodo)
    const id = todo.id
    delete todo.new
    const sql = `select * from ev_users where username=?`
    db.query(sql,username,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length === 0 ) return res.cc('非法用户', 406)
        if(parseInt(todo.finishi) === 0) {
            const sql = `select * from ev_todo where username=? and finishi = 0 and upcoming = 0 and is_delete = 0`
            db.query(sql,username,(err,results)=>{
                if(err) return res.cc(err)
                if(results.length < config.row || todo.is_delete === 1) {
                    const sql = `update ev_todo set ? where username=? and id=?`
                    db.query(sql,[todo,username,id],(err,results)=>{
                        if(err) return res.cc(err)
                        if(results.affectedRows !== 1 ) return res.cc('修改失败,请同步至数据库再进行修改', 406)
                        res.status(200).send({
                            status: 200,
                            message: '别轻易放弃 继续努力嗷! '
                        })
                    })
                } else {
                    res.status(202).send({
                        status: 202,
                        message: '代办列表已经满了嗷! 先去把未完成的代办加快速度哟！'
                    })
                }
            })
        } else {
            const sql = `update ev_todo set ? where username=? and id=?`
            db.query(sql,[todo,username,id],(err,results)=>{
                if(err) return res.cc(err)
                if(results.affectedRows !== 1 ) return res.cc('修改失败,请同步至数据库再进行修改', 406)
                res.status(200).send({
                    status: 200,
                    message: '恭喜你完成啦! 继续努力嗷! '
                })
            })
        }
    })
}

// 获取历史完成
exports.getHistodo = (req,res) => {
    const username = req.body.username
    const sql = `select * from ev_todo where username = ? and finishi = 1 `
    db.query(sql,username,(err,results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('空空如也，快去完成你的第一个任务吧！',206)
        res.send({
            status: 200,
            data: results
        })
    })
}
