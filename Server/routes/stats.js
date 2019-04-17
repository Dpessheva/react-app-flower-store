const express = require('express')
const Product = require('../models/Product')
const User = require('../models/User')

const router = new express.Router()

router.get('/', (req, res) => {
  User
    .estimatedDocumentCount({})
    .then(users => {
      Product
        .estimatedDocumentCount({})
        .then(products => {
          res.status(200).json({
            products,
            users
          })
        })
    })
    .catch(err => {
      console.log(err)
    });
})

module.exports = router