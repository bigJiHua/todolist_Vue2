const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'todo_jihau_top'
})

module.exports = db

