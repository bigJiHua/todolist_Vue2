const db = require('../database/db')
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 用户登录
exports.user_login_API = (req, res) => {
    const userinfo = req.body
    const sql = `select * from ev_users where username=? and state=0`
    // s执行sql语句
    db.query(sql, userinfo.username, (err, results) => {
        if(err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败 账号不存在或已经被注销！',404)
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if(!compareResult) return res.cc('登录失败 密码错误 !',401)
        const user = { ...results[0], password: ''}
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({
            status: 200,
            message:'登录成功',
            token: 'Bearer ' + tokenStr,
            data: user
        })
    })
}

// 用户注册
exports.regUser = (req, res) => {
    const userinfo = req.body
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('用户名被占用，请更换其他用户名！')
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(
            sql,
            userinfo,
            (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1) return res.cc('用户注册失败，请稍后再试')
                res.cc('用户注册成功!', 200)
            }
        )
    })
}
