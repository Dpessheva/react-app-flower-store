const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

mongoose.Promise = global.Promise;

module.exports = (settings) => {
    mongoose.connect(settings.db,{useNewUrlParser: true } )
    let db = mongoose.connection
  
    db.once('open', err => {
      if (err) {
        throw err
      }
  
      console.log('MongoDB ready!')
      User.seedAdminUser()
      //Product.seedProduct()
    })
  
    db.on('error', err => console.log(`Database error: ${err}`))
  }