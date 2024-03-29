const db = require('../database/db')
const setting = require('../setting')
// 获取用户代办
exports.gettodolist = (req,res) => {
    const user = req.query.user
    const sql = `select * from ev_todo where username= ?`
    db.query(sql,user,(err,results)=>{
        if(err) return res.cc(err,404)
        if(results.length === 0 ) return res.status(200).send({
            status: 406,
            message: '空空如也'
        })
        res.status(200).send({
            status: 200,
            data: results,
            message: '获取成功啦! 距离时间久的记得尽快完成噢!'
        })
    })
}
// 设置上传 修改
exports.setSetting = (req,res) => {
    const user = req.body.username
    const data = {}
    if(req.body.met === 'upload') {
        data.upload = req.body.settings
    } else if(req.body.met === 'toChange') {
        data.toChange = req.body.settings
    }
    const sql = `select * from ev_users where username=?`
    db.query(sql,user,(err,results)=>{
        if(err) return res.cc(err,404)
        if(results.length === 0) return res.cc('用户不存在',404)
        const sql = `update ev_users set ? where username=?`
        db.query(sql,[data,user],(err,results)=>{
            if(err) return res.cc(err,404)
            if(results.affectedRows !== 1) return res.cc('设置失败',506)
            const sql = `select * from ev_todo where username=?`
            db.query(sql,user,(err,results)=>{
                if(err) return res.status(200).send({
                    status: 200,
                    message: '设置成功,查条错误',
                    length: 0,
                    data: []
                })
                if(results.length === 0) return res.status(200).send({
                    status: 200,
                    message: '设置成功',
                    length: setting.row,
                    data: []
                })
                res.status(200).send({
                    status: 200,
                    message: '设置成功',
                    data: results
                })
            })
        })
    })
}
// 添加事件
exports.addtodolist = (req,res) => {
    const user = req.body.username
    const data = JSON.parse(req.body.todo)
    const sql = `select * from ev_users where username=?`
    db.query(sql,user,(err,results)=> {
        if (err) return res.cc(err, 404)
        if (results.length === 0) return res.cc('用户不存在', 404)
        if (results[0].upload === 1) {
            const sql = `select * from ev_todo where username=? and finishi = 0 and is_delete=0`
            db.query(sql,user,(err,results)=>{
                if (err) return res.cc(err)
                if (results.length < setting.row) {
                    const sql = `insert into ev_todo set ?`
                    db.query(sql,data,(err,results)=>{
                        if (err) return res.cc(err)
                        if (results.affectedRows !== 1) return res.cc('添加失败啦，记住代办刷新一下重新添加吧!')
                        res.status(200).send({
                            status: 200,
                            message: '添加成功,记得及时完成噢！'
                        })
                    })
                } else {
                    return res.cc('云端数据超过限制，无法再上传啦',406)
                }
            })
        } else {
            return res.cc('用户未打开上传云端，请开通后再试吧')
        }
    })
}
// 更改所作
exports.cagtodolist = (req,res) => {
    const username = req.body.username
    const todo = JSON.parse(req.body.ctodo)
    const id = todo.id
    const sql = `select * from ev_users where username=?`
    db.query(sql,username,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length === 0 ) return res.cc('非法用户', 406)
        if(parseInt(todo.finishi) === 0) {
            const sql = `select * from ev_todo where username=? and finishi = 0 and upcoming = 0 and is_delete = 0`
            db.query(sql,username,(err,results)=>{
                if(err) return res.cc(err)
                if(results.length < setting.row || todo.is_delete === 1) {
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
    const sql = `select * from ev_todo where username = ? and finishi = 1 or upcoming = 1`
    db.query(sql,username,(err,results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('空空如也，快去完成你的第一个任务吧！',206)
        res.send({
            status: 200,
            data: results
        })
    })
}
