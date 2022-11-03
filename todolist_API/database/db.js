const mysql = require('mysql')

const db = mysql.createPool({
    host: '43.129.172.233',
    user: 'todolist_vue2',
    password: 'todolist_vue2',
    database: 'todolist_vue2'
})

module.exports = db

