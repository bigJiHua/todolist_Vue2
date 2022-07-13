const db = require('../database/db')
const join = require('express-joi')

exports.gettodolist = (req,res) => {
    res.status(200).send({
        status: 200,
        message: 'Hello world'
    })
}

exports.settodolist = (req,res) => {
    res.status(200).send({
        status: 200,
        message: 'Hello world'
    })
}

exports.cagtodolist = (req,res) => {
    res.status(200).send({
        status: 200,
        message: 'Hello world'
    })
}


exports.deltodolist = (req,res) => {
    res.status(200).send({
        status: 200,
        message: 'Hello world'
    })
}
