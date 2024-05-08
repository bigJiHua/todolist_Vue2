const db = require('../database/db')
function ExecuteFunction(sql) {
    if (sql) {
        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if (err) return reject(err)
                return resolve(results)
            })
        })
    }
}

module.exports = ExecuteFunction
