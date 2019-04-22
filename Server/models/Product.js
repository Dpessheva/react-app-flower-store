const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

const productSchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: [true, 'Product already exists.']
  },
  description: {
    type: String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  imageUrl: {
    type: String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  quantity: {
    type: Number,
    min: 0,
    max: 1000
  },
  price: {
    type: Number,
    required: REQUIRED_VALIDATION_MESSAGE,
    min: 1,
    max: 500000
  },
  likes: [{
    type: mongoose.Schema.Types.String
  }],
  reviews: [],

});


let Product = mongoose.model('Product', productSchema);
module.exports=Product;