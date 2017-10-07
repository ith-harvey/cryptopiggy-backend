const express = require('express')
const router = express.Router();
const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const utils = require('./utils')

router.get('/user/:id', function(req, res, next) {
  const id = req.params.id
  db('addresses').where('user_id', id).then( response => {
    console.log('response', response)
    res.send(response)
  })
})

router.post('/', function(req, res, next) {
  console.log(req.body)
  const data = req.body
  db('addresses').insert(data).then( response => {
    console.log('response', response)
    res.send(response)
  })
})

router.delete('/:id', function(req, res, next) {
  console.log(req.params.id)
  const id = req.params.id
  db('addresses').where('id', id).del().then( response => {
    console.log('response', response)
    res.send('The address was deleted succesffully!')
  })
})

module.exports = router
