const db = require('../database/db')

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
            message: '获取成功'
        })
    })
}

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
            res.status(200).send({
                status: 200,
                message: '设置成功'
            })
        })
    })
}

exports.addtodolist = (req,res) => {
    const user = req.body.username
    const data = req.body
    data.time = new Date().getTime()
    const sql = `select * from ev_users where username=?`
    db.query(sql,user,(err,results)=> {
        if (err) return res.cc(err, 404)
        if (results.length === 0) return res.cc('用户不存在', 404)
        if (results[0].upload === 1) {
            const sql = `select * from ev_todo where username=?`
            db.query(sql,user,(err,results)=>{
                if (err) return res.cc(err)
                if (results.length <= 10) {
                    const sql = `insert into ev_todo set ?`
                    db.query(sql,req.body,(err,results)=>{
                        if (err) return res.cc(err)
                        if (results.affectedRows !== 1) return res.cc('添加失败')
                        res.status(200).send({
                            status: 200,
                            message: '添加成功'
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

exports.cagtodolist = (req,res) => {
    const username = req.body.username
    const todo = JSON.parse(req.body.ctodo)
    const id = todo.id
    const sql = `select * from ev_users where username=?`
    db.query(sql,username,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length === 0 ) return res.cc('非法用户', 406)
        const sql = `update ev_todo set ? where username=? and id=?`
        db.query(sql,[todo,username,id],(err,results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !== 1 ) return res.cc('修改失败', 406)
            res.status(200).send({
                status: 200,
                message: '修改成功'
            })
        })
    })
}


exports.deltodolist = (req,res) => {
    const username = req.body.username
    const todo = JSON.parse(req.body.ctodo)
    const id = todo.id
    const data = {}
    if(req.body.met === 'upload') {
        data.upload = req.body.settings
    } else if(req.body.met === 'toChange') {
        data.toChange = req.body.settings
    }
    const sql = `select * from ev_users where username=?`
    db.query(sql,username,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length === 0 ) return res.cc('非法用户', 406)
        const sql = `select * from ev_todo where username=? and id=?`
        db.query(sql,[username,id],(err,results)=> {
            if (err) return res.cc(err)
            if (results.length === 0) return res.cc('非法操作', 406)
            const sql = `update ev_todo set ? where username=? and id=?`
            db.query(sql, [todo, username, id], (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1) return res.cc('修改失败', 406)
                res.status(200).send({
                    status: 200,
                    message: '修改成功'
                })
            })
        })
    })
}
